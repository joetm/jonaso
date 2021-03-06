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
	make replace-cv
	make bib-json
	make build-cv

bib-json:
	pandoc-citeproc --bib2json ./src/bibliography/publications.bib > ./public/static/publications.json

post-build:
	cp ./src/travel.json ./public/
	cp ./src/news.json ./public/
	make move-cv

fetch-cv:
	git clone --depth=1 git@github.com:joetm/academic-cv.git

	# get an up-to-date graph of the publications from the homepage to use in the latex CV
	./acquire-graph.js
	mv ./graph.png ./academic-cv/

replace-cv:
	# modify publication-list.tex to use the downloaded graph
	cd academic-cv; \
		sed 's|figures/publications.png|graph.png|g' publication-list.tex > publications.tex

	# set the options in the CV
	cd academic-cv; \
		sed 's|\\excludefromprint{.*}||g' cv.tex | sponge cv.tex; \
		sed 's|\\definenewtoggle{showdatedetails}{true}|\\definenewtoggle{showdatedetails}{false}|g' cv.tex | sponge cv.tex; \
		sed 's|\\definenewtoggle{showbirthdate}{true}|\\definenewtoggle{showbirthdate}{false}|g' cv.tex | sponge cv.tex; \
		sed 's|\\definenewtoggle{shownationality}{true}|\\definenewtoggle{shownationality}{false}|g' cv.tex | sponge cv.tex; \
		sed 's|\\definenewtoggle{showthumbnails}{true}|\\definenewtoggle{showthumbnails}{false}|g' cv.tex | sponge cv.tex; \
		sed 's|\\definenewtoggle{showtechnicalskills}{true}|\\definenewtoggle{showtechnicalskills}{false}|g' cv.tex | sponge cv.tex; \
		sed 's|\\definenewtoggle{showgender}{true}|\\definenewtoggle{showgender}{false}|g' cv.tex | sponge cv.tex; \
		sed 's|\\definenewtoggle{showgithub}{false}|\\definenewtoggle{showgithub}{true}|g' cv.tex | sponge cv.tex; \
		sed 's|\\definenewtoggle{showobjective}{true}|\\definenewtoggle{showobjective}{false}|g' cv.tex | sponge cv.tex; \
		sed 's|\\definenewtoggle{showabitur}{true}|\\definenewtoggle{showabitur}{false}|g' cv.tex | sponge cv.tex; \
		sed 's|\\definenewtoggle{showdoctoralstudiesasexperience}{false}|\\definenewtoggle{showdoctoralstudiesasexperience}{true}|g' cv.tex | sponge cv.tex; \
		sed 's|\\definenewtoggle{showteaching}{false}|\\definenewtoggle{showteaching}{true}|g' cv.tex | sponge cv.tex; \
		sed 's|\\definenewtoggle{showteachingdetails}{true}|\\definenewtoggle{showteachingdetails}{false}|g' cv.tex | sponge cv.tex; \
		sed 's|\\definenewtoggle{showsupervisions}{false}|\\definenewtoggle{showsupervisions}{true}|g' cv.tex | sponge cv.tex; \
		sed 's|\\definenewtoggle{showacademicservice}{false}|\\definenewtoggle{showacademicservice}{true}|g' cv.tex | sponge cv.tex; \
		sed 's|\\definenewtoggle{showpeerreview}{false}|\\definenewtoggle{showpeerreview}{true}|g' cv.tex | sponge cv.tex; \
		sed 's|\\definenewtoggle{showcertifications}{false}|\\definenewtoggle{showcertifications}{true}|g' cv.tex | sponge cv.tex; \
		sed 's|\\definenewtoggle{showlanguages}{false}|\\definenewtoggle{showlanguages}{true}|g' cv.tex | sponge cv.tex; \
		sed 's|\\definenewtoggle{showmemberships}{false}|\\definenewtoggle{showmemberships}{true}|g' cv.tex | sponge cv.tex; \
		sed 's|\\definenewtoggle{showthesestitles}{false}|\\definenewtoggle{showthesestitles}{true}|g' cv.tex | sponge cv.tex; \
		sed 's|\\definenewtoggle{showgrantwriting}{true}|\\definenewtoggle{showgrantwriting}{false}|g' cv.tex | sponge cv.tex; \
		sed 's|\\definenewtoggle{shownetwork}{true}|\\definenewtoggle{shownetwork}{false}|g' cv.tex | sponge cv.tex; \
		sed 's|\\definenewtoggle{showsupervisors}{false}|\\definenewtoggle{showsupervisors}{true}|g' cv.tex | sponge cv.tex; \
		sed 's|\\definenewtoggle{showsummary}{true}|\\definenewtoggle{showsummary}{false}|g' cv.tex | sponge cv.tex; \
		sed 's|\\definenewtoggle{showpositiondetails}{true}|\\definenewtoggle{showpositiondetails}{false}|g' cv.tex | sponge cv.tex; \
		sed 's|\\definenewtoggle{showinterests}{true}|\\definenewtoggle{showinterests}{false}|g' cv.tex | sponge cv.tex; \
		sed 's|\\definenewtoggle{shownationality}{true}|\\definenewtoggle{shownationality}{false}|g' cv.tex | sponge cv.tex; \
		sed 's|\\definenewtoggle{showpublications}{false}|\\definenewtoggle{showpublications}{true}|g' cv.tex | sponge cv.tex; \
		sed 's|\\definenewtoggle{showselectedpublications}{true}|\\definenewtoggle{showselectedpublications}{false}|g' cv.tex | sponge cv.tex; \
		sed 's|\\definenewtoggle{showfunding}{false}|\\definenewtoggle{showfunding}{true}|g' cv.tex | sponge cv.tex; \
		sed 's|\\definenewtoggle{showgranttitles}{true}|\\definenewtoggle{showgranttitles}{false}|g' cv.tex | sponge cv.tex; \
		sed 's|\\definenewtoggle{showreferences}{true}|\\definenewtoggle{showreferences}{false}|g' cv.tex | sponge cv.tex; \
		sed 's|\\definenewtoggle{showlinks}{false}|\\definenewtoggle{showlinks}{true}|g' cv.tex | sponge cv.tex; \
		sed 's|\\definenewtoggle{showtotalfunding}{true}|\\definenewtoggle{showtotalfunding}{false}|g' cv.tex | sponge cv.tex; \
		sed 's|\\definenewtoggle{showoutreach}{true}|\\definenewtoggle{showoutreach}{false}|g' cv.tex | sponge cv.tex; \
		sed 's|\\definenewtoggle{showpublicationsummary}{false}|\\definenewtoggle{showpublicationsummary}{true}|g' cv.tex | sponge cv.tex; \
		sed 's|\\definenewtoggle{showpresentations}{true}|\\definenewtoggle{showpresentations}{false}|g' cv.tex | sponge cv.tex; \
		sed 's|\\definenewtoggle{showsoftware}{true}|\\definenewtoggle{showsoftware}{false}|g' cv.tex | sponge cv.tex; \
		sed 's|\\definenewtoggle{showmoney}{true}|\\definenewtoggle{showmoney}{false}|g' cv.tex | sponge cv.tex

	# set the options in the publications list
	cd academic-cv; \
		sed 's|\\excludefromprint{.*}||g' publication-list.tex | sponge publication-list.tex; \
		sed 's|\\definenewtoggle{showpublicationsummary}{false}|\\definenewtoggle{showpublicationsummary}{true}|g' publication-list.tex | sponge publication-list.tex
		sed 's|\\definenewtoggle{showmanuscripts}{true}|\\definenewtoggle{showmanuscripts}{false}|g' publication-list.tex | sponge publication-list.tex


build-cv:
	# build the publication list
	cd academic-cv; \
		pdflatex -halt-on-error -synctex=1 -interaction=batchmode publications.tex; \
		pdflatex -halt-on-error -synctex=1 -interaction=batchmode publications.tex

	# build the CV
	cd academic-cv; \
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
