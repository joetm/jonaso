.PHONY: tests dist public

default:
	##
	##  Makefile for jonaso.de
	##
	##   make pre-build		pre-build actions
	##   make post-build	post build actions
	##   make fetch-cv		get the latex cv from overleaf/github and build it
	##   make move-cv		move the finished cv and clean up directory
	##   make dev			run the development version of the site
	##   make refs			build the publication list from .bib file
	##   make pubs			alias of make refs
	##   make cv			build the cv pdf
	##   make tests			run tests (TODO)
	##   make push   		push to github
	##

pre-build:
	# 	cd ./stat_aggregator; \
	# 		./fetch_PCS.py
	# academic-cv folder exists?
	# [ -d "academic-cv" ] && rm -rf academic-cv
	make fetch-cv

post-build:
	cp ./src/travel.json ./public/
	cp ./src/news.json ./public/
	make move-cv

fetch-cv:
	git clone git@github.com:joetm/academic-cv.git

	# get an up-to-date graph of the publications from the homepage to use in the latex CV
	./acquire-graph.js
	mv ./graph.png ./academic-cv/

	# modify publication-list.tex to use this graph
	cd academic-cv; \
		sed 's|figures/publications.png|graph.png|g' publication-list.tex > publications.tex; \
		pdflatex -halt-on-error -synctex=1 -interaction=batchmode publications.tex; \
		pdflatex -halt-on-error -synctex=1 -interaction=batchmode publications.tex

	# set the options in the CV
	cd academic-cv; \
		sed 's|\\excludefromprint{.*}||g' cv.tex > out.tex; \
		sed 's|\\settoggle{showpositiondetails}{true}|\\settoggle{showpositiondetails}{false}|g' out.tex > out2.tex; \
		sed 's|\\settoggle{showsummary}{true}|\\settoggle{showsummary}{false}|g' out2.tex > out.tex; \
		sed 's|\\settoggle{shownationality}{true}|\\settoggle{shownationality}{false}|g' out.tex > out2.tex; \
		sed 's|\\settoggle{showinterests}{true}|\\settoggle{showinterests}{false}|g' out2.tex > out.tex; \
		sed 's|\\settoggle{showlinks}{false}|\\settoggle{showlinks}{true}|g' out.tex > out2.tex; \
		sed 's|\\settoggle{showpublications}{false}|\\settoggle{showpublications}{true}|g' out2.tex > out.tex; \
		sed 's|\\settoggle{showmoney}{true}|\\settoggle{showmoney}{false}|g' out.tex > cv.tex; \
		pdflatex -halt-on-error -synctex=1 -interaction=batchmode cv.tex; \
		pdflatex -halt-on-error -synctex=1 -interaction=batchmode cv.tex

move-cv:
	mv academic-cv/cv.pdf "public/cv/oppenlaender-cv.pdf"
	mv academic-cv/publications.pdf "public/cv/oppenlaender-publications.pdf"
	# TODO
	# mv academic-cv/out.pdf "public/cv/cv-jonas-oppenlaender-`date '+%Y.%m.%d'`.pdf"
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
