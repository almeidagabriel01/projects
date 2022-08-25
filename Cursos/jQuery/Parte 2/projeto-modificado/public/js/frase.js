$("#botao-frase").click(fraseAleatoria); // selecionando o botão de frase e quando for clicado, vai trocar a frase

function fraseAleatoria() {
  $("#spinner").toggle(); // mostrando o spinner de carregamento


  // pega a frase aleatória e executa o que está na função passada
  $.get("http://localhost:3000/frases", trocaFraseAleatoria)

    // caso o get der errado, vai mostrar a mensagem de erro criada no HTML. Mostra durante um tempo e tira a mensagem
    .fail(function () {
      $("#erro").toggle();
      setTimeout(function () {
        $("#erro").toggle();
      }, 2000);
    })

    .always(function() { // sempre esconde o spinner depois de feito a requisição
      $("#spinner").toggle();
    });
}

// troca as frases
function trocaFraseAleatoria(data) {
  var frase = $(".frase"); // selecionando a frase para trocar
  var numeroAleatorio = Math.floor(Math.random() * data.length); // gerando um número aleatório

  frase.text(data[numeroAleatorio].texto); // trocando a frase pelo número aleatório
  atualizaTamanhoFrase(); // atualiza o tamanho da frase para a frase atual
  atualizaTempoInicial(data[numeroAleatorio].tempo); // atualiza o tempo conforme está no servidor
}