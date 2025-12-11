#!/bin/bash
# Tool to read files with optional line ranges
# Usage: read_file.sh <file_path> [start_line] [end_line]

if [ $# -lt 1 ]; then
    echo "Usage: $0 <file_path> [start_line] [end_line]"
    exit 1
fi

FILE_PATH="$1"
START_LINE="${2:-1}"
END_LINE="${3:-}"

if [ ! -f "$FILE_PATH" ]; then
    echo "Error: File '$FILE_PATH' does not exist"
    exit 1
fi

if [ -n "$END_LINE" ]; then
    # Read specific line range
    sed -n "${START_LINE},${END_LINE}p" "$FILE_PATH"
else
    # Read from start line to end
    tail -n +"$START_LINE" "$FILE_PATH"
fi
