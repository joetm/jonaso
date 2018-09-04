#!/usr/bin/env bash

START_TIME=$SECONDS

# ./start-docker.sh &

./parsefiles.py

docker-stop-all

./update.sh

ELAPSED_TIME=$(($SECONDS - $START_TIME))

echo "Finished in $(($ELAPSED_TIME/60)) min $(($ELAPSED_TIME%60)) sec"

