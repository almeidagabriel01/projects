var botaoAdicionar = document.querySelector("#buscar-pacientes");

botaoAdicionar.addEventListener("click", function () {
  //https://api-pacientes.herokuapp.com/pacientes
  console.log("Buscando pacientes...");

  var xhr = new XMLHttpRequest(); // var para criar a requisição para poder acessar o site

  xhr.open("GET", "https://api-pacientes.herokuapp.com/pacientes"); // configurando para criar a requisição para o devido site

  var erroAjax = document.querySelector("#erro-ajax"); // pegando o span erro-ajax para caso dê erro na requisição

  // adicionando um escutador de eventos para pegar a resposta da requisição quando ela for enviada e fazer uma ação
  xhr.addEventListener("load", function () {
    
    // verificando se deu algum erro, o status 200 quer dizer que não houve erro
    if(xhr.status == 200){
      erroAjax.classList.add("invisivel");
      var resposta = xhr.responseText; // salvando a resposta dada da requisição
      var pacientes = JSON.parse(resposta); // convertendo a string JSON gerada pela resposta da requisição em um array de objetos
  
      pacientes.forEach(function(paciente) {
        adicionaPacienteNaTabela(paciente); // adicionando o paciente com for each
      });
    }
    // se deu erro, irá mostrar no console
    else{
      console.log(xhr.status); // mostrando o código do erro
      console.log(xhr.responseText); // mostrando o texto da resposta do código de erro

      
      erroAjax.classList.remove("invisivel"); // removendo a classe invisivel para mostrar que deu erro ao usuário
    }

  });

  xhr.send(); // enviando a requisição feita
});