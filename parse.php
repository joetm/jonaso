<?php

// requires DOM extension: sudo apt-get install php-dom

$file = './publications.html';


// https://stackoverflow.com/a/2087136/426266
function DOMinnerHTML(DOMNode $element)
{
    $innerHTML = "";
    $children  = $element->childNodes;
    foreach ($children as $child)
    {
        $innerHTML .= $element->ownerDocument->saveHTML($child);
    }
    return trim($innerHTML);
}


$html = file_get_contents($file);

$classname = "bibtexitem";

$doc = new DOMDocument();
$doc->loadHTML($html);

$finder = new DomXPath($doc);

$rows = $finder->query("//*[contains(@class, '$classname')]");
// $rows = $doc->getElementsByTagName('td');

$references = [];

foreach ($rows as $bibitem) {
        // var_dump(DOMinnerHTML($bibitem));
        $references[] = DOMinnerHTML($bibitem);
}

$fp = fopen('references.json', 'w');
fwrite($fp, json_encode($references, JSON_PRETTY_PRINT));
fclose($fp);

