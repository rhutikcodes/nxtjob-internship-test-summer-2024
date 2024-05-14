#!/bin/bash

echo "
 _    _ _   _ ____  _    _ _   _
/ \\  / \\_/  /  _ \\ / \\  / \\_/ \\
\\_/  \\_/ \\_/\\_/ \\_/ \\_/  \\_/ \\_/
"
echo "Running Git Commands..."


if [ -z "$1" ]; then
  echo "Error: Please provide a commit message"
  exit 1
fi

commit="$1"

git add .


if [ $? -ne 0 ]; then
  echo "Error: Failed to add files to the staging area."
  exit 1
fi

sleep 2

git status

message="$1"  

git commit -m "$message"

if [ $? -ne 0 ]; then
  echo "Error: Failed to commit changes."
  exit 1
fi

branch_name="main"

git push origin "$branch_name"

if [ $? -ne 0 ]; then
  echo "Error: Failed to push changes to the remote repository."
  exit 1
fi

echo "Git commands executed successfully."