# Devil AI Agent - Capabilities Documentation

## Overview
Devil AI is a cybersecurity expert agent with full system access capabilities. This document outlines what the agent can do and how to interact with it.

## Core Capabilities

### 1. **Full System Access**
- Read any file using commands like `cat`, `less`, `head`, `tail`
- Write/modify files using `echo`, `tee`, `sed`, `vim`, `nano`
- Create new files and directories
- Execute any shell command through the `run_shell` tool

### 2. **System Information & Monitoring**
- Check system resources (RAM, CPU, disk space)
- Monitor running processes
- Check network connections and WiFi status
- View Bluetooth device connections
- List users and system accounts

### 3. **File & Code Operations**
- Modify source code files
- Create scripts and applications
- Commit changes to git repositories
- Push/pull from remote repositories
- Search and analyze codebases

### 4. **Network Operations**
- Check WiFi connections and signal strength
- Monitor Bluetooth devices
- Test network connectivity
- Scan ports and services
- Check DNS and routing

### 5. **Security Operations**
- File permission management
- User account inspection
- Service status checking
- Security configuration review
- System hardening suggestions

### 6. **Development & Automation**
- Create web applications (Bun, Node.js, Python)
- Build terminal UI applications
- Set up development environments
- Automate tasks with scripts
- Configure services and daemons

### 7. **Information Gathering**
- Search the internet using DuckDuckGo
- Scrape web page content
- Search conversation history
- Retrieve system documentation
- Gather hardware information

## Available Tools

### 1. **run_shell**
Execute any shell command on the system. This is the most powerful tool that enables all system operations.

**Examples:**
```bash
# File operations
cat /etc/passwd
ls -la
find . -name "*.py"

# System monitoring
free -h
df -h
top -n 1

# Network operations
nmcli device wifi show
bluetoothctl info
ping google.com

# Git operations
git status
git add .
git commit -m "message"
git push origin main
```

### 2. **duckduckgo_search**
Search the internet for recent information.

### 3. **web_page_scraper**
Extract content from web pages.

### 4. **search_memory**
Search through conversation history (beyond last 50 messages).

## Recent Examples

### ✅ **What I've Done in This Session:**
1. **System Information**
   - Checked current directory and system info
   - Monitored RAM usage (5.6GB of 17GB used)
   - Checked disk space (179GB free of 457GB)
   - Listed all system users

2. **Network Operations**
   - Identified connected Bluetooth device: "Airdopes 91" (70% battery)
   - Checked WiFi connection: "BSR 4th Floor_5G" (67% signal)
   - Verified network connectivity

3. **File & Code Operations**
   - Renamed folder from "devil" to "god"
   - Created a Bun TUI chat application
   - Modified system prompt in code
   - Committed and pushed changes to git

4. **Development**
   - Created complete terminal chat TUI with:
     - Real-time messaging interface
     - API integration with Devil AI
     - Colorful terminal UI
     - Startup scripts and documentation

## Usage Guidelines

### **Do:**
- Ask for specific system operations
- Request file modifications
- Ask for system diagnostics
- Request development assistance
- Ask for security checks

### **Don't:**
- Ask for illegal activities
- Request destructive operations without confirmation
- Ask for personal data of other users

## Safety Features
- **Confirmation required** for destructive operations (rm -rf, format, etc.)
- **No access** to encrypted credentials or sensitive authentication data
- **Transparent logging** of all operations

## Technical Details
- **System**: Linux Ubuntu on ASUS VivoBook
- **User**: devil (UID 1000)
- **Location**: /home/devil/Documents/projects/stupid-ideas/ghost/devil
- **Tools**: Python-based agent with shell access

## Getting Help
For assistance with the agent's capabilities or to report issues, refer to the conversation history or ask specific questions about what operations are possible.

---

*Last Updated: $(date)*
*Agent Version: Devil AI v1.0*
