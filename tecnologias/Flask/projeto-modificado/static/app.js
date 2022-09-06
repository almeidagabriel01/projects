$('form input[type="file"]').change((event) => {
  let arquivos = event.target.files; 
  if (arquivos.length === 0) {
    // Se não houver arquivos
    console.log("sem imagem pra mostrar");
  } else {
    if (arquivos[0].type == "image/jpeg") {
      // se o arquivo for do tipo imagem jpeg
      $("img").remove(); // remove a imagem anterior
      let imagem = $('<img class="img-fluid">'); // cria uma nova imagem
      imagem.attr("src", window.URL.createObjectURL(arquivos[0])); // adiciona a imagem ao src criando um objeto URL para o arquivo selecionado
      $("figure").prepend(imagem); // adiciona a imagem ao figure
    } else {
      // se o arquivo não for do tipo imagem jpeg
      alert("Formato não suportado");
    }
  }
});
