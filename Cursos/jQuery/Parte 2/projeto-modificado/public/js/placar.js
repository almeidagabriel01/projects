// selecionando o botão placar e quando ele for clicado, executará a função
$("#botao-placar").click(mostraPlacar);

function inserePlacar() {
  var corpoTabela = $(".placar").find("tbody"); // selecionando o corpo da tabela
  var usuario = "Gabriel"; // definindo o usuário
  var numPalavras = $("#contador-palavras").text(); // selecionando o contador de palavras

  // inserindo a linha na tabela
  var linha = novaLinha(usuario, numPalavras);

  // vai procurar o botao-remover dentro da var linha e adicionar a função de remover
  linha.find(".botao-remover").click(removeLinha);

  // colocando dentro do corpo da tabela a linha criada
  corpoTabela.prepend(linha);

  // mostrando o placar suavemente
  $(".placar").slideDown(500);
  scrollPlacar();
}

// função para scrollar a página até o placar quando for aberto
function scrollPlacar() {
  var posicaoPlacar = $(".placar").offset().top; // pegando a posição no topo do placar na página
  $("html,body").animate({
    scrollTop: posicaoPlacar + "px"
  }, 1000);
}

// criando nova linha dentro da tabela
function novaLinha(usuario, palavras) {
  var linha = $("<tr>");
  var colunaUsuario = $("<td>").text(usuario);
  var colunaPalavras = $("<td>").text(palavras);
  var colunaRemover = $("<td>");

  var link = $("<a>").addClass("botao-remover").attr("href", "#");
  var icone = $("<i>").addClass("small").addClass("material-icons").text("delete");

  // Icone dentro do <a>
  link.append(icone);

  // <a> dentro do <td>
  colunaRemover.append(link);

  // Os três <td> dentro do <tr>
  linha.append(colunaUsuario);
  linha.append(colunaPalavras);
  linha.append(colunaRemover);

  return linha;
}

// fazendo o botao remover, remover a linha
function removeLinha() {
  $(".botao-remover").click(function (event) {
    event.preventDefault(); // para de levar a página para o topo ao clicar no botão criado
    var linha = $(this).parent().parent(); // pai do pai do botão

    linha.fadeOut(1000); // dando um display none na linha com animação

    // removendo a linha assim que o efeito acabar
    setTimeout(function () {
      linha.remove();
    }, 1000);
  });
}

// mostrando o placar ao apertar o botão com animação
function mostraPlacar() {
  // fazendo a animação quando o botao for acionado
  $(".placar").stop().slideToggle(600);

  // esperando a animação para rolar a página
  setTimeout(function() {
    scrollPlacar();
  }, 600);
}