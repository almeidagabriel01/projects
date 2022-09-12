<?php

$contasCorrentes = [
    '123.456.789-10' => [
        'titular' => 'Maria',
        'saldo' => 10000
    ],
    '123.456.689-11' => [
        'titular' => 'Alberto',
        'saldo' => 300
    ],
    '123.256.789-12' => [
        'titular' => 'Vinicius',
        'saldo' => 100
    ]
];

$contasCorrentes['123.258.852-12'] = [
    'titular' => 'Claudia',
    'saldo' => 2000
];

foreach ($contasCorrentes as $cpf => $conta) {
    echo $cpf . " " . $conta['titular'] . PHP_EOL;
}

/*
Existem qutro formas de usar a chave de um array associativo:
    1. Separando a concatenação (com aspas simples)
    Ex: exibeMensagem(
        $cpf . " " . $conta['titular'] . ' ' . $conta['saldo']
    );

    2. Usando aspas duplas
    Ex: exibeMensagem(
        "$cpf $conta[titular] $conta[saldo]"
    );

    3. Forma complexa (Usando chave e valor)
    Ex: exibeMensagem(
        "$cpf {$conta['titular']} {$conta['saldo']}"
    );

    4. Usando o list
    Ex: list('titular' => $titular, 'saldo' => $saldo) = $conta;
        exibeMensagem(
            "$cpf $titular $saldo"
        );

        OU

        ['titular' => $titular, 'saldo' => $saldo] = $conta;
    exibeMensagem(
        "$cpf $titular $saldo"
    );
*/