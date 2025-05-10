import os
import speech_recognition as sr
from typing import Dict, Any, Optional
import tempfile

class SpeechRecognizer:
    """
    Handles speech recognition to convert audio to text
    """
    def __init__(self, language: str = "zh-CN"):
        """
        Initialize the speech recognizer
        
        Args:
            language: Language code for recognition
        """
        self.recognizer = sr.Recognizer()
        self.language = language
    
    def recognize_from_file(self, audio_file_path: str) -> Dict[str, Any]:
        """
        Recognize speech from an audio file
        
        Args:
            audio_file_path: Path to audio file
            
        Returns:
            Dictionary with recognition results
        """
        try:
            with sr.AudioFile(audio_file_path) as source:
                audio_data = self.recognizer.record(source)
                
            text = self.recognizer.recognize_google(
                audio_data,
                language=self.language
            )
            
            return {
                "text": text,
                "success": True
            }
        except sr.UnknownValueError:
            return {
                "text": "",
                "success": False,
                "error": "Speech could not be understood"
            }
        except sr.RequestError as e:
            return {
                "text": "",
                "success": False,
                "error": f"Recognition service error: {e}"
            }
        except Exception as e:
            return {
                "text": "",
                "success": False,
                "error": f"Error recognizing speech: {e}"
            }
    
    def recognize_from_bytes(self, audio_bytes: bytes, file_format: str = "wav") -> Dict[str, Any]:
        """
        Recognize speech from audio bytes
        
        Args:
            audio_bytes: Audio data as bytes
            file_format: Format of the audio (wav, mp3, etc.)
            
        Returns:
            Dictionary with recognition results
        """
        # Create a temporary file to save the audio bytes
        with tempfile.NamedTemporaryFile(suffix=f".{file_format}", delete=False) as temp_file:
            temp_file_path = temp_file.name
            temp_file.write(audio_bytes)
        
        try:
            # Recognize from the temporary file
            result = self.recognize_from_file(temp_file_path)
            return result
        finally:
            # Clean up the temporary file
            if os.path.exists(temp_file_path):
                os.remove(temp_file_path) 