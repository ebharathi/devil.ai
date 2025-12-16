import logging
import functools
from datetime import datetime
from typing import Optional, Callable, Any
from contextvars import ContextVar

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)

logger = logging.getLogger(__name__)

# Context variable for request ID (works across threads/async)
_request_id_var: ContextVar[Optional[str]] = ContextVar('request_id', default=None)

def set_request_id(request_id: str):
    """Set the current request ID in context variable"""
    _request_id_var.set(request_id)

def get_request_id() -> Optional[str]:
    """Get the current request ID from context variable"""
    return _request_id_var.get()


def log_tool_call(func: Callable) -> Callable:
    """
    Decorator to automatically log tool calls.
    Logs [TOOL START], [TOOL END], and [TOOL ERROR] for all tool functions.
    Also stores tool calls in Redis if request_id is available.
    """
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        tool_name = func.__name__
        request_id = get_request_id()
        
        # Format arguments for logging
        args_str = ", ".join([str(arg) for arg in args])
        kwargs_str = ", ".join([f"{k}={v}" for k, v in kwargs.items()])
        all_args = ", ".join(filter(None, [args_str, kwargs_str]))
        
        # Log tool start
        logger.info(f"[TOOL START] {tool_name}: {all_args}")
        
        try:
            # Execute the tool function
            result = func(*args, **kwargs)
            
            result_str = str(result)
            len_result_str = len(result_str)
            # Log tool end
            logger.info(f"[TOOL END] {tool_name}: {result_str[:100]} {'(truncated)' if len_result_str > 100 else ''}")
            
            # Store tool call in Redis if request_id is available
            if request_id:
                try:
                    from storage import memory_store
                    if memory_store:
                        memory_store.add_tool_call(request_id, tool_name, all_args, str(result))
                    else:
                        logger.warning(f"[TOOL STORE FAILED] memory_store is None for request_id: {request_id}")
                except Exception as e:
                    logger.error(f"[TOOL STORE ERROR] Failed to store tool call: {e}", exc_info=True)
            else:
                logger.warning(f"[TOOL NO REQUEST_ID] tool={tool_name} - no request_id available")
            
            return result
            
        except Exception as e:
            # Log tool error
            logger.error(f"[TOOL ERROR] {tool_name}: {str(e)}")
            
            # Store error in Redis if request_id is available
            if request_id:
                try:
                    from storage import memory_store
                    if memory_store:
                        memory_store.add_tool_call(request_id, tool_name, all_args, f"ERROR: {str(e)}")
                except Exception:
                    pass
            
            raise
    
    return wrapper


def log_conversation(session_id: str, query: str, response: str, error: Optional[str] = None):
    """Log conversation for debugging and context"""
    log_entry = {
        "session_id": session_id,
        "timestamp": datetime.now().isoformat(),
        "query": query,
        "response": response,
        "error": error
    }
    
    if error:
        logger.error(f"Session {session_id}: Error - {error}")
        logger.error(f"Query: {query}")
    else:
        logger.info(f"Session {session_id}: Query - {query[:100]}...")
        logger.info(f"Session {session_id}: Response - {response[:100]}...")
    
    return log_entry

