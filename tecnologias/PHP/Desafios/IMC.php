<?php

$peso = 62;
$altura = 1.82;

$IMC = $peso/$altura ** 2;
$IMC = number_format($IMC, 2, '.', ' '); // Formatando com duas casas decimais, pomto ('.') como separador decimal, e espaço (' ') como separador de milhar

if ($IMC >= 18.5 && $IMC <= 24.9){
  echo "Seu IMC é $IMC. Você está com o IMC dentro!";
}
else if ($IMC >= 25 && $IMC <= 29.9){
  echo "Seu IMC é $IMC. Você está com o IMC acima";
}
else if ($IMC < 18.5){
  echo "Seu IMC é $IMC. Você está com o IMC abaixo";
}