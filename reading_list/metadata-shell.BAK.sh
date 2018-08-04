#!/usr/bin/env bash

# the folders to search for
BASEPATHS[0]="/home/jonas/OULU/Literatur/"
BASEPATHS[1]="/home/jonas/FU/IKON/Literatur"
BASEPATHS[2]="/home/jonas/FU/Misc/"

echo "Mining pdfs"

# echo "Mining pdfs in the following folders:"
# printf "  %s\n" "${BASEPATHS[@]}"

# reset reading list
truncate -s 0 readinglist.csv

# do stuff with each pdf file
handle_pdf () { 
   # echo "==="
   # echo $1

   # skip folders
   if [ -d "$1" ]
   then
      return 0
   fi

   # get filename
   # fname=`basename $1`
   # echo $1 | awk -F"/" '{print $NF}'
   fname=`echo "$1" | sed 's/.*\///'`
   # echo $fname

   # get directory name
   dir=`dirname "$1"`
   # echo $dir

   # skip '.' entries
   # if [ "$dir" = "." ]
   # then
   #    echo "dir is ."
   #    return 0
   # fi

   # author=`pdfinfo $1 | grep 'Author' | awk '{split($0,a,":"); print $2}'`
   authorline=`pdfinfo $1 | grep 'Author'`
   author=$( echo ${authorline##*:} | sed -e 's/\r//g')

   titleline=`pdfinfo $1 | grep 'Title'`
   # title=${titleline##*:}
   title=$( echo ${titleline##*:} | sed -e 's/\r//g')

   keywordsline=`pdfinfo $1 | grep 'Keywords'`
   # keywords=${keywordsline##*:}
   keywords=$( echo ${keywordsline##*:} | sed -e 's/\r//g')

   numPagesline=`pdfinfo $1 | grep 'Pages'`
   # numPages=${numPagesline##*:}
   numPages=$( echo ${numPagesline##*:} | sed -e 's/\r//g')

   # echo "$fname, $dir" >> readinglist.csv 
   echo "$fname|$title|$author|$keywords|$numPages|$dir|$1" >> readinglist.csv

   return 0
}
export -f handle_pdf


# write header row
# directory |
echo "filename | title | author | keywords | numPages | directory | path" >> readinglist.csv


for i in "${BASEPATHS[@]}"
do
   : 
   # go through the pdf files in this folder
   # -name "*.pdf"
   # echo "$i"
   find $i -regextype sed -regex ".*/+.*\.pdf$" -print0 | xargs -0 -n 1 -P 1 -I {} bash -c 'handle_pdf "$@"' _ {}
done

# csvtool setcolumns 7 tmp.csv > readinglist.csv
# rm tmp.csv

# ./bugfix.py

