#!/usr/bin/env python3
"""Give unchanged build output its previous mtime so `aws s3 sync` skips it.

The astro build empties ./public and rewrites every file (pages, ./static
copies such as /portfolio, post-build JSON), so every file gets a fresh mtime.
`aws s3 sync` uploads any file whose local mtime is newer than the S3 object,
which means the whole site was re-uploaded on every build.

This keeps a manifest (path -> size, md5, mtime) of the last build. Files whose
content is identical get their old mtime back; changed or new files keep their
fresh mtime and are recorded. Artworks are skipped: they are synced straight
from ./static/artworks (see `make publish`).
"""
import hashlib
import json
import os

ROOT = 'public'
MANIFEST = '.deploy-mtimes.json'
SKIP = os.path.join(ROOT, 'artworks') + os.sep


def md5(path):
    h = hashlib.md5()
    with open(path, 'rb') as f:
        for chunk in iter(lambda: f.read(1 << 20), b''):
            h.update(chunk)
    return h.hexdigest()


try:
    with open(MANIFEST) as f:
        old = json.load(f)
except (FileNotFoundError, json.JSONDecodeError):
    old = {}

new = {}
restored = 0
for dirpath, _, files in os.walk(ROOT):
    if (dirpath + os.sep).startswith(SKIP):
        continue
    for name in files:
        path = os.path.join(dirpath, name)
        st = os.stat(path)
        digest = md5(path)
        prev = old.get(path)
        if prev and prev['size'] == st.st_size and prev['md5'] == digest:
            if st.st_mtime_ns != prev['mtime_ns']:
                os.utime(path, ns=(st.st_atime_ns, prev['mtime_ns']))
                restored += 1
            new[path] = prev
        else:
            new[path] = {'size': st.st_size, 'md5': digest, 'mtime_ns': st.st_mtime_ns}

with open(MANIFEST, 'w') as f:
    json.dump(new, f, separators=(',', ':'))

changed = sum(1 for p in new if new[p] is not old.get(p))
print(f'restore-mtimes: {restored} unchanged files restored, {changed} new/changed')
