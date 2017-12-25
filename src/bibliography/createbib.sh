#!/bin/bash

_dir="$(pwd)/src/bibliography"

# create bibliography html
bibtex2html -noheader -nofooter "$_dir/publications.bib"

# convert html to json
php "$_dir/parse.php"

# copy json file to public folder
cp "$_dir/references.json" "$_dir/../../public/static/"

# copy bib.html file to public folder
cp "$_dir/publications_bib.html" "$_dir/../../public/static/"

# copy bib file to public folder
cp "$_dir/publications.bib" "$_dir/../../public/static/"
