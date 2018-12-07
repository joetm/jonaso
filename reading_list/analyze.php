#!/usr/bin/env php
<?php

class MyDB extends SQLite3
{
    function __construct()
    {
        $this->open("./cache.db");
    }
}

$db = new MyDB();

$result = $db->query('SELECT `json` FROM `documents`');

$authors = array();

while ($doc = $result->fetchArray(SQLITE3_ASSOC)['json']) {

	// var_dump($doc);

	// skip empty
	if ($doc === "{}") {continue;}

	$jsondoc = json_decode($doc);

	// find the inspirational authors

	if ($jsondoc->authors) {

		foreach ($jsondoc->authors as $author) {

			$author = ucwords(strtolower(trim($author)));

			if (isset($authors[$author][$jsondoc->priority])) {
				$authors[$author][$jsondoc->priority] = $authors[$author][$jsondoc->priority] + 1;
			} else {
				$authors[$author] = [ $jsondoc->priority => 1 ];
			}
		}

	}
}

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

function sortFunc($item1, $item2)
{
    if ($item1['num'] == $item2['num']) return 0;
    return ($item1['num'] < $item2['num']) ? 1 : -1;
}
usort($priorities[1], 'sortFunc');
usort($priorities[2], 'sortFunc');
usort($priorities[3], 'sortFunc');


// sort
//for ($i = 1; $i < 4; $i++) {
//	arsort($priorities[$i]);
//}

// var_dump($priorities);

// save to json file
$fp = fopen('influencer.json', 'w');
fwrite($fp, json_encode($priorities));
fclose($fp);
