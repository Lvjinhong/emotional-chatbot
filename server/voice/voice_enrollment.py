import os
import json
from dashscope.audio.tts_v2 import VoiceEnrollmentService
from typing import List, Dict, Optional

class VoiceManager:
    """
    Handles voice enrollment and management operations using DashScope API
    """
    def __init__(self, api_key: str, voice_db_path: str = 'server/voice/voice_db.json'):
        """
        Initialize the voice manager
        
        Args:
            api_key: DashScope API key
            voice_db_path: Path to store voice database JSON file
        """
        os.environ['DASHSCOPE_API_KEY'] = api_key
        self.service = VoiceEnrollmentService()
        self.voice_db_path = voice_db_path
        self._ensure_db_exists()
        
    def _ensure_db_exists(self):
        """Ensures the voice database file exists"""
        os.makedirs(os.path.dirname(self.voice_db_path), exist_ok=True)
        if not os.path.exists(self.voice_db_path):
            with open(self.voice_db_path, 'w') as f:
                json.dump([], f)
    
    def _load_db(self) -> List[Dict]:
        """Load the voice database"""
        with open(self.voice_db_path, 'r') as f:
            return json.load(f)
    
    def _save_db(self, voices: List[Dict]):
        """Save the voice database"""
        with open(self.voice_db_path, 'w') as f:
            json.dump(voices, f, indent=2)
    
    def create_voice(self, target_model: str, name: str, description: str, audio_url: str) -> Dict:
        """
        Create a new voice
        
        Args:
            target_model: Voice model to use (cosyvoice-v1 or cosyvoice-v2)
            name: Name for the voice
            description: Description of the voice
            audio_url: URL of audio file to use for cloning
            
        Returns:
            Dict containing voice details
        """
        # Generate a prefix from name (lowercase alphanumeric only)
        prefix = ''.join(c.lower() for c in name if c.isalnum())[:9]
        
        # Create voice using DashScope API
        voice_id = self.service.create_voice(
            target_model=target_model,
            prefix=prefix,
            url=audio_url
        )
        
        # Save voice details to our database
        voice_data = {
            "voice_id": voice_id,
            "name": name,
            "description": description,
            "target_model": target_model,
            "audio_url": audio_url,
            "created_at": "",  # Will be populated from API response
            "status": "PENDING"  # Will be updated when we fetch from API
        }
        
        # Update local DB
        voices = self._load_db()
        voices.append(voice_data)
        self._save_db(voices)
        
        # Return voice data
        return voice_data
    
    def list_voices(self) -> List[Dict]:
        """
        List all voices and update the local database with latest status
        
        Returns:
            List of voice dictionaries
        """
        # Get voices from API
        api_voices = self.service.list_voices(page_size=100)
        
        # Load our database
        local_voices = self._load_db()
        
        # Update local database with latest status from API
        for api_voice in api_voices:
            voice_id = api_voice.get('voice_id')
            for local_voice in local_voices:
                if local_voice['voice_id'] == voice_id:
                    local_voice['status'] = api_voice.get('status')
                    local_voice['created_at'] = api_voice.get('gmt_create')
                    break
        
        # Save updated database
        self._save_db(local_voices)
        
        return local_voices
    
    def get_voice(self, voice_id: str) -> Optional[Dict]:
        """
        Get details for a specific voice
        
        Args:
            voice_id: ID of voice to get
            
        Returns:
            Voice dictionary or None if not found
        """
        # First check local database
        local_voices = self._load_db()
        local_voice = next((v for v in local_voices if v['voice_id'] == voice_id), None)
        
        if not local_voice:
            return None
        
        # Get latest info from API and update local database
        try:
            api_voice = self.service.query_voices(voice_id)
            
            # Update local voice with API data
            if api_voice:
                local_voice['status'] = api_voice.get('status')
                local_voice['created_at'] = api_voice.get('gmt_create')
                local_voice['target_model'] = api_voice.get('target_model')
                
                # Save updated database
                self._save_db(local_voices)
        except Exception as e:
            print(f"Error querying voice {voice_id}: {e}")
        
        return local_voice
    
    def update_voice(self, voice_id: str, audio_url: str) -> bool:
        """
        Update a voice with new audio
        
        Args:
            voice_id: ID of voice to update
            audio_url: New audio URL
            
        Returns:
            True if successful, False otherwise
        """
        try:
            # Update voice in API
            self.service.update_voice(voice_id, audio_url)
            
            # Update local database
            voices = self._load_db()
            for voice in voices:
                if voice['voice_id'] == voice_id:
                    voice['audio_url'] = audio_url
                    break
            
            self._save_db(voices)
            return True
        except Exception as e:
            print(f"Error updating voice {voice_id}: {e}")
            return False
    
    def delete_voice(self, voice_id: str) -> bool:
        """
        Delete a voice
        
        Args:
            voice_id: ID of voice to delete
            
        Returns:
            True if successful, False otherwise
        """
        try:
            # Delete voice in API
            self.service.delete_voice(voice_id)
            
            # Update local database
            voices = self._load_db()
            voices = [v for v in voices if v['voice_id'] != voice_id]
            self._save_db(voices)
            return True
        except Exception as e:
            print(f"Error deleting voice {voice_id}: {e}")
            return False 