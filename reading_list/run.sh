#!/usr/bin/env bash

START_TIME=$SECONDS

# ./start-docker.sh &

echo "Enter:"
echo "[0] for local (localhost)"
echo "[1] for remote (IP 192.168.0.53)"

read runlocal

if [ $runlocal -gt 0 ]
then
	echo Running remotely on 192.168.0.53.
	export IPADDRESS="192.168.0.53"
else
	echo Running locally on localhost.
	export IPADDRESS="localhost"
fi

./parsefiles.py

# ./parsetoread.py

docker-stop-all

./update.sh

ELAPSED_TIME=$(($SECONDS - $START_TIME))

echo "Finished in $(($ELAPSED_TIME/60)) min $(($ELAPSED_TIME%60)) sec"

./analyze

