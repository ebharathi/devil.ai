"""
Dangerous command detection utility.
This module provides functions to detect potentially dangerous shell commands
across Linux, macOS, and Windows platforms.

Supports:
- Linux/Unix: bash, sh, zsh commands
- macOS: Unix commands + macOS-specific utilities (diskutil, launchctl, dscl, etc.)
- Windows: CMD commands + PowerShell cmdlets

Detection includes:
- File system destruction (rm -rf, del, Remove-Item, etc.)
- Disk operations (format, diskutil, mkfs, etc.)
- Privilege escalation (sudo, su, runas, etc.)
- System service manipulation (systemctl, launchctl, etc.)
- Registry modifications (Windows)
- Remote code execution patterns
- Obfuscated commands
- Data exfiltration patterns
"""

import re
import os
from typing import List, Tuple

# List of dangerous command patterns
DANGEROUS_PATTERNS = [
    # ==================== LINUX/UNIX ====================
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
    (r'mkfs\.', 'Filesystem creation'),
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
    
    # ==================== MACOS SPECIFIC ====================
    # Disk operations
    (r'diskutil\s+erase', 'Disk erasure'),
    (r'diskutil\s+eraseDisk', 'Full disk erasure'),
    (r'diskutil\s+eraseVolume', 'Volume erasure'),
    (r'diskutil\s+partitionDisk', 'Disk partitioning'),
    (r'diskutil\s+reformat', 'Disk reformatting'),
    
    # System services and launchd
    (r'launchctl\s+unload', 'Service unload'),
    (r'launchctl\s+remove', 'Service removal'),
    (r'launchctl\s+disable', 'Service disable'),
    
    # Directory services
    (r'dscl\s+.*\s+delete', 'Directory service deletion'),
    (r'dscl\s+.*\s+passwd', 'Password change via dscl'),
    
    # Security and keychain
    (r'security\s+delete-keychain', 'Keychain deletion'),
    (r'security\s+delete-certificate', 'Certificate deletion'),
    (r'security\s+delete-identity', 'Identity deletion'),
    
    # System integrity
    (r'csrutil\s+disable', 'SIP disable (System Integrity Protection)'),
    (r'nvram\s+-c', 'NVRAM clear'),
    (r'spctl\s+--master-disable', 'Gatekeeper disable'),
    
    # ==================== WINDOWS SPECIFIC ====================
    # File deletion (CMD)
    (r'del\s+/[fqsa]*\s+', 'Force file deletion'),
    (r'rmdir\s+/s\s+/q', 'Recursive directory deletion'),
    (r'rd\s+/s\s+/q', 'Recursive directory deletion'),
    (r'erase\s+/[fqsa]*', 'File erasure'),
    (r'del\s+.*\*\.\*', 'Wildcard deletion'),
    
    # PowerShell file operations
    (r'Remove-Item\s+.*-Recurse', 'PowerShell recursive deletion'),
    (r'Remove-Item\s+.*-Force', 'PowerShell force deletion'),
    (r'Clear-RecycleBin', 'Recycle bin clearing'),
    (r'Remove-Item\s+.*\$env:', 'Environment path deletion'),
    (r'Remove-Item\s+.*C:\\', 'C drive deletion'),
    
    # Disk operations
    (r'format\s+[a-z]:', 'Disk formatting'),
    (r'Format-Volume', 'Volume formatting'),
    (r'diskpart', 'Disk partition utility'),
    (r'cipher\s+/w:', 'Secure disk wipe'),
    (r'cleanmgr\s+/sagerun', 'Disk cleanup'),
    
    # Registry operations
    (r'reg\s+delete', 'Registry deletion'),
    (r'reg\s+add\s+HKLM', 'System registry modification'),
    (r'Remove-ItemProperty', 'Registry property removal'),
    (r'regedit\s+/s', 'Silent registry import'),
    
    # System operations
    (r'shutdown\s+/[srf]', 'System shutdown/restart'),
    (r'Stop-Computer', 'PowerShell shutdown'),
    (r'Restart-Computer', 'PowerShell restart'),
    (r'taskkill\s+/f', 'Force process kill'),
    (r'taskkill\s+/im\s+.*\.exe', 'Process termination'),
    
    # User and permission operations
    (r'net\s+user\s+.*\s+/delete', 'User deletion'),
    (r'net\s+user\s+administrator', 'Administrator account modification'),
    (r'icacls\s+.*\s+/grant', 'Permission grant'),
    (r'takeown\s+/f', 'Ownership taking'),
    
    # PowerShell execution policy
    (r'Set-ExecutionPolicy\s+Bypass', 'Execution policy bypass'),
    (r'Set-ExecutionPolicy\s+Unrestricted', 'Unrestricted execution policy'),
    
    # WMI operations
    (r'wmic\s+.*\s+delete', 'WMI deletion'),
    (r'wmic\s+process\s+.*\s+terminate', 'Process termination via WMI'),
    (r'wmic\s+.*\s+call', 'WMI method call'),
    
    # Boot and system configuration
    (r'bcdedit\s+/delete', 'Boot configuration deletion'),
    (r'bcdedit\s+/set', 'Boot configuration modification'),
    (r'sfc\s+/scannow', 'System file check (potential misuse)'),
    
    # PowerShell malicious patterns
    (r'Invoke-Expression.*\(New-Object', 'Remote code execution'),
    (r'IEX.*\(New-Object', 'Remote code execution'),
    (r'DownloadString.*\|.*IEX', 'Download and execute'),
    (r'Invoke-WebRequest.*\|.*IEX', 'Download and execute'),
    (r'Start-BitsTransfer.*\.exe', 'Background file download'),
    
    # Firewall and security
    (r'netsh\s+firewall\s+set', 'Firewall modification'),
    (r'netsh\s+advfirewall\s+set', 'Advanced firewall modification'),
    (r'Set-MpPreference\s+-DisableRealtimeMonitoring', 'Windows Defender disable'),
    (r'Disable-WindowsOptionalFeature', 'Windows feature disable'),
]

# Commands that are dangerous when they start the command
DANGEROUS_STARTERS = [
    # ==================== LINUX/UNIX ====================
    ('rm -rf', 'Recursive force deletion'),
    ('rm --recursive --force', 'Recursive force deletion'),
    ('dd if=', 'Disk duplication/destruction'),
    ('format ', 'Disk formatting'),
    ('mkfs.', 'Filesystem creation'),
    ('fdisk ', 'Disk partitioning'),
    ('sudo ', 'Superuser privilege'),
    ('su ', 'Switch user'),
    ('chmod 777 ', 'Dangerous permission setting'),
    ('chown root', 'Root ownership change'),
    ('iptables -F', 'Firewall flush'),
    ('systemctl stop', 'Service stop'),
    ('systemctl disable', 'Service disable'),
    ('killall', 'Kill all processes'),
    ('pkill', 'Kill processes by name'),
    (': >', 'File truncation'),
    
    # ==================== MACOS SPECIFIC ====================
    ('diskutil erase', 'Disk erasure'),
    ('diskutil eraseDisk', 'Full disk erasure'),
    ('diskutil eraseVolume', 'Volume erasure'),
    ('diskutil partitionDisk', 'Disk partitioning'),
    ('launchctl unload', 'Service unload'),
    ('launchctl remove', 'Service removal'),
    ('launchctl disable', 'Service disable'),
    ('dscl', 'Directory service command'),
    ('security delete-keychain', 'Keychain deletion'),
    ('csrutil disable', 'SIP disable'),
    ('nvram -c', 'NVRAM clear'),
    ('spctl --master-disable', 'Gatekeeper disable'),
    
    # ==================== WINDOWS (CMD) ====================
    ('del /f', 'Force file deletion'),
    ('del /q', 'Quiet file deletion'),
    ('rmdir /s', 'Recursive directory deletion'),
    ('rd /s', 'Recursive directory deletion'),
    ('format c:', 'C drive formatting'),
    ('format d:', 'D drive formatting'),
    ('diskpart', 'Disk partition utility'),
    ('cipher /w:', 'Secure disk wipe'),
    ('reg delete', 'Registry deletion'),
    ('shutdown /s', 'System shutdown'),
    ('shutdown /r', 'System restart'),
    ('shutdown /f', 'Force shutdown'),
    ('taskkill /f', 'Force process kill'),
    ('net user administrator', 'Administrator modification'),
    ('bcdedit /delete', 'Boot config deletion'),
    ('bcdedit /set', 'Boot config modification'),
    ('netsh firewall', 'Firewall modification'),
    ('netsh advfirewall', 'Advanced firewall modification'),
    
    # ==================== WINDOWS (PowerShell) ====================
    ('Remove-Item', 'PowerShell deletion'),
    ('Clear-RecycleBin', 'Recycle bin clearing'),
    ('Format-Volume', 'Volume formatting'),
    ('Stop-Computer', 'PowerShell shutdown'),
    ('Restart-Computer', 'PowerShell restart'),
    ('Set-ExecutionPolicy Bypass', 'Execution policy bypass'),
    ('Set-ExecutionPolicy Unrestricted', 'Unrestricted execution'),
    ('Remove-ItemProperty', 'Registry property removal'),
    ('Invoke-Expression', 'Dynamic code execution'),
    ('IEX', 'Dynamic code execution'),
    ('Invoke-WebRequest', 'Web request (potential download)'),
    ('Start-BitsTransfer', 'Background transfer'),
    ('Set-MpPreference -DisableRealtimeMonitoring', 'Defender disable'),
    ('Disable-WindowsOptionalFeature', 'Feature disable'),
    ('wmic', 'WMI command'),
    ('takeown /f', 'Ownership taking'),
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
    
    # Remote code execution patterns
    if 'eval' in command_lower and ('curl' in command_lower or 'wget' in command_lower):
        return True, "Remote code execution with eval"
    
    # PowerShell obfuscation detection
    if '-enc' in command_lower or '-encodedcommand' in command_lower:
        return True, "PowerShell encoded command (potential obfuscation)"
    
    # PowerShell download and execute pattern
    if 'downloadstring' in command_lower or 'downloadfile' in command_lower:
        if 'invoke-expression' in command_lower or 'iex' in command_lower:
            return True, "PowerShell download and execute pattern"
    
    # Base64 encoded commands (common in malware)
    if command_lower.count('base64') > 0 and ('decode' in command_lower or 'exec' in command_lower):
        return True, "Base64 encoded command execution"
    
    # Excessive obfuscation attempts
    if command_lower.count('^') > 5:  # Windows command obfuscation
        return True, "Excessive command obfuscation (Windows)"
    
    # Check for /dev/null redirection combined with network tools (data exfiltration)
    if '/dev/null' in command_lower and any(tool in command_lower for tool in ['nc', 'netcat', 'curl', 'wget']):
        return True, "Potential data exfiltration pattern"
    
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