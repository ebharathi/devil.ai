from langchain_core.tools import Tool
from tools.search_web import web_search
from tools.run_shell import run_shell
from tools.web_scraper import web_scrape
from tools.search_memory import search_memory
from tools.get_tool_calls import get_tool_calls

tools = [
    Tool(
        name="duckduckgo_search",
        func=web_search,
        description="Use DuckDuckGo to search recent information on the internet"
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
    Tool(
        name="search_memory",
        func=search_memory,
        description="Search conversation memory/history. IMPORTANT: You already have direct access to the last 50 messages in the current conversation automatically. Only use this tool when you urgently need to recall specific past conversations beyond the last 50 messages, or when you need to recall specific messages beyond the last 50 messages. Parameters: session_id (default: 'default'), offset (for pagination, ignored if keyword used), limit (max: 50), keyword (optional - searches message content, when used offset is ignored and limit applies to search results)."
    ),
    Tool(
        name="get_tool_calls",
        func=get_tool_calls,
        description="Get all tool calls (input/output) for a specific request ID. Use this to see what tools were executed and their results for a particular request. Parameter: request_id (the request ID to fetch tool calls for)."
    )
]

