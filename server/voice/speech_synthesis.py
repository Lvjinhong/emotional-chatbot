import os
from dashscope.audio.tts_v2 import SpeechSynthesizer
from typing import Optional, Dict, Any

class TextToSpeech:
    """
    Handles text-to-speech synthesis using DashScope API
    """
    def __init__(self, api_key: str):
        """
        Initialize the TTS module
        
        Args:
            api_key: DashScope API key
        """
        os.environ['DASHSCOPE_API_KEY'] = api_key
    
    def synthesize(
        self,
        text: str,
        voice_id: str,
        model: str = "cosyvoice-v2",
        output_format: str = "mp3",
        sample_rate: int = 24000,
        speech_speed: float = 1.0,
        volume: int = 100,
    ) -> Dict[str, Any]:
        """
        Synthesize speech from text
        
        Args:
            text: Text to synthesize
            voice_id: Voice ID to use
            model: Model to use (cosyvoice-v1 or cosyvoice-v2)
            output_format: Output format (mp3, wav, etc.)
            sample_rate: Sample rate in Hz
            speech_speed: Speech speed factor (0.5 to 2.0)
            volume: Volume (0 to 100)
            
        Returns:
            Dictionary with 'audio' (binary) and 'request_id' keys
        """
        try:
            # Create synthesizer
            synthesizer = SpeechSynthesizer(
                model=model,
                voice=voice_id,
                format=output_format,
                sample_rate=sample_rate
            )
            
            # Set parameters
            synthesizer.set_tts_params(
                speed=speech_speed,
                volume=volume
            )
            
            # Call the API to synthesize speech
            audio = synthesizer.call(text)
            
            return {
                "audio": audio,
                "request_id": synthesizer.get_last_request_id(),
                "success": True
            }
        except Exception as e:
            error_message = str(e)
            print(f"Error synthesizing speech: {error_message}")
            return {
                "audio": None,
                "request_id": None,
                "success": False,
                "error": error_message
            }
    
    def save_audio(self, audio_data: bytes, file_path: str) -> bool:
        """
        Save audio data to file
        
        Args:
            audio_data: Audio data bytes
            file_path: Path to save file
            
        Returns:
            True if successful, False otherwise
        """
        try:
            os.makedirs(os.path.dirname(file_path), exist_ok=True)
            with open(file_path, "wb") as f:
                f.write(audio_data)
            return True
        except Exception as e:
            print(f"Error saving audio file: {e}")
            return False 