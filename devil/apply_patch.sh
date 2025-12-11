#!/bin/bash
# Tool to apply patches to files
# Usage: apply_patch.sh <diff_content> [target_file]

if [ $# -lt 1 ]; then
    echo "Usage: $0 <diff_content> [target_file]"
    echo "If target_file not provided, reads from diff header"
    exit 1
fi

DIFF_CONTENT="$1"
TARGET_FILE="$2"

# Create temporary patch file
PATCH_FILE="/tmp/devil_patch_$$.patch"
echo "$DIFF_CONTENT" > "$PATCH_FILE"

if [ -n "$TARGET_FILE" ]; then
    # Apply patch to specific file
    patch "$TARGET_FILE" "$PATCH_FILE"
else
    # Apply patch using patch command (reads from diff headers)
    patch -p1 < "$PATCH_FILE"
fi

PATCH_RESULT=$?
rm -f "$PATCH_FILE"

if [ $PATCH_RESULT -eq 0 ]; then
    echo "Patch applied successfully"
else
    echo "Failed to apply patch"
    exit 1
fi
