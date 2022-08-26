var tempoInicial = $("#tempo-digitacao").text(); // salvando o tempo inicial
var campo = $(".campo-digitacao"); // salvando o campo de digitação

// quando a página estiver carregada, vai realizar a função
$(
  function () {
    atualizaTamanhoFrase(); // inicializando a atualização do tamanho da frase
    inicializaCronometro(); // inicializando o cronometro
    incializaContadores(); // inicializando o cronometro
    inicializaMarcadores(); // inicializando o marcador se está correto ou errado o que foi digitado
    $("#botao-reiniciar").click(reiniciaJogo); // quando clicar no botão, irá reiniciar o jogo
    atualizaPlacar();
    $("#usuarios").selectize({
      create: true,
      sortField: 'text'
  });
  }
);

function atualizaTamanhoFrase() {
  var frase = $(".frase").text();// pegando o conteúdo de texto do elemento com a classe frase

  var numPalavras = frase.split(/\S+/).length - 1;// quebrando o texto nos espaços, salvando dentro de um array e retornando o tamanho desse array

  var tamanhoFrase = $("#tamanho-frase");// pegando o número de palavras dentro do HTML.

  tamanhoFrase.text(numPalavras); // mudando o conteúdo de texto do tamanhoFrase para o numero de palavras da frase
}

function atualizaTempoInicial(tempo) {
  tempoInicial = tempo;
  $("#tempo-digitacao").text(tempo);
}

function incializaContadores() {
  // Enquanto estiver entrando com dados no campo, irá executar a função
  campo.on("input", function () {
    var conteudo = campo.val(); // pegando o input digitado pelo user

    var qtdPalavras = conteudo.split(/\S+/).length - 1; // quebrando e salvando o tamanho em um array
    $("#contador-palavras").text(qtdPalavras); // substituindo o valor padrão colocado no HTML pela qtdPalavras

    var qtdCaracteres = conteudo.length; // pegando o tamanho da string para contar os caracteres
    $("#contador-caracteres").text(qtdCaracteres); // substituindo o valor padrão colocado no HTML pela qtdCaracteres
  });
}

function inicializaMarcadores() {
  // enquanto estiver digitando...
  campo.on("input", function () {
    var frase = $(".frase").text(); // pega a frase
    var digitado = campo.val(); // salvar o que está sendo digitado
    var comparavel = frase.substr(0, digitado.length); // var para comparar o que foi digitado com o que está na frase dinamicamente.

    // comparando a frase de acordo com o que está sendo digitado
    if (digitado == comparavel) {
      campo.addClass("borda-verde");
      campo.removeClass("borda-vermelha");
    }
    else {
      campo.addClass("borda-vermelha");
      campo.removeClass("borda-verde");
    }
  });
}

function inicializaCronometro() {
  /*
  $("#botao-reiniciar").attr("disabled", true); // desabilitando o botão para não poder clicar enquanto estiver rodando o cronometro e acontecer bug
  */

  // Quando o campo estiver no foco do input, ele vai acionar a função
  campo.one("focus", function () {
    // setando um intervalo de 1s ao realizar a função e armazenando o ID do setInterval para que quando zerar, parar de acionar a função
    var cronometroID = setInterval(function () {
      var tempoRestante = $("#tempo-digitacao").text(); // selecionando o tempo restante lá do HTML.
      tempoRestante--; // subtraindo a cada um segundo

      $("#tempo-digitacao").text(tempoRestante); // coloca o tempo restante no campo HTML.

      // caso o tempo restante for 0, irá disabilitar o campo textarea e para de subtrair
      if (tempoRestante < 1) {
        clearInterval(cronometroID); // parando de acionar o setInterval
        finalizaJogo();
      }

      // parando de acionar o setInterval toda vez que o botão for clicado
      $("#botao-reiniciar").click(function () {
        clearInterval(cronometroID);
      });

    }, 1000);
  });
}

function finalizaJogo() {
  campo.attr("disabled", true); // desabilitando o campo
  campo.addClass("campo-desativado"); // cria uma classe para deixar a cor do background do campo cinza
  inserePlacar(); // quando acabar, irá inserir o placar

  /*
  $("#botao-reiniciar").attr("disabled", false); // habilitando o botao novamente quando estiver acabando o jogo
  */
}

// reiniciando o jogo
function reiniciaJogo() {
  campo.attr("disabled", false); // habilitando o campo do textarea
  campo.val(""); // zerando o campo do textarea
  $("#contador-palavras").text("0"); // resetando o contador de palavras
  $("#contador-caracteres").text("0"); // resetando o contador de caracteres
  $("#tempo-digitacao").text(tempoInicial); // resetando o tempo inical
  inicializaCronometro(); // inicializando o cronometro quando for reiniciado
  campo.removeClass("campo-desativado"); // removendo a classe quando for reiniciado para ficar branco o fundo do campo
  campo.removeClass("borda-verde"); // removendo o marcador se esta certo
  campo.removeClass("borda-vermelha"); // removendo o marcador se esta errado
}