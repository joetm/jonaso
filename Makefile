ifndef VERBOSE
.SILENT:
endif

.PHONY: tests dist public build deploy

default:
	##
	##  Makefile for jonaso.de
	##
	##   make build			pre-build + astro build + post-build (no upload)
	##   make deploy		build, upload to s3 (make publish), commit + push to github (make push)
	##   make pre-build		fetch cv + stats, generate data into ./static
	##   make post-build	cv pdfs into ./public, restore mtimes for s3
	##   make publications-data	regenerate the publication data from the .bib
	##   make publish  		upload ./public to s3
	##   make push   		commit + push to github
	##

build:
	$(MAKE) pre-build
	npx astro build
	$(MAKE) post-build

deploy: build publish push

docentship:
	# missing fields! 	bib2xml ./src/bibliography/publications.bib > ./scripts/stat_aggregator/docentship.xml
	cd scripts/stat_aggregator; \
		./docentship-bibtojson.py

publications-data:
	# publication data for the site, written to ./static/static (copied to
	# ./public/static by the astro build), so pages render from the current .bib
	mkdir -p static/static
	pandoc-citeproc --bib2json ./src/bibliography/publications.bib > ./src/bibliography/publications.json
	python3 scripts/pre-build/fix-publications-json.py
	mv ./src/bibliography/publications.json ./static/static/
	cp ./src/bibliography/publications.bib ./static/static/
	# html bibliography (publications.html, publications_bib.html) -> json
	BSTINPUTS=scripts/pre-build: bibtex2html -q -noheader -nofooter -nf website "website" --style "SIGCHI-Reference-Format-MOD" "src/bibliography/publications.bib"
	php scripts/pre-build/parse.php
	mv ./references.json ./static/static/
	python3 scripts/pre-build/pyparse.py
	php scripts/pre-build/parsePerType.php
	rm publications.html
	mv ./publications_bib.html ./static/static/
	make docentship

pre-build:
	# academic-cv folder exists?
	# [ -d "academic-cv" ] && rm -rf academic-cv
	make fetch-cv
	make fetch-pcs
	make replace-cv

	make publications-data

	make build-cv

	cd scripts/stat_aggregator; \
		PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome ./scholar-stats.py

	cd scripts/stat_aggregator; \
		PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome ./scholar-citations.py

	# before the astro build, so the build picks up fresh manifests from ./static
	make process-artworks


fetch-pcs:
	# PCS fetching
	cd scripts/stat_aggregator; \
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
	# the astro build empties ./public, so recreate the dir this target writes into
	mkdir -p public/cv
	# move cv
	mv academic-cv/cv.pdf "public/cv/oppenlaender-cv.pdf"
	mv academic-cv/resume.pdf "public/cv/resume.pdf"
	mv academic-cv/publications.pdf "public/cv/oppenlaender-publications.pdf"
	# TODO # mv academic-cv/out.pdf "public/cv/cv-jonas-oppenlaender-`date '+%Y.%m.%d'`.pdf"
	rm -rf academic-cv

	# give unchanged output its previous mtime so `aws s3 sync` skips it
	python3 scripts/post-build/restore-mtimes.py

	# make copy-portfolio

process-artworks:
	python3 scripts/pre-build/processImages.py
	if [ -d "./artworks-json" ];then \
		rm -rf ./artworks-json; \
	fi


fetch-cv:
	if [ -d "./academic-cv" ];then \
		rm -rf ./academic-cv; \
	fi

	git clone --depth=1 git@github.com:joetm/academic-cv.git

	# get an up-to-date graph of the publications from the homepage to use in the latex CV
	PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome ./scripts/pre-build/acquire-graph.js

	# TODO: the above currently fails (after Ubuntu upgrade)
	if [ -f 'graph.png' ];then \
		mv ./graph.png ./academic-cv/; \
	else \
	    cp ./scripts/pre-build/graph-BAK.png ./academic-cv/graph.png; \
	fi

replace-cv:
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
		sed 's|\\definenewtoggle{showpublicationsummary}{false}|\\definenewtoggle{showpublicationsummary}{true}|g' publication-list.tex | sponge publication-list.tex; \
		sed 's|\\definenewtoggle{showmanuscripts}{true}|\\definenewtoggle{showmanuscripts}{false}|g' publication-list.tex | sponge publication-list.tex

	# publications.tex is what build-cv compiles: derive it from publication-list.tex
	# only after the options above are set, and point it at the downloaded graph
	cd academic-cv; \
		sed 's|figures/publications.png|graph.png|g' publication-list.tex > publications.tex

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
	# the astro build re-copies ./static into ./public with fresh mtimes, so the
	# artworks are excluded here and synced from ./static, where processImages.py
	# leaves existing files untouched and aws can skip them
	aws s3 sync --delete --exclude "artworks/*" ./public/ s3://jonaso.de
	aws s3 sync --delete ./static/artworks/ s3://jonaso.de/artworks/

