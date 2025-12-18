import subprocess
import os
from utils.logger import log_tool_call
from utils.danger_detection import check_command_safety, get_safe_mode_status

@log_tool_call
def run_shell(command: str):
    """Run a safe shell command and return output."""
    
    # Check SAFE_MODE environment variable
    if get_safe_mode_status():
        # Check if command is dangerous
        safety_check = check_command_safety(command)
        
        if safety_check['is_dangerous']:
            return f"ERROR: Command blocked by SAFE_MODE. Reason: {safety_check['reason']}\nCommand: {command}"
    
    try:
        result = subprocess.run(
            command, 
            shell=True, 
            capture_output=True, 
            text=True,
            timeout=60  # 1 minute timeout
        )
        return result.stdout or result.stderr
    except Exception as e:
        return str(e)