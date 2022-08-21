var titulo = document.querySelector(".titulo");
titulo.textContent = "Aparecida Nutricionista";


// extraindo as informações de TODAS AS TRs com a classe paciente
var pacientes = document.querySelectorAll(".paciente"); // Selecionando os pacientes

// calculando e validando o IMC
for (var i = 0; i < pacientes.length; i++) {
  var tdPeso = pacientes[i].querySelector(".info-peso"); // Pegando o peso dos pacientes
  var peso = tdPeso.textContent; // Armazenando o conteúdo de texto do peso dos pacientes

  var tdAltura = pacientes[i].querySelector(".info-altura"); // Pegando a altura
  var altura = tdAltura.textContent;// Armazenando o conteúdo de texto da altura

  var tdIMC = pacientes[i].querySelector(".info-imc") // Selecionando a coluna IMC do HTML para fazer a alteração do valor

  // Validando os valores do peso e da altura
  var pesoValido = true;
  var alturaValida = true;

  if (peso <= 0 || peso >= 400)
    pesoValido = false;

  if (altura <= 0 || altura >= 3)
    alturaValida = false;

  // Mostrando se foi validado ou não
  if (alturaValida == false && pesoValido == false) {
    console.log("Altura e peso inválido!");
    tdIMC.textContent = "Altura e peso inválido!"
    pacientes[i].classList.add("paciente-invalido")
  }

  else if (alturaValida == false && pesoValido) {
    console.log("Altura inválida!");
    tdIMC.textContent = "Altura inválida!"
    pacientes[i].classList.add("paciente-invalido")
  }

  else if (alturaValida && pesoValido == false) {
    console.log("Peso inválido!");
    tdIMC.textContent = "Peso inválido!"
    pacientes[i].classList.add("paciente-invalido")
  }
  // Se for validado, irá calcular e mostrar o IMC
  else {
    var IMC = calculaImc(peso, altura); // Calculando o IMC
    tdIMC.textContent = IMC; // Pegando o conteúdo de texto da coluna e alterando o valor
  }
}

function calculaImc(peso, altura){
  var IMC = 0;

  IMC = peso / (altura * altura);

  return IMC.toFixed(2);
}