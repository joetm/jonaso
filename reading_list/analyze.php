#!/usr/bin/env php
<?php


/**
 * show a status bar in the console
 * 
 * <code>
 * for($x=1;$x<=100;$x++){
 * 
 *     show_status($x, 100);
 * 
 *     usleep(100000);
 *                           
 * }
 * </code>
 *
 * @param   int     $done   how many items are completed
 * @param   int     $total  how many items are to be done total
 * @param   int     $size   optional size of the status bar
 * @return  void
 *
 */

// https://stackoverflow.com/a/9853018/426266
function show_status($done, $total, $size=30) {

    static $start_time;

    // if we go over our bound, just ignore it
    if($done > $total) return;

    if(empty($start_time)) $start_time=time();
    $now = time();

    $perc=(double)($done/$total);

    $bar=floor($perc*$size);

    $status_bar="\r[";
    $status_bar.=str_repeat("=", $bar);
    if($bar<$size){
        $status_bar.=">";
        $status_bar.=str_repeat(" ", $size-$bar);
    } else {
        $status_bar.="=";
    }

    $disp=number_format($perc*100, 0);

    $status_bar.="] $disp%  $done/$total";

    $rate = ($now-$start_time)/$done;
    $left = $total - $done;
    $eta = round($rate * $left, 2);

    $elapsed = $now - $start_time;

    $status_bar.= " remaining: ".number_format($eta)." sec.  elapsed: ".number_format($elapsed)." sec.";

    echo "$status_bar  ";

    flush();

    // when done, send a newline
    if($done == $total) {
        echo "\n";
    }
}


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

$authors = array();
$keywords = array();
$details = array();
$keywordauthors = array();


// for progress bar
$result = $db->query('SELECT count(json) AS `cnt` FROM `documents`');
$total = $result->fetchArray(SQLITE3_ASSOC)['cnt'];
echo $total . " documents\n";
$done = 0;

$result = $db->query('SELECT `json` FROM `documents`');


$i = 0;
while ($doc = $result->fetchArray(SQLITE3_ASSOC)['json']) {

	$i++;

	// skip empty
	if ($doc === "{}") {
		$done++;
		show_status($done, $total, $size=20);
		continue;
	}

	$jsondoc = json_decode($doc);

	$authorkeywords = explode(" > ", $jsondoc->keywords);
	$authorkeywords = array_filter($authorkeywords, function ($kw) {return strlen(trim($kw)) > 0;});

	// find the inspirational authors
	// --------------------------------

	if ($jsondoc->authors) {

		foreach ($jsondoc->authors as $author) {

			// var_dump($jsondoc)
			// object(stdClass)#2 (6) {
			//   ["keywords"]=>
			//   string(29) "Mobile Phones > Advertisement"
			//   ["priority"]=>
			//   int(0)
			//   ["title"]=>
			//   string(86) "Exploring Mobile Ad Formats to Increase Brand Recollection and Enhance User Experience"
			//   ["year"]=>
			//   int(2017)
			//   ["authors"]=>
			//   array(3) {
			//     [0]=>
			//     string(10) "Aku Visuri"
			//     [1]=>
			//     string(10) "Simo Hosio"
			//     [2]=>
			//     string(15) "Denzil Ferreira"
			//   }
			//   ["modified"]=>
			//   int(1543650036)
			// }

			$author = trim($author);

			// reduce to "firstname lastname"
			$parseauthor = shell_exec('./parsename.py "' . addslashes($author) . '"');
			if ($parseauthor) {
				// echo "Parseauthor: " . $parseauthor . "\n";
				$author = $parseauthor;
			}

			// FIRST LAST -> First Last
			$author = trim(ucwords(strtolower($author)), "\n");

			$authorid = md5($author);

			// increase publication counter for this author
			if (isset($authors[$author][$jsondoc->priority])) {
				$authors[$author][$jsondoc->priority] = $authors[$author][$jsondoc->priority] + 1;
			} else {
				$authors[$author][$jsondoc->priority] = 1;
			}

			// store the title in the respective author details
			// var_dump($author, $jsondoc->title);
			$thedoc = array(
						"title" => $jsondoc->title,
						"priority" => $jsondoc->priority,
						);
			//first publication for this author
			if (!isset($details[$author])) {
				$details[$author] = [
					'docs' => array($thedoc),
					'keywords' => $authorkeywords,
				];
			} else {
				$details[$author]['docs'][] = $thedoc;
				//author keywords
				foreach ($authorkeywords as $kw) {
					if (!in_array($kw, $details[$author]['keywords'])) {
						$details[$author]['keywords'][] = $kw;
					}

					// new (1/2): for each keyword, store the author
					if (!isset($keywordauthors[$kw])) {
						$keywordauthors[$kw] = [ $authorid ];
					} else {
						if (!isset($keywordauthors[$kw][$authorid])) {
							$keywordauthors[$kw][] = $authorid;
						}
					}

				}
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

	$done++;
	show_status($done, $total, $size=20);

	// // DEV
	// if ($i > 10) {
	// 	break;
	// }

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
				'id' => md5($name),
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

// write out the author details
// chdir('./influencers/');
foreach ($details as $author => $array_of_titles) {
	$fp = fopen('./influencers/' . md5($author) . '.json', 'w');
	fwrite($fp, json_encode($array_of_titles));
	fclose($fp);
}


// new (2/2): for each keyword, store the author
foreach ($keywordauthors as $keyword => $arr) {
	$fp = fopen('./keywordauthors/' . md5($keyword) . '.json', 'w');
	fwrite($fp, json_encode($arr));
	fclose($fp);
}

