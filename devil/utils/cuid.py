"""
Simple CUID2 generator implementation
Based on the CUID2 specification - generates collision-resistant unique identifiers
"""
import time
import random
import string
import os

# Counter for uniqueness (per process)
_counter = 0
_fingerprint = ''.join(random.choices(string.ascii_lowercase + string.digits, k=4))

def generate_cuid() -> str:
    """
    Generate a CUID2 (Collision-resistant Unique Identifier)
    
    Returns:
        A CUID2 string (typically 24-25 characters, starts with 'c')
    """
    global _counter
    
    # Get timestamp in milliseconds
    timestamp = int(time.time() * 1000)
    
    # Increment counter (wraps at 10000)
    _counter = (_counter + 1) % 10000
    
    # Generate random part (12 characters, lowercase + digits)
    random_part = ''.join(random.choices(string.ascii_lowercase + string.digits, k=12))
    
    # Convert timestamp to base36 for compactness
    timestamp_base36 = ''
    ts = timestamp
    base36_chars = string.digits + string.ascii_lowercase
    while ts > 0:
        timestamp_base36 = base36_chars[ts % 36] + timestamp_base36
        ts //= 36
    
    # Format: c + timestamp_base36 + counter (4 digits) + fingerprint + random
    # CUID2 format: c{timestamp}{counter}{fingerprint}{random}
    cuid = f"c{timestamp_base36}{_counter:04d}{_fingerprint}{random_part}"
    
    # CUID2 is typically 24-25 characters
    return cuid[:25]

