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

    $(this).parent().parent().remove(); // removendo o pai do pai do botão, no caso a linha
  });
}