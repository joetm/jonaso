#!/usr/bin/python2

# https://bibtexparser.readthedocs.io/en/master/install.html

import json
import bibtexparser
from bibtexparser.bparser import BibTexParser
from bibtexparser.bibdatabase import as_text

parser = BibTexParser()
parser.ignore_nonstandard_types = False
parser.homogenise_fields = True
parser.common_strings = False


with open('src/bibliography/publications.bib') as bibtex_file:
    bib_database = bibtexparser.load(bibtex_file, parser)

# print(bib_database.entries)
# print(bib_database.strings)

# print(as_text(bib_database.entries[0]['title']))

# bibtex_str = bibtexparser.dumps(bib_database)
# print(bibtex_str)

# write as json
with open('./references-detail.json', 'w') as outfile:
    json.dump(bib_database.entries, outfile, indent=4, sort_keys=True)
