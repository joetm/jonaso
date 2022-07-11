#!/usr/bin/python3

import os
from tqdm import tqdm

def touch(fname, times=None):
    with open(fname, 'a'):
        os.utime(fname, times)

# Using readlines()
lines = []
with open('simulacra_rating.txt', 'r') as f:
	lines = f.readlines()

for line in tqdm(lines):
	score, imgpath = line.split(":")
	print(score)
	if os.path.exists(imgpath):
		touch(imgpath)

