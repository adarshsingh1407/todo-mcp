#!/bin/bash

echo "🔍 Watching todo-ui for changes..."
echo "Press Ctrl+C to stop watching"

# Function to rebuild todo-ui
rebuild_todo_ui() {
    echo "🔄 Changes detected! Rebuilding todo-ui..."
    docker compose build todo-ui
    docker compose up -d todo-ui
    echo "✅ Rebuild complete!"
}

# Watch for changes in todo-ui directory
while inotifywait -r -e modify,create,delete ./todo-ui; do
    rebuild_todo_ui
done 