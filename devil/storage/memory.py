import json
from datetime import datetime
from typing import List, Dict, Optional

class MemoryStore:
    """Store and retrieve conversation history and memory using Redis"""
    
    def __init__(self, redis_client):
        self.redis = redis_client
        self.conversation_key = "conversations"
        self.memory_key = "memory"
        self.tool_calls_key = "tool_calls"
        self.max_messages = 50
    
    def add_message(self, session_id: str, role: str, content: str, metadata: Optional[Dict] = None):
        """Add a message to conversation history"""
        message = {
            "role": role,  # "user" or "assistant"
            "content": content,
            "timestamp": datetime.now().isoformat(),
            "metadata": metadata or {}
        }
        
        key = f"{self.conversation_key}:{session_id}"
        self.redis.lpush(key, json.dumps(message))
        # Set expiration (60 days)
        self.redis.expire(key, 60 * 24 * 60 * 60)
    
    def get_messages(self, session_id: str, limit: int = 50) -> List[Dict]:
        """Get last N messages from conversation history"""
        key = f"{self.conversation_key}:{session_id}"
        messages = self.redis.lrange(key, 0, limit - 1)
        return [json.loads(msg) for msg in reversed(messages)]  # Reverse to get chronological order
    
    def add_tool_call(self, request_id: str, tool_name: str, tool_input: str, tool_output: str):
        """Store a tool call for a specific request"""
        tool_call = {
            "tool_name": tool_name,
            "input": tool_input,
            "output": tool_output,
            "timestamp": datetime.now().isoformat()
        }
        
        key = f"{self.tool_calls_key}:{request_id}"
        self.redis.lpush(key, json.dumps(tool_call))
        # Set expiration (60 days)
        self.redis.expire(key, 60 * 24 * 60 * 60)
    
    def get_tool_calls(self, request_id: str) -> List[Dict]:
        """Get all tool calls for a specific request"""
        key = f"{self.tool_calls_key}:{request_id}"
        tool_calls_raw = self.redis.lrange(key, 0, -1)
        
        if not tool_calls_raw:
            return []
        
        tool_calls = []
        for call_raw in tool_calls_raw:
            try:
                tool_calls.append(json.loads(call_raw))
            except json.JSONDecodeError:
                continue
        
        # Return in chronological order (oldest first)
        return list(reversed(tool_calls))
  
