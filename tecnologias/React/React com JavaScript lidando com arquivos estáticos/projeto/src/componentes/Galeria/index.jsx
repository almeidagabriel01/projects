import React, { useContext } from "react";
import Tags from "../Tags";
import styles from "./Galeria.module.scss";
import Cards from "./Cards";
import { FotosContext } from "common/context/Fotos";
import fotos from './fotos.json'

export default function Galeria() {
  const { itens, setItens, filtraFotos } = useContext(FotosContext);
  const tags = [...new Set(fotos.map((valor) => valor.tag))]

  return (
    <section className={styles.galeria}>
      <h2>Navegue pela galeria</h2>
      <Tags tags={tags} filtraFotos={filtraFotos} setItens={setItens}/>
      <Cards itens={itens} styles={styles} />
      
    </section>
  );
}
