from storage import memory_store
from utils.logger import log_tool_call

@log_tool_call
def get_tool_calls(request_id: str) -> str:
    """
    Get all tool calls (input/output) for a specific request ID.
    Use this to see what tools were executed and their results for a particular request.
    
    Args:
        request_id: The request ID to fetch tool calls for
        
    Returns:
        Formatted string with all tool calls for the request
    """
    if not memory_store:
        return "Memory store not available (Redis not connected)"
    
    try:
        tool_calls = memory_store.get_tool_calls(request_id)
        
        if not tool_calls:
            return f"No tool calls found for request ID: {request_id}"
        
        result = f"Found {len(tool_calls)} tool calls for request ID '{request_id}':\n\n"
        
        for i, call in enumerate(tool_calls, start=1):
            tool_name = call.get("tool_name", "unknown")
            tool_input = call.get("input", "")
            tool_output = call.get("output", "")
            timestamp = call.get("timestamp", "")
            
            # Truncate long outputs
            output_preview = tool_output[:300] + "..." if len(tool_output) > 300 else tool_output
            
            result += f"[{i}] {tool_name.upper()} ({timestamp})\n"
            result += f"  Input: {tool_input[:200]}{'...' if len(tool_input) > 200 else ''}\n"
            result += f"  Output: {output_preview}\n\n"
        
        return result
        
    except Exception as e:
        return f"Error fetching tool calls: {str(e)}"

