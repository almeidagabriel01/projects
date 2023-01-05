import { createContext, useState } from "react";
import fotos from "../../componentes/Galeria/fotos.json";

export const FotosContext = createContext();
FotosContext.displayName = "Fotos"

export const FotosProvider = ({children}) => {
  const [itens, setItens] = useState(fotos);

  const filtraFotos = (tag) => {
    const novasFotos = fotos.filter((foto) => {
      return foto.tag === tag;
    })

    setItens(novasFotos);
  }
    
  function pesquisa (event, click = false) {
    const input = document.getElementById("pesquisa");
    const textoDigitado = input.value;

    if((event.keyCode === 13 || click === true) && textoDigitado !== ''){
      const fotosFiltradas = fotos.filter(foto => foto.tag.includes(textoDigitado));
      setItens(fotosFiltradas);
    }
    else if(textoDigitado === ''){
      setItens(fotos);
    }
  }

  return (
    <FotosContext.Provider value={{
      itens,
      setItens,
      filtraFotos,
      pesquisa
    }}>
      {children}
    </FotosContext.Provider>
  )
}