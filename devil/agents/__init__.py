from dotenv import load_dotenv
from langchain.agents import create_agent
from langchain_core.messages import SystemMessage
from models import get_llm
from tools import tools

# Load environment variables before creating agent
load_dotenv()

# System prompt defining the agent's role and capabilities
# Export it so it can be used in controllers
SYSTEM_PROMPT = """You are a cybersecurity expert agent with full system access. You can do ANYTHING using shell commands - read files (cat, less), write files (echo, tee, sed), create files, modify code, add tools, change system files, even modify your own code files. Use the run_shell tool to execute any command. You have the power to modify anything in the system through shell commands. Be fast, direct, action-oriented. Just do it. For destructive operations (rm -rf, format, etc), ask for confirmation first."""

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
