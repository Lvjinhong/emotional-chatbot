import os
import json
import time
import tempfile
from typing import Dict, Any, List, Optional

from .voice_enrollment import VoiceManager
from .speech_synthesis import TextToSpeech
from .speech_recognition import SpeechRecognizer
from .oss_storage import OssStorage

class VoiceDialogue:
    """
    Main handler for voice dialogue, integrating all components
    """
    def __init__(
        self,
        dashscope_api_key: str,
        oss_access_key_id: str,
        oss_access_key_secret: str,
        link_ai_api_url: str,
        link_ai_api_key: str,
        link_ai_app_code: str,
        voice_db_path: str = 'server/voice/voice_db.json',
        audio_cache_dir: str = 'server/voice/cache',
        language: str = "zh-CN"
    ):
        """
        Initialize the voice dialogue system
        
        Args:
            dashscope_api_key: DashScope API key
            oss_access_key_id: OSS access key ID
            oss_access_key_secret: OSS access key secret
            link_ai_api_url: Link AI API URL
            link_ai_api_key: Link AI API key
            link_ai_app_code: Link AI app code
            voice_db_path: Path to store voice database
            audio_cache_dir: Directory to cache audio files
            language: Language for speech recognition
        """
        # Initialize components
        self.voice_manager = VoiceManager(
            api_key=dashscope_api_key,
            voice_db_path=voice_db_path
        )
        
        self.tts = TextToSpeech(
            api_key=dashscope_api_key
        )
        
        self.speech_recognizer = SpeechRecognizer(
            language=language
        )
        
        self.storage = OssStorage(
            access_key_id=oss_access_key_id,
            access_key_secret=oss_access_key_secret
        )
        
        # Link AI API settings
        self.link_ai_api_url = link_ai_api_url
        self.link_ai_api_key = link_ai_api_key
        self.link_ai_app_code = link_ai_app_code
        
        # Other settings
        self.audio_cache_dir = audio_cache_dir
        os.makedirs(self.audio_cache_dir, exist_ok=True)
        
        # Session storage (session_id -> message history)
        self.sessions = {}
    
    def _get_session_messages(self, session_id: str) -> List[Dict[str, str]]:
        """Get messages for a session"""
        if session_id not in self.sessions:
            self.sessions[session_id] = []
        return self.sessions[session_id]
    
    def _save_session_message(self, session_id: str, role: str, content: str):
        """Save a message to a session"""
        messages = self._get_session_messages(session_id)
        messages.append({"role": role, "content": content})
        self.sessions[session_id] = messages
    
    async def process_text_message(self, message: str, session_id: str, voice_id: str) -> Dict[str, Any]:
        """
        Process a text message and return a spoken response
        
        Args:
            message: Text message
            session_id: Session ID
            voice_id: Voice ID to use for response
            
        Returns:
            Dictionary with audio URL and response data
        """
        import aiohttp
        import asyncio
        
        # Save user message to session
        self._save_session_message(session_id, "user", message)
        
        # Prepare request to Link AI
        messages = self._get_session_messages(session_id)
        
        request_body = {
            "app_code": self.link_ai_app_code,
            "messages": messages,
            "stream": False
        }
        
        headers = {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {self.link_ai_api_key}"
        }
        
        # Call Link AI API
        try:
            async with aiohttp.ClientSession() as session:
                async with session.post(
                    self.link_ai_api_url,
                    json=request_body,
                    headers=headers
                ) as response:
                    response_data = await response.json()
                    
                    # Extract response text
                    ai_response = response_data["choices"][0]["message"]["content"]
                    
                    # Save assistant message to session
                    self._save_session_message(session_id, "assistant", ai_response)
        except Exception as e:
            return {
                "success": False,
                "error": f"Error calling Link AI API: {str(e)}",
                "audio_url": None,
                "response_text": None
            }
        
        # Synthesize speech from response
        tts_result = self.tts.synthesize(
            text=ai_response,
            voice_id=voice_id
        )
        
        if not tts_result["success"]:
            return {
                "success": False,
                "error": tts_result.get("error", "Failed to synthesize speech"),
                "audio_url": None,
                "response_text": ai_response
            }
        
        # Save audio to file
        timestamp = int(time.time())
        object_name = f"responses/{session_id}/{timestamp}.mp3"
        
        # Upload audio to OSS
        upload_result = self.storage.upload_bytes(
            data=tts_result["audio"],
            object_name=object_name
        )
        
        if not upload_result["success"]:
            return {
                "success": False,
                "error": upload_result.get("error", "Failed to upload audio"),
                "audio_url": None,
                "response_text": ai_response
            }
        
        # Return response with audio URL
        return {
            "success": True,
            "audio_url": upload_result["url"],
            "response_text": ai_response,
            "session_id": session_id
        }
    
    async def process_voice_message(self, audio_data: bytes, session_id: str, voice_id: str) -> Dict[str, Any]:
        """
        Process a voice message and return a spoken response
        
        Args:
            audio_data: Audio data as bytes
            session_id: Session ID
            voice_id: Voice ID to use for response
            
        Returns:
            Dictionary with audio URL and response data
        """
        # Save audio to temporary file
        with tempfile.NamedTemporaryFile(suffix=".wav", delete=False) as temp_file:
            temp_file_path = temp_file.name
            temp_file.write(audio_data)
        
        try:
            # Recognize speech
            recognition_result = self.speech_recognizer.recognize_from_file(temp_file_path)
            
            if not recognition_result["success"]:
                return {
                    "success": False,
                    "error": recognition_result.get("error", "Failed to recognize speech"),
                    "audio_url": None,
                    "response_text": None
                }
            
            # Get recognized text
            recognized_text = recognition_result["text"]
            
            # Process text message
            text_result = await self.process_text_message(
                message=recognized_text,
                session_id=session_id,
                voice_id=voice_id
            )
            
            # Add recognized text to result
            text_result["recognized_text"] = recognized_text
            
            return text_result
        finally:
            # Clean up temporary file
            if os.path.exists(temp_file_path):
                os.remove(temp_file_path)
    
    async def clone_voice_from_audio(self, audio_data: bytes, name: str, description: str) -> Dict[str, Any]:
        """
        Clone a voice from audio data
        
        Args:
            audio_data: Audio data as bytes
            name: Name for the voice
            description: Description of the voice
            
        Returns:
            Dictionary with voice ID and status
        """
        # Save audio to temporary file
        with tempfile.NamedTemporaryFile(suffix=".wav", delete=False) as temp_file:
            temp_file_path = temp_file.name
            temp_file.write(audio_data)
        
        try:
            # Upload audio to OSS
            timestamp = int(time.time())
            object_name = f"voice_samples/{timestamp}_{name.lower().replace(' ', '_')}.wav"
            
            upload_result = self.storage.upload_file(
                local_file_path=temp_file_path,
                object_name=object_name
            )
            
            if not upload_result["success"]:
                return {
                    "success": False,
                    "error": upload_result.get("error", "Failed to upload audio"),
                    "voice_id": None
                }
            
            # Create voice using audio URL
            voice_data = self.voice_manager.create_voice(
                target_model="cosyvoice-v2",
                name=name,
                description=description,
                audio_url=upload_result["url"]
            )
            
            return {
                "success": True,
                "voice_id": voice_data["voice_id"],
                "voice_data": voice_data
            }
        finally:
            # Clean up temporary file
            if os.path.exists(temp_file_path):
                os.remove(temp_file_path) 