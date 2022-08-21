// Selecionando o botão para fazer as ações dos eventos
var botaoAdicionar = document.querySelector("#adicionar-paciente");
// adicionando uma ação no escutador de evento que é ao clicar no botão
botaoAdicionar.addEventListener("click", function(event) {
  
  // previnindo o evento padrão do navegador que é enviar o form e recarregar a página
  event.preventDefault();
  
  // selecionando o formulário de adicionar
  var form = document.querySelector("#form-adiciona"); // trazendo o formulário adiciona para a variável form

  // pegando os valores inseridos nos inputs
  var paciente = obtemPacienteDoFormulario(form);

  // criando a tr e a td do paciente e armazenando na variável pacienteTr
  var pacienteTr = montaTr(paciente);

  // inserindo os td e tr na tabela
  var tabela = document.querySelector("#tabela-pacientes");
  tabela.appendChild(pacienteTr);

  // limpando os inputs depois que colocar na tabela
  form.reset();

});

function obtemPacienteDoFormulario(form){

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

function montaTr(paciente){
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

function montaTd(dado, classe){
   // criando a coluna na tabela
  var td = document.createElement("td");

  // inserindo o conteúdo de texto na tabela
  td.textContent = dado;

  // criando a classe para cada td diferente
  td.classList.add(classe);

  return td;
}