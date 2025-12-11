from fastapi import APIRouter, HTTPException, Header
from pydantic import BaseModel
from typing import Optional
from controllers.ask import process_query
from controllers.history import get_conversation_history

router = APIRouter()


class QueryRequest(BaseModel):
    query: str
    session_id: Optional[str] = None


class QueryResponse(BaseModel):
    response: str
    session_id: str
    request_id: str


class ErrorResponse(BaseModel):
    error: str


@router.get("/")
def home():
    return {"status": "Agent System is running"}

@router.get("/api/v1/health")
def health():
    return {"status": "Agent System is running"}

@router.get("/api/v1/history/{session_id}")
def get_history(session_id: str, limit: int = 50):
    """Get conversation history for a session"""
    try:
        return get_conversation_history(session_id, limit=limit)
    except ValueError as e:
        raise HTTPException(status_code=503, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/api/v1/chat", response_model=QueryResponse)
def ask(request: QueryRequest, x_session_id: Optional[str] = Header(None, alias="X-Session-ID")):
    """Handle user query and return agent response"""
    # Use session_id from header or request body, or generate default
    session_id = x_session_id or request.session_id or "default"
    
    try:
        response, session_id, request_id = process_query(session_id, request.query)
        return QueryResponse(response=response, session_id=session_id, request_id=request_id)
    except Exception as e:
        from utils.logger import log_conversation
        log_conversation(session_id, request.query, "", error=str(e))
        raise HTTPException(status_code=500, detail=str(e))

