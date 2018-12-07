#!/usr/bin/env php
<?php

class MyDB extends SQLite3
{
    function __construct()
    {
        $this->open("./cache.db");
    }
}

function sortFunc($item1, $item2)
{
    if ($item1['num'] == $item2['num']) return 0;
    return ($item1['num'] < $item2['num']) ? 1 : -1;
}

// function reorganize_keywords(& $keywords, $newarray) {
// 	$id = array_shift($newarray);
// 	$tmp = $keywords[$id];
// 	if (!isset($tmp)) {
// 		foreach ($newarray as $kw) {
// 			if (!in_array($kw, $keywords[$id])) {
// 				array_push($keywords[$id], $kw);
// 			}
// 		}
// 	} else {
// 		// next level iteration
// 		if (is_array($tmp)) {	
// 			$id2 = array_shift($tmp);
// 			reorganize_keywords($keywords[$id], $id2);
// 		}
// 	}
// }


$db = new MyDB();

$result = $db->query('SELECT `json` FROM `documents`');

$authors = array();
$keywords = array();

while ($doc = $result->fetchArray(SQLITE3_ASSOC)['json']) {

	// var_dump($doc);

	// skip empty
	if ($doc === "{}") {continue;}

	$jsondoc = json_decode($doc);

	// find the inspirational authors
	// --------------------------------

	if ($jsondoc->authors) {

		foreach ($jsondoc->authors as $author) {

			$author = ucwords(strtolower(trim($author)));

			if (strtolower($author) == 'simo hosio' && $jsondoc->priority > 0) {
				echo $author . ' ' . $jsondoc->priority . "\n";
			}

			if (isset($authors[$author][$jsondoc->priority])) {
				$authors[$author][$jsondoc->priority] = $authors[$author][$jsondoc->priority] + 1;
			} else {
				$authors[$author][$jsondoc->priority] = 1;
			}
		}

	}

	// process the keywords
	// --------------------------------
	if ($jsondoc->keywords && $jsondoc->priority > 0) {
		$keyword_array = explode(" > ", $jsondoc->keywords);
		// re-organise
		// reorganize_keywords($keywords, $keyword_array);
		foreach ($keyword_array as $level => $kw) {
			if (!isset($keywords[$level][$kw])) {
				$keywords[$level][$kw] = 1;
			} else {
				$keywords[$level][$kw] = $keywords[$level][$kw] + 1;
			}
		}
	}

}

// var_dump($keywords[0]);

// ksort($authors);
// asort($authors);
// array_multisort($authors, SORT_DESC, $authors);

// DEV
// for ($i = 0; $i < 60; $i++) {
// 	$author = array_keys($authors)[$i];
// 	echo $author;
// 	echo " ";
// 	var_dump($authors[$author]);
// 	echo "\n";
// }

// var_dump($authors['Juho Hamari']);

$priorities = [
	// 0 => [],
	1 => [],
	2 => [],
	3 => [],
];

foreach ($authors as $name => $arr) {
	for ($i = 1; $i < 4; $i++) {
		if (isset($arr[$i])) {
			// $priorities[$i][$name] = $arr[$i];
			array_push($priorities[$i], [
				'name' => $name,
				'num' => $arr[$i],
			]);
		}
	}
}

usort($priorities[1], 'sortFunc');
usort($priorities[2], 'sortFunc');
usort($priorities[3], 'sortFunc');

$kws = array();
foreach ($keywords[0] as $key => $val) {
	$tmp = array('name' => $key, 'num' => $val);
	// if (!in_array($tmp, $kws)) {
		array_push($kws, $tmp);
	// }
}
usort($kws, 'sortFunc');

// var_dump($kws);

// save influencers to json file
$fp = fopen('influencer.json', 'w');
fwrite($fp, json_encode($priorities));
fclose($fp);

// save keywords to file
$fp = fopen('keywords.json', 'w');
fwrite($fp, json_encode($kws));
fclose($fp);
