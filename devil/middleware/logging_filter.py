import logging

# Configure logging filter to suppress tool-calls endpoint logs
class ToolCallsLogFilter(logging.Filter):
    def filter(self, record):
        # Filter out access logs for /api/v1/tool-calls endpoint
        message = record.getMessage()
        if "/api/v1/tool-calls" in message:
            return False
        return True


def setup_tool_calls_log_filter():
    """Apply filter to uvicorn access logger"""
    uvicorn_access_logger = logging.getLogger("uvicorn.access")
    uvicorn_access_logger.addFilter(ToolCallsLogFilter())

