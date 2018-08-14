#!/usr/bin/env python3

import json
import os
import requests
import time
import sqlite3
import hashlib
from fnmatch import fnmatch

# BUF_SIZE is totally arbitrary, change for your app!
BUF_SIZE = 65536  # lets read stuff in 64kb chunks!


# caching
conn = sqlite3.connect('cache.db')
c = conn.cursor()


# -----------------
# first-time setup
c.execute('''CREATE TABLE documents (hash text PRIMARY KEY, parse_date integer, json text)''')
conn.commit()
# -----------------

conn.close()
