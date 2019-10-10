.PHONY: tests dist public

default:
	##
	##  Makefile for jonaso.de
	##
	##   make build			produce the production version of the site
	##   make dev			run the development version of the site
	##   make refs			build the publication list from .bib file
	##   make tests			run tests (TODO)
	##   make push   		push to github
	##

build:
	cp ./src/travel.json ./public/
	cp ./src/news.json ./public/

refs:
	# _dir="$(pwd)/src/bibliography"
	# create bibliography html
	# --style "SIGCHI-Reference-Format"
	# -- style "ACM-Reference-Format"
	bibtex2html -noheader -nofooter --style "SIGCHI-Reference-Format-MOD" "src/bibliography/publications.bib"
	# convert html to json
	php ./parse.php
	# move json file to public folder
	mv "./references.json" ./public/static/
	# move bib.html file to public folder
	# mv "./publications_bib.html" ./public/static/
	# copy bib file to public folder
	cp "src/bibliography//publications.bib" ./public/static/


	# create detailed references json
	python3 ./pyparse.py
	mv ./references-detail.json ./public/static/

	php ./parsePerType.php

	mv ./references-type.json ./public/static/
	rm publications.html

push:
	# push to github
	git add -A
	git commit
	git push
