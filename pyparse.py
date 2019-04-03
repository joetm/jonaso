#!/usr/bin/python2

# https://bibtexparser.readthedocs.io/en/master/install.html

import json
import bibtexparser

with open('src/bibliography/publications.bib') as bibtex_file:
    bib_database = bibtexparser.load(bibtex_file)

# print(bib_database.entries)

# write as json
with open('./references.json', 'w') as outfile:  
    json.dump(bib_database.entries, outfile, indent=4, sort_keys=True)
