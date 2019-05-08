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


// load the details json
$string = file_get_contents("./public/static/references-detail.json");
$json = json_decode($string, true);
// var_dump($json);

$references = [];

foreach ($rows as $bibitem) {
        $id = $bibitem->parentNode->getElementsByTagName('a')[0]->attributes[0]->nodeValue;
        // echo $id . "\r\n";

        $type = false;
        // use the $id to look up the type
        foreach ($json as $ref) {
            if ($ref["ID"] === $id) {
                $type = $ref["howpublished"];
                break;
            }
        }

        // add the item to the respective array key
        if (isset($references[$type])) {
            $references[$type][] = DOMinnerHTML($bibitem);
        } else {
            $references[$type] = array(DOMinnerHTML($bibitem));
        }
}

$fp = fopen('references-details.json', 'w');
fwrite($fp, json_encode($references, JSON_PRETTY_PRINT));
fclose($fp);

