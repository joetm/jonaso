#!/usr/bin/env python3

import bibtexparser
import json

# Function to load and parse the BibTeX file
def bib_to_json(bib_filename, json_filename):
    with open(bib_filename, 'r') as bib_file:
        bib_database = bibtexparser.load(bib_file)
    # Convert to a list of entries (dictionaries)
    entries = bib_database.entries
    # Write the list of entries to a JSON file
    entries = [ entry for entry in entries if ('docentship' in entry) and (entry['docentship'] == '1') ]
    # print(entries)

    with open(json_filename, 'w') as json_file: json.dump(entries, json_file, indent=2)

    print(f'written {json_filename}')

bib_to_json('../src/bibliography/publications.bib', './docentship.json')

