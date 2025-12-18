# SAFE_MODE Implementation

## Overview
A dangerous command detection system has been implemented to enhance security when running shell commands. When `SAFE_MODE=true` is set in the environment, potentially dangerous commands will be automatically blocked.

## How to Enable SAFE_MODE

### Option 1: Set in .env file
Add the following line to your `.env` file:
```
SAFE_MODE=true
```

### Option 2: Set as environment variable
```bash
export SAFE_MODE=true
```

### Option 3: Set at runtime
```python
import os
os.environ['SAFE_MODE'] = 'true'
```

## What Commands Are Blocked?

When SAFE_MODE is enabled, the following types of commands are blocked:

### File System Destruction
- `rm -rf` (recursive force deletion)
- `rm --recursive --force`
- Any deletion of root (`/`) or parent (`..`) directories

### System Destruction
- `dd` commands targeting device files (`/dev/`)
- Disk formatting commands (`format`, `mkfs`, `fdisk`)
- File truncation to system files

### Privilege Escalation
- `sudo` commands
- `su` commands
- Dangerous permission changes (`chmod 777 /`, `chown root:`)

### System Services
- `systemctl stop` (stopping services)
- `iptables -F` (flushing firewall rules)

### Process Manipulation
- `killall`, `pkill` (killing processes)
- `kill -9` (force kill)

### Remote Code Execution
- Piping `curl` or `wget` output to `sh` or `bash`
- Remote script execution patterns

### Data Exfiltration & Malware
- Cryptomining commands
- Password file access (`/etc/shadow`, `/etc/passwd`)
- Data exfiltration via SSH/SCP

## Implementation Details

### Files Modified/Added:
1. **`./tools/run_shell.py`** - Updated to check SAFE_MODE and dangerous commands
2. **`./utils/danger_detection.py`** - New utility module for command safety checking
3. **`./agents/__init__.py`** - Updated system prompt to show SAFE_MODE status

### Key Functions:

#### `is_dangerous_command(command: str) -> Tuple[bool, str]`
Checks if a command is dangerous and returns a reason.

#### `check_command_safety(command: str) -> dict`
Returns a comprehensive safety analysis of a command.

#### `get_safe_mode_status() -> bool`
Checks if SAFE_MODE is enabled in the environment.

## Testing

A test script is available at `./test_safe_mode.py`:

```bash
python test_safe_mode.py
```

This script tests:
1. Dangerous command detection patterns
2. SAFE_MODE environment variable handling
3. Actual command blocking with SAFE_MODE enabled

## Example Usage

### With SAFE_MODE disabled (default):
```python
# All commands are allowed
result = run_shell("rm -rf /tmp/test")  # Executes normally
```

### With SAFE_MODE enabled:
```python
# Dangerous commands are blocked
result = run_shell("rm -rf /tmp/test")
# Returns: "ERROR: Command blocked by SAFE_MODE. Reason: Pattern match: Recursive force deletion"
```

### Safe commands work in both modes:
```python
result = run_shell("ls -la")  # Always works
result = run_shell("echo 'hello'")  # Always works
result = run_shell("cat safe_file.txt")  # Always works
```

## Customization

To add more dangerous patterns, edit `./utils/danger_detection.py`:

1. Add to `DANGEROUS_PATTERNS` list for regex patterns
2. Add to `DANGEROUS_STARTERS` list for command prefixes

## Security Notes

1. **SAFE_MODE is not foolproof** - It uses pattern matching and heuristics
2. **Complex command chains** may bypass simple pattern matching
3. **Always verify commands** before execution in production
4. **Use in conjunction with** other security measures (sandboxing, containers, etc.)

## System Prompt Integration

When SAFE_MODE is enabled, the agent's system prompt is automatically updated to inform the AI that dangerous commands will be blocked. This helps the AI understand its limitations and avoid attempting dangerous operations.