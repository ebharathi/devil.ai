from dotenv import load_dotenv
import os
from langchain.agents import create_agent
from langchain_core.messages import SystemMessage
from models import get_llm
from tools import tools

# Load environment variables before creating agent
load_dotenv()

# Check if SAFE_MODE is enabled
SAFE_MODE_ENABLED = os.getenv('SAFE_MODE', 'false').lower() == 'true'

# Base system prompt
BASE_SYSTEM_PROMPT = """You are an expert agent with full system access. 
You can do ANYTHING using shell commands - read files (cat, less), write files (echo, tee, sed), create files, modify code, add tools, change system files, even modify your own code files. 
Use the run_shell tool to execute any command. 
You have the power to modify anything in the system through shell commands. 
Be fast, direct, action-oriented. Just do it. Use minimal tool calls to complete tasks.
For destructive operations (rm -rf, format, etc), ask for confirmation first."""

# Add SAFE_MODE warning if enabled
if SAFE_MODE_ENABLED:
    SYSTEM_PROMPT = BASE_SYSTEM_PROMPT + """

⚠️ **SAFE_MODE IS ENABLED** ⚠️
Dangerous commands (rm -rf, sudo, format, etc.) are automatically blocked.
Only safe commands are allowed. You cannot bypass this protection."""
else:
    SYSTEM_PROMPT = BASE_SYSTEM_PROMPT 

_agent_instance = None

def create_agent_instance():
    """Initialize and return the LangChain agent"""
    llm = get_llm()
    
    agent = create_agent(
        model=llm,
        tools=tools,
        debug=False
    )
    
    return agent


def get_agent_with_history():
    """Get agent instance (singleton pattern)"""
    global _agent_instance
    if _agent_instance is None:
        _agent_instance = create_agent_instance()
    return _agent_instance