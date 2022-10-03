#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# vim: tabstop=8 expandtab shiftwidth=4 softtabstop=4

import json
import os
import requests
import time
import sqlite3
import hashlib
from fnmatch import fnmatch


# caching
conn = sqlite3.connect('cache.db')
c = conn.cursor()


# -----------------
# first-time setup
c.execute('''CREATE TABLE documents (hash text PRIMARY KEY, parse_date integer, json text, filepath text)''')
conn.commit()
# -----------------

conn.close()
