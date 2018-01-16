<?php

define('STATE_FILE', './static/readinglist.json');


if (!isset($_POST['filechange'])) {
    exit;
}


// record a change event
if ($_POST['filechange']) {

    $docs = array();

    $state = file_get_contents(STATE_FILE);






    // $fp = fopen('references.json', 'w');
    // fwrite($fp, json_encode($references, JSON_PRETTY_PRINT));
    // fclose($fp);

}
