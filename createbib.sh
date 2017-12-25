#!/bin/bash

_dir="$(pwd)/src/bibliography"

# create bibliography html
bibtex2html -noheader -nofooter "$_dir/publications.bib"

# convert html to json
php ./parse.php

# move json file to public folder
mv "./references.json" ./public/static/

# move bib.html file to public folder
mv "./publications_bib.html" ./public/static/

# copy bib file to public folder
cp "$_dir/publications.bib" ./public/static/

rm publications.html
