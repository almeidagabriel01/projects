// selecionando o botão placar e quando ele for clicado, executará a função
$("#botao-placar").click(mostraPlacar);
$("#botao-sync").click(sincronizaPlacar);

function inserePlacar() {
  var corpoTabela = $(".placar").find("tbody"); // selecionando o corpo da tabela
  var usuario = $("#usuarios").val(); // definindo o usuário
  var numPalavras = $("#contador-palavras").text(); // selecionando o contador de palavras

  // inserindo a linha na tabela
  var linha = novaLinha(usuario, numPalavras);

  // vai procurar o botao-remover dentro da var linha e acionar a função de remover
  linha.find(".botao-remover").click(removeLinha);

  // colocando dentro do corpo da tabela a linha criada
  corpoTabela.prepend(linha);

  // mostrando o placar suavemente
  $(".placar").slideDown(500);

  // rolando a página até o placar
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
function removeLinha(event) {
  event.preventDefault();
  var linha = $(this).parent().parent();

  linha.fadeOut(1000);
  setTimeout(function () {
    linha.remove();
  }, 1000);
}

// mostrando o placar ao apertar o botão com animação
function mostraPlacar() {
  // fazendo a animação quando o botao for acionado
  $(".placar").stop().slideToggle(600);

  // esperando a animação para rolar a página
  setTimeout(function () {
    scrollPlacar();
  }, 600);
}

function sincronizaPlacar() {
  var placar = []; // var para guardar o usuario e pontos para postar no servidor
  var linhas = $("tbody>tr"); // pegando todas as tr que, são filhas diretas (>), de tbody

  linhas.each(function () {
    // pegando o primeiro td que está dentro da linha iterada(nome)
    var usuario = $(this).find("td:nth-child(1)").text();

    // pegando o segundo td que está dentro da linha iterada(contador palavras)
    var palavras = $(this).find("td:nth-child(2)").text();

    // criando a var score com nome e pontos para inserir no placar
    var score = {
      usuario: usuario,
      pontos: palavras
    };

    // salvando o score no placar
    placar.push(score);
  });

  // colocando o placar dentro de dados para passar como parâmetro para o post
  var dados = {
    placar: placar
  };
  // colocando os dados do placar dentro do servidor
  $.post("http://localhost:3000/placar", dados, function () {
    console.log("Salvou o placar no servidor");
  });
}

function atualizaPlacar() {
  $.get("http://localhost:3000/placar", function (data) { // pegando os dados do placar e realizar a função com o retorno (data)
    $(data).each(function () { // iterando cada linha dentro do servidor
      var linha = novaLinha(this.usuario, this.pontos); // criando a linha com os usuarios e pontos vindos do servidor (data)

      linha.find(".botao-remover").click(removeLinha); // vai procurar o botao-remover dentro da var linha e acionar a função de remover

      $("tbody").append(linha); // inserindo na tabela a linha criada
    });
  });
}