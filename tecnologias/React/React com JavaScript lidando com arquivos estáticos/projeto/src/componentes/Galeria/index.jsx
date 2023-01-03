import React, { useState } from "react";
import Tags from "../Tags";
import styles from "./Galeria.module.scss";
import fotos from "./fotos.json";
import Cards from "./Cards";

export default function Galeria() {
  const [itens, setItens] = useState(fotos);
  const tags = [...new Set(fotos.map((valor) => valor.tag))]

  const filtraFotos = (tag) => {
    const novasFotos = fotos.filter((foto) => {
      return foto.tag === tag;
    })

    setItens(novasFotos);
  }

  const pesquisa = document.getElementById("pesquisa");

  if(pesquisa){
    pesquisa.addEventListener("keydown", (event) => {
      const textoDigitado = event.target.value;
      if(event.keyCode === 13 && textoDigitado !== ''){
        const fotosFiltradas = fotos.filter(foto => foto.tag.includes(textoDigitado));
        setItens(fotosFiltradas);
      }
      if(textoDigitado === ''){
        setItens(fotos);
      }
    })
  }

  return (
    <section className={styles.galeria}>
      <h2>Navegue pela galeria</h2>
      <Tags tags={tags} filtraFotos={filtraFotos} setItens={setItens}/>
      <Cards itens={itens} styles={styles} />
      
    </section>
  );
}
