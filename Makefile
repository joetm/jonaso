.PHONY: tests dist public

default:
	##
	##  Makefile for jonaso.de
	##
	##   make pre-build		pre-build actions
	##   make post-build	post build actions
	##   make dev			run the development version of the site
	##   make refs			build the publication list from .bib file
	##   make pubs			alias of make refs
	##   make cv			build the cv pdf
	##   make tests			run tests (TODO)
	##   make push   		push to github
	##

pre-build:
	make fetch-cv

post-build:
	cp ./src/travel.json ./public/
	cp ./src/news.json ./public/
	make move-cv

fetch-cv:
	git clone git@github.com:joetm/academic-cv.git
	cd academic-cv; \
		sed 's|\\excludefromprint{.*}||g' cv.tex > out.tex; \
		sed 's|\\settoggle{showpositiondetails}{true}|\\settoggle{showpositiondetails}{false}|g' out.tex > out2.tex; \
		sed 's|\\settoggle{showsummary}{true}|\\settoggle{showsummary}{false}|g' out2.tex > out3.tex; \
		sed 's|\\settoggle{showlinks}{false}|\\settoggle{showlinks}{true}|g' out3.tex > out4.tex; \
		pdflatex -synctex=1 -interaction=nonstopmode out4.tex; \
		pdflatex -synctex=1 -interaction=nonstopmode out4.tex

move-cv:
	mv academic-cv/out4.pdf "public/cv/cv-jonas-oppenlaender.pdf"
	# mv academic-cv/out.pdf "public/cv/cv-jonas-oppenlaender-`date '+%Y.%m.%d'`.pdf"
	# rm public/cv/cv-jonas-oppenlaender-*.pdf
	rm -rf academic-cv

pubs:
	make refs
	
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
	# copy bib file to public folder
	cp "src/bibliography//publications.bib" ./public/static/

	# create detailed references json
	python3 ./pyparse.py
	# move json file to public folder
	# mv ./references-detail.json ./public/static/

	php ./parsePerType.php
	# move json file to public folder
	# mv ./references-type.json ./public/static/
	rm publications.html

	# move bib.html file to public folder
	mv ./publications_bib.html ./public/static/

push:
	# push to github
	git add -A
	git commit
	git push
