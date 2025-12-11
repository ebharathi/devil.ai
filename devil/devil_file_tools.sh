#!/bin/bash
# Devil File Tools - Unified interface for file operations
# Usage: devil_file_tools.sh <command> [args...]

COMMAND="$1"
shift

case "$COMMAND" in
    read)
        # Read file with optional line range
        FILE="$1"
        START="${2:-1}"
        END="${3:-}"
        
        if [ -n "$END" ]; then
            sed -n "${START},${END}p" "$FILE"
        else
            tail -n +"$START" "$FILE"
        fi
        ;;
        
    write)
        # Write content to file
        FILE="$1"
        CONTENT="$2"
        mkdir -p "$(dirname "$FILE")"
        echo "$CONTENT" > "$FILE"
        echo "Written to $FILE"
        ;;
        
    patch)
        # Apply patch
        DIFF="$1"
        TARGET="$2"
        PATCH_FILE="/tmp/devil_patch_$$.patch"
        echo "$DIFF" > "$PATCH_FILE"
        
        if [ -n "$TARGET" ]; then
            patch "$TARGET" "$PATCH_FILE"
        else
            patch -p1 < "$PATCH_FILE"
        fi
        
        rm -f "$PATCH_FILE"
        echo "Patch applied"
        ;;
        
    *)
        echo "Available commands:"
        echo "  read <file> [start] [end]    - Read file (optionally lines start-end)"
        echo "  write <file> <content>       - Write content to file"
        echo "  patch <diff> [target]        - Apply patch (diff format)"
        exit 1
        ;;
esac
