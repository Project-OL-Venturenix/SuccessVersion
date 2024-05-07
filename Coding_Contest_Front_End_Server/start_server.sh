#!/bin/bash

PORT=8083

# Find the process ID (PID) of the process using the port
PID=$(sudo lsof -t -i:$PORT)

# If a process is using the port, kill it
if [ -n "$PID" ]; then
  echo "Killing process $PID using port $PORT"
  sudo kill -9 $PID
fi

# Start your server
echo "Starting server..."
npm start frontend_server

# chmod +x start_server.sh