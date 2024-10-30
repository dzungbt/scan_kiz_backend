#!/bin/bash

processes=(
  "scan_kiz_backend"
)

for process in "${processes[@]}"
do
  pid_file="/www/server/nodejs/vhost/pids/${process}.pid"
  script_file="/www/server/nodejs/vhost/scripts/${process}.sh"

  if [ -f "$pid_file" ]; then
    pid=$(cat "$pid_file")
    if ps -p $pid > /dev/null; then
      echo "Process $process is running with PID $pid"
      echo "Stopping process $process..."
      kill $pid
      if [ $? -eq 0 ]; then
        echo "Process $process has been stopped successfully"
      else
        echo "Failed to stop process $process"
      fi
    else
      echo "Process $process is not running"
    fi
  else
    echo "Process $process is not running"
  fi

  echo "Starting process $process..."
  bash "$script_file"
  if [ $? -eq 0 ]; then
    echo "Process $process has been started successfully"
  else
    echo "Failed to start process $process"
  fi

  echo "---"
done