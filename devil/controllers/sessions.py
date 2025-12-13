from storage import memory_store
from typing import List, Dict

def get_all_sessions() -> List[Dict]:
    """Get all sessions with session_id and last_message"""
    if not memory_store:
        return []
    
    try:
        return memory_store.get_all_sessions()
    except Exception as e:
        raise Exception(f"Failed to retrieve sessions: {str(e)}")

