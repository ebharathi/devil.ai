import uuid
from typing import Optional
from langchain_core.messages import HumanMessage, AIMessage, SystemMessage
from agents import get_agent_with_history, SYSTEM_PROMPT
from storage import memory_store
from utils.logger import log_conversation, set_request_id


def process_query(session_id: str, query: str, request_id: Optional[str] = None) -> tuple[str, str, str]:
    """
    Process a user query and return the response along with session_id and request_id.
    
    Args:
        session_id: Session identifier
        query: User query string
        request_id: Optional request ID (will be generated if not provided)
        
    Returns:
        Tuple of (response, session_id, request_id)
    """
    # Generate request ID if not provided
    if not request_id:
        request_id = str(uuid.uuid4())
    
    # Set request ID in thread-local storage for tool call tracking
    set_request_id(request_id)
    print(f"[DEBUG] Set request_id: {request_id} for session: {session_id}")
    
    # Get conversation history (last 50 messages) if Redis is available
    history = []
    if memory_store:
        try:
            history = memory_store.get_messages(session_id, limit=50)
        except Exception as e:
            log_conversation(session_id, query, "", error=f"Redis error: {e}")
    
    # Build messages list with system prompt and history
    messages = []
    
    # Always add system message first to maintain context
    messages.append(SystemMessage(content=SYSTEM_PROMPT))
    
    # Add conversation history
    for msg in history:
        if msg["role"] == "user":
            messages.append(HumanMessage(content=msg["content"]))
        elif msg["role"] == "assistant":
            messages.append(AIMessage(content=msg["content"]))
    
    # Add current query
    messages.append(HumanMessage(content=query))
    
    # Get agent with history context
    agent = get_agent_with_history()
    
    # Invoke agent with full message history
    result = agent.invoke({"messages": messages})
    
    # Extract the response from the agent result
    result_messages = result.get("messages", [])
    if result_messages:
        # Get the last message which should be the AI response
        response = result_messages[-1].content
    else:
        response = str(result)
    
    # Store conversation in Redis if available (with request_id in metadata)
    if memory_store:
        try:
            memory_store.add_message(session_id, "user", query, metadata={"request_id": request_id})
            memory_store.add_message(session_id, "assistant", response, metadata={"request_id": request_id})
        except Exception as e:
            log_conversation(session_id, query, response, error=f"Redis storage error: {e}")
    
    # Log conversation
    log_conversation(session_id, query, response)
    
    return response, session_id, request_id

