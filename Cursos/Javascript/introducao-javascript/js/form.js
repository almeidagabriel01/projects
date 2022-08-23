// Selecionando o botão para fazer as ações dos eventos
var botaoAdicionar = document.querySelector("#adicionar-paciente");
// adicionando uma ação no escutador de evento que é ao clicar no botão
botaoAdicionar.addEventListener("click", function (event) {

  // previnindo o evento padrão do navegador que é enviar o form e recarregar a página
  event.preventDefault();

  // selecionando o formulário de adicionar
  var form = document.querySelector("#form-adiciona"); // trazendo o formulário adiciona para a variável form

  // pegando os valores inseridos nos inputs
  var paciente = obtemPacienteDoFormulario(form);


  // verificando se o paciente é válido
  var erros = validaPaciente(paciente); // vai retornar a mensagem de erro ou uma string vazia, sem nenhum caractere.

  // caso tenha uma mensagem de texto dentro do array
  if (erros.length > 0) {
    exibeMensagensDeErro(erros); // vai mostrar cada mensagem de erro
    return; // e vai retornar vazio e nâo vai continuar executando as linhas abaixo da fução anônima.
  }


  // adicionando o paciente na tabela
  adicionaPacienteNaTabela(paciente);

  
  // limpando os inputs depois que colocar na tabela e as mensagens de erro
  form.reset();
  var mensagensErro = document.querySelector("#mensagens-erro");
  mensagensErro.innerHTML = "";
});

function adicionaPacienteNaTabela(paciente) {
  // criando a tr e a td do paciente e armazenando na variável pacienteTr
  var pacienteTr = montaTr(paciente);

  // inserindo os td e tr na tabela
  var tabela = document.querySelector("#tabela-pacientes");

  // colocando o Tr dentro da tabela, ou Td.
  tabela.appendChild(pacienteTr);
}

function exibeMensagensDeErro(erros) {
  var ul = document.querySelector("#mensagens-erro"); // selecionando a ul
  ul.innerHTML = ""; // apagando as tags li dentro da tag ul para não acumular

  // for each para criar uma lista de erros dentro do HTML
  erros.forEach(function (erro) {
    var li = document.createElement("li"); // criando a tag li no html
    li.textContent = erro; // inserindo o conteudo de texto dentro do li
    ul.appendChild(li); // colocando a li dentro do ul
  });
}

function obtemPacienteDoFormulario(form) {

  // criando um objeto com as características de um paciente
  var paciente = {

    //pegando do form, o valor inserido no nome, peso, altura e gordura e calculando o IMC
    nome: form.nome.value,
    peso: form.peso.value,
    altura: form.altura.value,
    gordura: form.gordura.value,
    imc: calculaImc(form.peso.value, form.altura.value)
  }

  return paciente;
}

function montaTr(paciente) {
  var pacienteTr = document.createElement("tr"); // criando uma linha (tr) vazia na tabela para adicionar o paciente
  pacienteTr.classList.add("paciente"); // criando a classe "paciente" para estilizar

  // criando as colunas, adicionando as devidas classes, inserindo o conteúdo de texto e colocando o td dentro do tr
  pacienteTr.appendChild(montaTd(paciente.nome, "info-nome"));
  pacienteTr.appendChild(montaTd(paciente.peso, "info-peso"));
  pacienteTr.appendChild(montaTd(paciente.altura, "info-altura"));
  pacienteTr.appendChild(montaTd(paciente.gordura, "info-gordura"));
  pacienteTr.appendChild(montaTd(paciente.imc, "info-imc"));

  // retornando toda a linha criada com os valores de cada coluna
  return pacienteTr;
}

function montaTd(dado, classe) {
  // criando a coluna na tabela
  var td = document.createElement("td");

  // inserindo o conteúdo de texto na tabela
  td.textContent = dado;

  // criando a classe para cada td diferente
  td.classList.add(classe);

  return td;
}

function validaPaciente(paciente) {

  var erros = []; // criando um array para retornar as diferentes mensagens de erro

  // verificando os campos foram preenchidos
  if (paciente.nome.length == 0) {
    erros.push("O nome não pode ser em branco"); // empurrando a string nome inválido para dentro do array
  }
  if (paciente.gordura.length == 0) {
    erros.push("A gordura não pode ser em branco"); // empurrando a string gordura inválida para dentro do array
  }
  if (paciente.peso.length == 0) {
    erros.push("O peso não pode ser em branco"); // empurrando a string peso inválido para dentro do array
  }
  if (paciente.altura.length == 0) {
    erros.push("A altura não pode ser em branca");
  }

  // validando o peso e a altura do paciente
  else if (!validaPeso(paciente.peso) && validaAltura(paciente.altura))
    erros.push("Peso é inválido"); // empurrando a string peso inválido para dentro do array

  else if (validaPeso(paciente.peso) && !validaAltura(paciente.altura))
    erros.push("Altura é inválida"); // empurrando a string altura inválida para dentro do array

  else if (!validaPeso(paciente.peso) && !validaAltura(paciente.altura))
    erros.push("Altura e peso são inválidos"); // empurrando a string altura e peso inválidos para dentro do array

  return erros;
}