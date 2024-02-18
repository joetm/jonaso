#!/usr/bin/bash

# Directory containing the files to compress
# dir=$1
# Check if directory is provided
# if [ -z "$dir" ]; then
#   echo "Usage: $0 <directory>"
#   exit 1
# fi

dir="./cache_embeddings"

# Navigate to the directory
cd "$dir"

# Compress each JSON file to LZMA format
for file in *.json; do
  if [ -f "$file" ]; then
    lzma -k "$file" && rm "$file"
  fi
done

