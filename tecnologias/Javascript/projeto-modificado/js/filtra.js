var campoFiltro = document.querySelector("#filtrar-tabela");

campoFiltro.addEventListener("input", function(){
  var pacientes = document.querySelectorAll(".paciente");

  // se tiver algo digitado no campo de filtro, irá fazer a verificação
  if(this.value.length > 0){
    for(var i = 0; i < pacientes.length; i++){
      var paciente = pacientes[i];
      var tdNome = paciente.querySelector(".info-nome");
      var nome = tdNome.textContent; // pegando o conteudo de texto do nome no td info-nome.
      var expressao = new RegExp(this.value, "i"); // expressão regular que busca o valor digitado no campo de filtro insensitivy, ou seja, busca independente se for maiuscula ou minuscula

      // vai testar, se no nome tem pelo menos um caractere do que foi digitado no campo de filtro. Irá retornar verdadeiro se tiver algo parecido, ou falso se não tiver
      if(!expressao.test(nome)){
        paciente.classList.add("invisivel")
      }
      // se for igual, irá remover a classe invisivel
      else{
        paciente.classList.remove("invisivel");
      }
    }
  }
  // se não tiver nada digitado no campo de filtro ou apagou, ele remove a classe dinamicamente
  else{
    for(var i = 0; i < pacientes.length; i++){
      var paciente = pacientes[i];
      paciente.classList.remove("invisivel");
    }
  }
});