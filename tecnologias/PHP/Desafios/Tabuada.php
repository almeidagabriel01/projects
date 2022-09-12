<?php

for($i = 1; $i <= 10; $i++){
    echo "Tabuada do $i" . PHP_EOL;
    for($j = 1; $j <= 10; $j++){
        echo "$i x $j = " . $i * $j . PHP_EOL;
    }
    echo PHP_EOL;
}