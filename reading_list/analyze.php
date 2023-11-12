#!/usr/bin/env php
<?php

/**
 * show a status bar in the console
 * 
 * <code>
 * for($x=1;$x<=100;$x++){
 *     show_status($x, 100);
 *     usleep(100000);
 * }
 * </code>
 *
 * https://stackoverflow.com/a/9853018/426266
 *
 * @param   int     $done   how many items are completed
 * @param   int     $total  how many items are to be done total
 * @param   int     $size   optional size of the status bar
 * @return  void
 *
 */
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
    function __construct() {
        $this->open("./cache.db");
    }
}

function sortFunc($item1, $item2)
{
    if ($item1['num'] == $item2['num']) return 0;
    return ($item1['num'] < $item2['num']) ? 1 : -1;
}

$_norm_name_db = [];
function normalize_name($author) {
	global $_norm_name_db;
	// cache hit?
	if (isset($_norm_name_db[$author])) {
		return $_norm_name_db[$author];
	}
	$key = $author;
	// reduce to "firstname lastname"
	$parseauthor = shell_exec('./parsename.py "' . addslashes($author) . '"');
	if ($parseauthor) {
		$author = $parseauthor;
	}
	// ž -> z, etc.
	$author = iconv('UTF-8', 'ASCII//TRANSLIT', $author);
	// FIRST LAST -> First Last
	$author = trim(ucwords(strtolower($author)), "\n");
	// cache
	$_norm_name_db[$key] = $author;
	// return
	return $author;
}


$db = new MyDB();

$authors = array();
$coauthors = array();
$keywords = array();
$keywords_level2 = array();
$keywords_level3 = array();
$influencers = array();
$keywordauthors = array();


// for progress bar
$result = $db->query('SELECT count(json) AS `cnt` FROM `documents`');
$total = $result->fetchArray(SQLITE3_ASSOC)['cnt'];
echo $total . " documents\n";
$done = 0;


$i = 0;
$result = $db->query('SELECT `json` FROM `documents`');
while ($result && $doc = $result->fetchArray(SQLITE3_ASSOC)['json']) {

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

			// normalization
			$author = normalize_name($author);
			$authorid = md5($author);

			$thedoc = array(
						"title" => $jsondoc->title,
						"priority" => $jsondoc->priority,
						);

			// duplicate check
			// skip if this publication is already listed for this author
			if (isset($influencers[$author]) && isset($influencers[$author]['docs'])) {
				$found = false;
				foreach ($influencers[$author]['docs'] as $doc) {
					if ($doc['title'] === $jsondoc->title) {
						$found = true;
						break;
					}
				}
				if ($found) {
					continue;
				}
			}

			// increase publication counter for this author
			if (isset($authors[$author][$jsondoc->priority])) {
				$authors[$author][$jsondoc->priority] = $authors[$author][$jsondoc->priority] + 1;
			} else {
				$authors[$author][$jsondoc->priority] = 1;
			}

			if (isset($jsondoc->modified) && $jsondoc->modified) {
				if (isset($authors[$author]['modified'][$jsondoc->priority])) {
					$authors[$author]['modified'][] = $jsondoc->modified;
				} else {
					$authors[$author]['modified'] = [ $jsondoc->modified ];
				}
			}

			// store the title in the respective author details
			//first publication for this author
			if (!isset($influencers[$author])) {
				$influencers[$author] = [
					'docs' => array($thedoc),
					'keywords' => $authorkeywords,
				];
			} else {
				$influencers[$author]['docs'][] = $thedoc;
				//author keywords
				foreach ($authorkeywords as $kw) {
					if (!in_array($kw, $influencers[$author]['keywords'])) {
						$influencers[$author]['keywords'][] = $kw;
					}

					// for each keyword, store the author
					if (!isset($keywordauthors[$kw])) {
						$keywordauthors[$kw] = [ $authorid ];
					} else {
						if (!isset($keywordauthors[$kw][$authorid])) {
							$keywordauthors[$kw][] = $authorid;
						}
					}

				}
			}

			// coauthors
			// first time seeing this author?
			if (!isset($coauthors[$authorid])) {
				$coauthors[$authorid] = [];
			}
			foreach ($jsondoc->authors as $a) {
				$a = normalize_name($a);
				$aid = md5($a);
				// skip self
				if ($authorid === $aid) {
					continue;
				}
				if (!in_array($aid, $coauthors[$authorid])) {
					$coauthors[$authorid][] = $aid;
				}
			}

		}

	}

	// process the keywords
	// --------------------------------
	if ($jsondoc->keywords && $jsondoc->priority > 0) {
		$keyword_array = explode(" > ", $jsondoc->keywords);

		// L1
		foreach ($keyword_array as $level => $kw) {
		    $keywords[$level][$kw] = ($keywords[$level][$kw] ?? 0) + 1;
		}

		// Keywords (strings)
		$l1 = array_shift($keyword_array);
		$l2 = array_shift($keyword_array);
		$l3 = array_shift($keyword_array);

		// L2
		if ($l1 && $l2) {
		    $keywords_level2[$l1][$l2] = ($keywords_level2[$l1][$l2] ?? 0) + 1;
		}
		// L3
		if ($l1 && $l2 && $l3) {
		    $keywords_level3[$l1][$l2][$l3] = ($keywords_level3[$l1][$l2][$l3] ?? 0) + 1;
		}
	}

	$done++;
	show_status($done, $total, $size=20);

}

$priorities = [
	// 0 => [],
	1 => [],
	2 => [],
	3 => [],
];
foreach ($authors as $name => $arr) {
	for ($i = 1; $i < 4; $i++) {
		if (isset($arr[$i])) {
			$stack = [
				'name' => $name,
				'num' => $arr[$i],
				'id' => md5($name),
				'modified' => [],
			];
			if (isset($arr['modified'])) {
				$stack['modified'] = $arr['modified'];
			}
			array_push($priorities[$i], $stack);
		}
	}
}
usort($priorities[1], 'sortFunc');
usort($priorities[2], 'sortFunc');
usort($priorities[3], 'sortFunc');


// save influencers to json file
$fp = fopen('influencer.json', 'w');
fwrite($fp, json_encode($priorities));
fclose($fp);

// keywords (level 1)
$kws = array();
foreach ($keywords[0] as $key => $val) {
	$tmp = array('name' => $key, 'num' => $val, 'id' => md5($key));
	array_push($kws, $tmp);
}
// sort descending by num
usort($kws, 'sortFunc');
// save keywords to file
$fp = fopen('keywords.json', 'w');
fwrite($fp, json_encode($kws));
fclose($fp);

// keywords (level 2)
foreach ($keywords_level2 as $key => $sublevel) {
	if (isset($sublevel[""])) {
		unset($sublevel[""]);
	}
	// reorganize
	$tmp = [];
	foreach ($sublevel as $k => $v) {
		$tmp[] = ["name" => $k, "num" => $v, 'id' => md5($k)];
	}
	// sort descending by num
	usort($tmp, 'sortFunc');
	// save keywords to file
	$fp = fopen("level2/" . md5($key) . ".json", 'w');
	fwrite($fp, json_encode($tmp));
	fclose($fp);
}

// keywords (level 3)
$store = array();
foreach ($keywords_level3 as $l1 => $sublevel) {
	if (isset($sublevel[""])) {
		unset($sublevel[""]);
	}
	foreach ($sublevel as $l2 => $sublevel2) {
		if (isset($sublevel2[""])) {
			unset($sublevel2[""]);
		}
		// reorganize
		if (!isset($store[$l2])) {
			$store[$l2] = [];
		}
		foreach ($sublevel2 as $l3 => $num) {
			$store[$l2][] = ["name" => $l3, "num" => $num]; // no id needed at this last level
		}
	}
}
foreach ($store as $l2 => $data) {
	// sort descending by num
	usort($data, 'sortFunc');
	$fp = fopen("level3/" . md5($l2) . ".json", 'w');
	fwrite($fp, json_encode($data));
	fclose($fp);
}


// write out the author details
// chdir('./influencers/');
foreach ($influencers as $author => $array_of_titles) {
	$fp = fopen('./influencers/' . md5($author) . '.json', 'w');
	fwrite($fp, json_encode($array_of_titles));
	fclose($fp);
}

// for each keyword, store the author
foreach ($keywordauthors as $keyword => $arr) {
	$fp = fopen('./keywordauthors/' . md5($keyword) . '.json', 'w');
	fwrite($fp, json_encode($arr));
	fclose($fp);
}

// for each author, store the coauthors
foreach ($coauthors as $authorid => $coauthors_arr) {
	$fp = fopen('./coauthors/' . $authorid . '.json', 'w');
	fwrite($fp, json_encode($coauthors_arr));
	fclose($fp);
}

