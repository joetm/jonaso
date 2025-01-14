ifndef VERBOSE
.SILENT:
endif

.PHONY: tests dist public

default:
	##
	##  Makefile for jonaso.de
	##
	##   make pre-build		pre-build actions
	##   make post-build	post build actions
	##   make fetch-cv		get the latex cv from overleaf/github and build it
	##   make dev			run the development version of the site
	##   make refs			build the publication list from .bib file
	##   make cv			build the cv pdf
	##   make tests			run tests (TODO)
	##   make push   		push to github
	##   make publish  		push to s3
	##

build:
	yarn build

docentship:
	# missing fields! 	bib2xml ./src/bibliography/publications.bib > ./stat_aggregator/docentship.xml
	cd stat_aggregator; \
		./docentship-bibtojson.py

	mv ./stat_aggregator/docentship.json ./public/static/

pre-build:
	# academic-cv folder exists?
	# [ -d "academic-cv" ] && rm -rf academic-cv
	make fetch-cv
	make fetch-pcs
	make replace-cv

	# make bib-json
	pandoc-citeproc --bib2json ./src/bibliography/publications.bib > ./src/bibliography/publications.json
	python3 fix-publications-json.py

	make build-cv

	cd stat_aggregator; \
		./scholar-stats.py

	cd stat_aggregator; \
		./scholar-citations.py


fetch-pcs:
	# PCS fetching
	cd stat_aggregator; \
		python3 fetch_PCS.py # $? -eq 0 || echo "failed PCS lookup (no internet?)"

rename-artworks:
	cd artworks; \
		./rename-dalle.sh
		./rename-midjourney.sh
		./rename-stablediffusion.sh

# copy-portfolio:
# 	cp -Rf ../jonaso.de-portfolio ./public/portfolio
# 	rm -rf ./public/portfolio/node_modules
# 	rm -rf ./public/portfolio/.git
# 	rm -rf ./public/portfolio/.gitignore
# 	rm -rf ./public/portfolio/.babelrc
# 	rm -rf ./public/portfolio/package.json
# 	rm -rf ./public/portfolio/package-lock.json
# 	rm -rf ./public/portfolio/yarn.lock
# 	rm -rf ./public/portfolio/webpack.config.js

post-build:
	# move cv
	mv academic-cv/cv.pdf "public/cv/oppenlaender-cv.pdf"
	mv academic-cv/resume.pdf "public/cv/resume.pdf"
	mv academic-cv/publications.pdf "public/cv/oppenlaender-publications.pdf"
	# TODO # mv academic-cv/out.pdf "public/cv/cv-jonas-oppenlaender-`date '+%Y.%m.%d'`.pdf"
	rm -rf academic-cv

	# make refs
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
	cp "src/bibliography/publications.bib" ./public/static/
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

	make docentship

	# move other files
	cp ./src/travel.json ./public/
	cp ./src/projects.json ./public/static/
	cp ./src/news.json ./public/
	# cp -rf ./src/img/artworks ./public/static/
	mv ./src/bibliography/publications.json ./public/static/publications.json
	# copy fetched PCS data
	cp ./stat_aggregator/peer-reviews.json ./public/peer-reviews.json

	make process-artworks

	# make copy-portfolio

process-artworks:
	python3 processImages.py
	if [ -d "./artworks-json" ];then \
		rm -rf ./artworks-json; \
	fi


fetch-cv:
	if [ -d "./academic-cv" ];then \
		rm -rf ./academic-cv; \
	fi

	git clone --depth=1 git@github.com:joetm/academic-cv.git

	# get an up-to-date graph of the publications from the homepage to use in the latex CV
	./acquire-graph.js

	# TODO: the above currently fails (after Ubuntu upgrade)
	if [ -f 'graph.png' ];then \
		mv ./graph.png ./academic-cv/; \
	else \
	    cp ./graph-BAK.png ./academic-cv/; \
	fi

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
		sed 's|\\definenewtoggle{showgithub}{true}|\\definenewtoggle{showgithub}{false}|g' cv.tex | sponge cv.tex; \
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
		sed 's|\\definenewtoggle{showpresentations}{false}|\\definenewtoggle{showpresentations}{true}|g' cv.tex | sponge cv.tex; \
		sed 's|\\definenewtoggle{showsoftware}{false}|\\definenewtoggle{showsoftware}{true}|g' cv.tex | sponge cv.tex; \
		sed 's|\\definenewtoggle{showmoney}{true}|\\definenewtoggle{showmoney}{false}|g' cv.tex | sponge cv.tex

	# set the options in resume.tex
	cd academic-cv; \
		sed 's|\\excludefromprint{.*}||g' resume.tex | sponge resume.tex

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

	# build the resume
	cd academic-cv; \
		pdflatex -halt-on-error -synctex=1 -interaction=batchmode resume.tex; \
		pdflatex -halt-on-error -synctex=1 -interaction=batchmode resume.tex

push:
	# push to github
	git add -A
	git commit
	git push


invalidate:
	aws cloudfront create-invalidation --distribution-id E1F8XE39H6VFRU --paths "/*"


publish:
	# push to s3
	aws s3 sync --delete ./public/ s3://jonaso.de

