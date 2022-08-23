var frase = $(".frase").text();// pegando o conteúdo de texto do elemento com a classe frase

var numPalavras = frase.split(/\S+/).length - 1;// quebrando o texto nos espaços, salvando dentro de um array e retornando o tamanho desse array

var tamanhoFrase = $("#tamanho-frase");// pegando o número de palavras dentro do HTML.

tamanhoFrase.text(numPalavras); // mudando o conteúdo de texto do tamanhoFrase para o numero de palavras da frase

var campo = $(".campo-digitacao");

// Enquanto estiver entrando com dados no campo, irá executar a função
campo.on("input", function () {
  var conteudo = campo.val(); // pegando o input digitado pelo user

  var qtdPalavras = conteudo.split(/\S+/).length - 1; // quebrando e salvando o tamanho em um array
  $("#contador-palavras").text(qtdPalavras); // substituindo o valor padrão colocado no HTML pela qtdPalavras

  var qtdCaracteres = conteudo.length; // pegando o tamanho da string para contar os caracteres
  $("#contador-caracteres").text(qtdCaracteres); // substituindo o valor padrão colocado no HTML pela qtdCaracteres
});

var tempoRestante = $("#tempo-digitacao").text(); // pega o conteúdo do elemento que conta o tempo no HTML.

// Quando o campo estiver no foco do input, ele vai acionar a função
campo.one("focus", function () {
  // setando um intervalo de 1s ao realizar a função e armazenando o ID do setInterval para que quando zerar, parar de acionar a função
  var cronometroID = setInterval(function () {
    tempoRestante--; // subtraindo a cada um segundo
    $("#tempo-digitacao").text(tempoRestante); // mudando o valor no campo

    // caso o tempo restante for 0, irá disabilitar o campo textarea e para de subtrair
    if (tempoRestante < 1){
      campo.attr("disabled", true); // desabilitando o campo
      clearInterval(cronometroID); // parando de acionar o setInterval
    }
  }, 1000);
});