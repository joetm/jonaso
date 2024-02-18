#!/usr/bin/bash

curl -X POST http://0.0.0.0:8080/query -H "Content-Type: application/json" -d '{"query": "What are the difficulties of moderating twitch communities?"}'
