#!/usr/bin/env bash

# remove prompt parts from filename
find ./midjourney -type f -name '*.png' -execdir rename 's/([a-z0-9\-]+)_(.+)\.png/$1x.png/g' '{}' \;

