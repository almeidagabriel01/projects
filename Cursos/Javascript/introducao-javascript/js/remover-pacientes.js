var pacientes = document.querySelectorAll(".paciente")

var tabela = document.querySelector("#tabela-pacientes");

tabela.addEventListener("dblclick", function(event){
  /*
  var alvoEvento = event.target; //pega o alvo do elemento que foi dado o dblclick
  var paiDoAlvo = alvoEvento.parentNode; // seleciona o pai do elemento que foi dado o dblclick
  paiDoAlvo.remove(); // remove o pai do elemento
  */
  
  // cria uma classe para o pai do alvo clicado, para fazer uma animação no CSS
  event.target.parentNode.classList.add("fadeOut");
  
  // segura 0.5s para dar tempo de adicionar a classe e fazer a animação e depois remover
  setTimeout(function(){
    event.target.parentNode.remove();
  }, 500);
});