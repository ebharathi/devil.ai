from langchain_core.tools import Tool, StructuredTool
from pydantic import BaseModel, Field
from typing import Optional
from tools.search_web import web_search
from tools.run_shell import run_shell
from tools.web_scraper import web_scrape
from tools.search_memory import search_memory
from tools.get_tool_calls import get_tool_calls
from tools.read_file import read_file
from tools.write_file import write_file
from tools.apply_patch import apply_patch


class SearchMemoryArgs(BaseModel):
    """Arguments for search_memory tool"""
    offset: int = Field(default=0, description='Number of messages to skip (for pagination, ignored if keyword used)')
    limit: int = Field(default=10, description='Maximum number of messages to return (max: 50)')
    keyword: Optional[str] = Field(default=None, description='Optional keyword to search for in message content. When used, offset is ignored and limit applies to search results.')


class WebSearchArgs(BaseModel):
    """Arguments for web_search tool"""
    query: str = Field(description='Search query string')
    max_results: int = Field(default=10, description='Maximum number of results to return')


class ReadFileArgs(BaseModel):
    """Arguments for read_file tool"""
    file_path: str = Field(description='Path to the file to read')
    start_line: Optional[int] = Field(default=None, description='Starting line number (0-indexed, inclusive)')
    end_line: Optional[int] = Field(default=None, description='Ending line number (0-indexed, exclusive)')


class WriteFileArgs(BaseModel):
    """Arguments for write_file tool"""
    file_path: str = Field(description='Path to the file to write')
    content: str = Field(description='Content to write to the file')
    append: bool = Field(default=False, description='If True, append to file; otherwise overwrite')


class ApplyPatchArgs(BaseModel):
    """Arguments for apply_patch tool"""
    diff_content: str = Field(description='Unified diff content to apply')
    target_file: Optional[str] = Field(default=None, description='Optional target file path (if not specified in diff)')


tools = [
    StructuredTool.from_function(
        func=web_search,
        name="duckduckgo_search",
        description="Use DuckDuckGo to search recent information on the internet",
        args_schema=WebSearchArgs
    ),
    Tool(
        name="run_shell",
        func=run_shell,
        description="Execute shell commands on the system. Use this to run terminal commands, check system status, list files, etc. Be careful with destructive commands."
    ),
    Tool(
        name="web_page_scraper",
        func=web_scrape,
        description="Scrape content from any website URL. Returns the page title and text content. Use this to extract information from web pages."
    ),
    StructuredTool.from_function(
        func=search_memory,
        name="search_memory",
        description="Search conversation memory/history. IMPORTANT: You already have direct access to the last 50 messages in the current conversation automatically. Only use this tool when you urgently need to recall specific past conversations beyond the last 50 messages, or when you need to recall specific messages beyond the last 50 messages. ",
        args_schema=SearchMemoryArgs
    ),
    Tool(
        name="get_tool_calls",
        func=get_tool_calls,
        description="Get all tool calls (input/output) for a specific request ID. CRITICAL: You CANNOT make up the request_id. You MUST first use 'search_memory' tool to find messages, which will show request IDs in metadata (format: [Request ID: uuid-here]). Only use the actual request_id from search_memory results. Do NOT use tool names or invent IDs. Parameter: request_id (must be the actual UUID from search_memory metadata for a message)."
    ),
    StructuredTool.from_function(
        func=read_file,
        name="read_file",
        description="Read file content. Can read entire file or specific line ranges.",
        args_schema=ReadFileArgs
    ),
    StructuredTool.from_function(
        func=write_file,
        name="write_file",
        description="Write content to a file. Creates directories if needed.",
        args_schema=WriteFileArgs
    ),
    StructuredTool.from_function(
        func=apply_patch,
        name="apply_patch",
        description="Apply a unified diff patch to a file.",
        args_schema=ApplyPatchArgs
    )
]
