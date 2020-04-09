<?php

// expected: dda019fe4e9c739246bfeaa07b460154

echo "Simo Hosio" . PHP_EOL;
$m = md5("Simo Hosio");
echo md5("Simo Hosio") . PHP_EOL;
// actual: dda019fe4e9c739246bfeaa07b460154

echo $m === 'dda019fe4e9c739246bfeaa07b460154';
echo PHP_EOL;