"""
Dangerous command detection utility.
This module provides functions to detect potentially dangerous shell commands.
"""

import re
import os
from typing import List, Tuple

# List of dangerous command patterns
DANGEROUS_PATTERNS = [
    # File system destruction
    (r'rm\s+-rf\s+', 'Recursive force deletion'),
    (r'rm\s+--recursive\s+--force\s+', 'Recursive force deletion'),
    (r'rm\s+-r\s+-f\s+', 'Recursive force deletion'),
    (r'rm\s+-fr\s+', 'Recursive force deletion'),
    (r'rm\s+-rf\s+/', 'Root directory deletion'),
    (r'rm\s+-rf\s+\.\.', 'Parent directory deletion'),
    (r'rm\s+-rf\s+\*', 'Wildcard deletion'),
    (r'rm\s+-rf\s+~', 'Home directory deletion'),
    
    # System destruction
    (r'dd\s+if=.*\s+of=/dev/', 'Disk destruction'),
    (r':\s*>\s*/', 'File truncation to root'),
    (r'>\s*/dev/', 'Device file overwrite'),
    (r'format\s+', 'Disk formatting'),
    (r'mkfs\.', 'Filesystem creation'),  # Catch mkfs.ext4, mkfs.xfs, etc.
    (r'fdisk\s+', 'Disk partitioning'),
    
    # Privilege escalation and permission changes
    (r'sudo\s+', 'Superuser privilege'),
    (r'su\s+', 'Switch user'),
    (r'chmod\s+[0-7][0-7][0-7]\s+/', 'Root permission change'),
    (r'chown\s+root:', 'Root ownership change'),
    (r'chmod\s+777\s+', 'Dangerous permission setting'),
    
    # Network and system services
    (r'iptables\s+-F', 'Firewall flush'),
    (r'iptables\s+--flush', 'Firewall flush'),
    (r'systemctl\s+stop\s+', 'Service stop'),
    (r'systemctl\s+disable\s+', 'Service disable'),
    (r'service\s+.*\s+stop', 'Service stop'),
    
    # Process manipulation
    (r'killall\s+', 'Kill all processes'),
    (r'pkill\s+', 'Kill processes by name'),
    (r'kill\s+-9\s+', 'Force kill signal'),
    
    # Remote code execution
    (r'curl\s+.*\s+\|\s+sh', 'Remote script execution via curl'),
    (r'wget\s+.*\s+\|\s+sh', 'Remote script execution via wget'),
    (r'curl\s+.*\s+\|\s+bash', 'Remote script execution via curl to bash'),
    (r'wget\s+.*\s+\|\s+bash', 'Remote script execution via wget to bash'),
    
    # Cryptomining and malware
    (r'minerd\s+', 'Cryptocurrency miner'),
    (r'xmrig\s+', 'Cryptocurrency miner'),
    (r'wget.*pool.*mining', 'Mining pool download'),
    
    # Data exfiltration
    (r'tar.*ssh.*@', 'Data exfiltration via SSH'),
    (r'scp.*@.*:', 'Secure copy to remote'),
    
    # System information gathering for attacks
    (r'cat\s+/etc/shadow', 'Password file access'),
    (r'cat\s+/etc/passwd', 'User file access'),
]

# Commands that are dangerous when they start the command
DANGEROUS_STARTERS = [
    ('rm -rf', 'Recursive force deletion'),
    ('rm --recursive --force', 'Recursive force deletion'),
    ('dd if=', 'Disk duplication/destruction'),
    ('format ', 'Disk formatting'),
    ('mkfs.', 'Filesystem creation'),  # Catch mkfs.ext4, mkfs.xfs, etc.
    ('fdisk ', 'Disk partitioning'),
    ('sudo ', 'Superuser privilege'),
    ('su ', 'Switch user'),
    ('chmod 777 ', 'Dangerous permission setting'),
    ('chown root', 'Root ownership change'),
    ('iptables -F', 'Firewall flush'),
    ('systemctl stop', 'Service stop'),
    ('killall', 'Kill all processes'),
    ('pkill', 'Kill processes by name'),
    (': >', 'File truncation'),
]

def is_dangerous_command(command: str) -> Tuple[bool, str]:
    """
    Check if a shell command is potentially dangerous.
    
    Args:
        command: The shell command to check
        
    Returns:
        Tuple of (is_dangerous: bool, reason: str)
    """
    command_lower = command.lower().strip()
    
    # Check for dangerous patterns
    for pattern, reason in DANGEROUS_PATTERNS:
        if re.search(pattern, command_lower):
            return True, f"Pattern match: {reason}"
    
    # Check for commands that start with dangerous operations
    for starter, reason in DANGEROUS_STARTERS:
        if command_lower.startswith(starter.lower()):
            return True, f"Starts with dangerous command: {reason}"
    
    # Additional heuristic checks
    if command_lower.count('|') > 3:
        return True, "Too many pipes (potential command chaining attack)"
    
    if command_lower.count(';') > 3:
        return True, "Too many semicolons (potential command injection)"
    
    if command_lower.count('&&') > 3:
        return True, "Too many logical ANDs (potential complex attack chain)"
    
    if 'eval' in command_lower and ('curl' in command_lower or 'wget' in command_lower):
        return True, "Remote code execution with eval"
    
    return False, "Command appears safe"

def check_command_safety(command: str) -> dict:
    """
    Comprehensive command safety check.
    
    Args:
        command: The shell command to check
        
    Returns:
        Dictionary with safety analysis
    """
    is_dangerous, reason = is_dangerous_command(command)
    
    return {
        'command': command,
        'is_dangerous': is_dangerous,
        'reason': reason if is_dangerous else 'Safe',
        'safe_mode_enabled': os.getenv('SAFE_MODE', 'false').lower() == 'true'
    }

def get_safe_mode_status() -> bool:
    """
    Check if SAFE_MODE is enabled.
    
    Returns:
        True if SAFE_MODE is enabled, False otherwise
    """
    return os.getenv('SAFE_MODE', 'false').lower() == 'true'