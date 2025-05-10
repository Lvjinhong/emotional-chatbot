import os
import time
import logging
import oss2
from typing import Dict, Any, Optional

class OssStorage:
    """
    Handles file storage operations with Aliyun OSS
    """
    def __init__(
        self,
        access_key_id: str,
        access_key_secret: str,
        bucket_name: str = "voice-clone-bucket",
        endpoint: str = "https://oss-cn-hangzhou.aliyuncs.com",
        region: str = "cn-hangzhou"
    ):
        """
        Initialize OSS storage
        
        Args:
            access_key_id: OSS access key ID
            access_key_secret: OSS access key secret
            bucket_name: OSS bucket name
            endpoint: OSS endpoint
            region: OSS region
        """
        # Set up logging
        logging.basicConfig(level=logging.INFO, 
                            format='%(asctime)s - %(levelname)s - %(message)s')
        
        # Create auth object
        self.auth = oss2.Auth(access_key_id, access_key_secret)
        
        # Initialize bucket
        self.bucket_name = bucket_name
        self.endpoint = endpoint
        self.region = region
        self.bucket = oss2.Bucket(self.auth, endpoint, bucket_name, region=region)
        
        # Ensure bucket exists
        self._ensure_bucket_exists()
    
    def _ensure_bucket_exists(self):
        """Ensure bucket exists, create if it doesn't"""
        try:
            # Check if bucket exists
            self.bucket.get_bucket_info()
            logging.info(f"Bucket {self.bucket_name} already exists")
        except oss2.exceptions.NoSuchBucket:
            # Create bucket if it doesn't exist
            try:
                self.bucket.create_bucket(oss2.models.BUCKET_ACL_PRIVATE)
                logging.info(f"Bucket {self.bucket_name} created successfully")
            except oss2.exceptions.OssError as e:
                logging.error(f"Failed to create bucket: {e}")
                raise
    
    def upload_file(self, local_file_path: str, object_name: Optional[str] = None) -> Dict[str, Any]:
        """
        Upload file to OSS
        
        Args:
            local_file_path: Path to local file
            object_name: Name to use for object in OSS (default: filename)
            
        Returns:
            Dictionary with URL and status
        """
        try:
            # Generate object name if not provided
            if not object_name:
                # Get filename and add timestamp to ensure uniqueness
                base_name = os.path.basename(local_file_path)
                timestamp = int(time.time())
                object_name = f"{timestamp}_{base_name}"
            
            # Upload file
            result = self.bucket.put_object_from_file(object_name, local_file_path)
            
            # Generate a URL with temporary access (10 minutes)
            url = self.bucket.sign_url('GET', object_name, 600, slash_safe=True)
            
            logging.info(f"File uploaded successfully to {object_name}")
            
            return {
                "url": url,
                "object_name": object_name,
                "status_code": result.status,
                "success": True
            }
        except oss2.exceptions.OssError as e:
            logging.error(f"Failed to upload file: {e}")
            return {
                "url": None,
                "object_name": None,
                "success": False,
                "error": str(e)
            }
    
    def upload_bytes(self, data: bytes, object_name: str) -> Dict[str, Any]:
        """
        Upload bytes to OSS
        
        Args:
            data: Bytes to upload
            object_name: Name to use for object in OSS
            
        Returns:
            Dictionary with URL and status
        """
        try:
            # Upload bytes
            result = self.bucket.put_object(object_name, data)
            
            # Generate a URL with temporary access (10 minutes)
            url = self.bucket.sign_url('GET', object_name, 600, slash_safe=True)
            
            logging.info(f"Data uploaded successfully to {object_name}")
            
            return {
                "url": url,
                "object_name": object_name,
                "status_code": result.status,
                "success": True
            }
        except oss2.exceptions.OssError as e:
            logging.error(f"Failed to upload data: {e}")
            return {
                "url": None,
                "object_name": None,
                "success": False,
                "error": str(e)
            }
    
    def download_file(self, object_name: str, local_file_path: str) -> Dict[str, Any]:
        """
        Download file from OSS
        
        Args:
            object_name: Name of object in OSS
            local_file_path: Path to save file locally
            
        Returns:
            Dictionary with status
        """
        try:
            # Create directory if it doesn't exist
            os.makedirs(os.path.dirname(local_file_path), exist_ok=True)
            
            # Download file
            self.bucket.get_object_to_file(object_name, local_file_path)
            
            logging.info(f"File downloaded successfully to {local_file_path}")
            
            return {
                "local_file_path": local_file_path,
                "success": True
            }
        except oss2.exceptions.OssError as e:
            logging.error(f"Failed to download file: {e}")
            return {
                "local_file_path": None,
                "success": False,
                "error": str(e)
            }
    
    def delete_object(self, object_name: str) -> Dict[str, Any]:
        """
        Delete object from OSS
        
        Args:
            object_name: Name of object in OSS
            
        Returns:
            Dictionary with status
        """
        try:
            # Delete object
            self.bucket.delete_object(object_name)
            
            logging.info(f"Object {object_name} deleted successfully")
            
            return {
                "success": True
            }
        except oss2.exceptions.OssError as e:
            logging.error(f"Failed to delete object: {e}")
            return {
                "success": False,
                "error": str(e)
            } 