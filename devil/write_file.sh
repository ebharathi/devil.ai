#!/bin/bash
# Tool to write content to files
# Usage: write_file.sh <file_path> <new_content>

if [ $# -lt 2 ]; then
    echo "Usage: $0 <file_path> <new_content>"
    exit 1
fi

FILE_PATH="$1"
NEW_CONTENT="$2"

# Create directory if it doesn't exist
mkdir -p "$(dirname "$FILE_PATH")"

# Write content to file
echo "$NEW_CONTENT" > "$FILE_PATH"
echo "File '$FILE_PATH' written successfully"
