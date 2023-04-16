#!/bin/bash

FILE_LIST="annotations-todo.txt"
PDF_READER="evince"
# PDF_READER="wine $HOME/.wine/drive_c/Program Files/Tracker Software/PDF Viewer/PDFXCview.exe"
# PDF_READER=("wine" "$HOME/.wine/drive_c/Program Files/Tracker Software/PDF Viewer/PDFXCview.exe")

while read -r filepath; do
  echo "Opening: $filepath"
  $PDF_READER "$filepath"
  # "${PDF_READER[@]}" "$filepath"
  # wine "$HOME/.wine/drive_c/Program Files/Tracker Software/PDF Viewer/PDFXCview.exe" "$filepath" &

  # Waits for the PDF reader to close before proceeding to the next file
  while pgrep -x "$PDF_READER" > /dev/null; do
    sleep 1
  done
done < "$FILE_LIST"

