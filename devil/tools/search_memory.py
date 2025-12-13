from storage import memory_store
from utils.logger import log_tool_call

@log_tool_call
def search_memory( offset: int = 0, limit: int = 10, keyword: str = None) -> str:
    """
    Search conversation memory/history.
    Use this tool ONLY when you need to recall specific past conversations 
    or when the user specifically asks about previous conversations about specific topics.
    
    Note: You already have direct access to the last 50 messages in the current conversation,
    so only use this tool if you need to search beyond that or need to recall past conversation about specific topics.
    
    Args:
        offset: Number of messages to skip (for pagination, default: 0). Ignored if keyword is provided.
        limit: Maximum number of messages to return (default: 10, max: 50)
        keyword: Optional keyword to search for in message content. If provided, searches all messages and returns matching results up to limit (offset is ignored).
        
    Returns:
        Formatted string with conversation history
    """
    session_id = "default"
    if not memory_store:
        return "Memory store not available (Redis not connected)"
    
    if limit > 50:
        limit = 50
    
    try:
        if keyword:
            # Keyword search: get all messages and filter by keyword
            all_messages = memory_store.get_messages(session_id, 10000)  # Get more for search
            
            # Filter messages containing keyword (case-insensitive)
            keyword_lower = keyword.lower()
            matching_messages = []
            for msg in all_messages:
                content = msg.get("content", "").lower()
                if keyword_lower in content:
                    matching_messages.append(msg)
                    if len(matching_messages) >= limit:
                        break
            
            if not matching_messages:
                return f"No messages found containing keyword '{keyword}' for session '{session_id}'"
            
            # Format response
            result = f"Found {len(matching_messages)} messages containing '{keyword}' for session '{session_id}':\n\n"
            for i, msg in enumerate(matching_messages, start=1):
                role = msg.get("role", "unknown")
                content = msg.get("content", "")
                timestamp = msg.get("timestamp", "")
                metadata = msg.get("metadata", {})
                request_id = metadata.get("request_id", "N/A")
                result += f"[{i}] {role.upper()} ({timestamp}) [Request ID: {request_id}]: {content}\n\n"
            
            return result
        else:
            # Regular pagination: get messages with offset
            all_messages = memory_store.get_messages(session_id, limit=offset + limit)
            
            # Apply offset
            messages = all_messages[offset:offset + limit]
            
            if not messages:
                return f"No messages found for session '{session_id}' at offset {offset}"
            
            # Format response
            result = f"Found {len(messages)} messages for session '{session_id}':\n\n"
            for i, msg in enumerate(messages, start=offset + 1):
                role = msg.get("role", "unknown")
                content = msg.get("content", "")
                timestamp = msg.get("timestamp", "")
                metadata = msg.get("metadata", {})
                request_id = metadata.get("request_id", "N/A")
                result += f"[{i}] {role.upper()} ({timestamp}) [Request ID: {request_id}]: {content}\n\n"
            
            return result
        
    except Exception as e:
        return f"Error searching memory: {str(e)}"

