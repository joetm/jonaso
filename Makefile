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
	yarn build

dev:
	yarn dev

refs:
	# _dir="$(pwd)/src/bibliography"
	# create bibliography html
	bibtex2html -noheader -nofooter --style "SIGCHI-Reference-Format" "src/bibliography/publications.bib"
	# convert html to json
	php ./parse.php
	# move json file to public folder
	mv "./references.json" ./public/static/
	# move bib.html file to public folder
	mv "./publications_bib.html" ./public/static/
	# copy bib file to public folder
	cp "src/bibliography//publications.bib" ./public/static/
	rm publications.html

push:
	# push to github
	git add -A
	git commit
	git push
