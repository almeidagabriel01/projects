import logo from './logo.png'
import search from './search.png'
import styles from './Cabecalho.module.scss'
import { useContext } from 'react';
import { FotosContext } from 'common/context/Fotos';

export default function Cabecalho() {
  const { pesquisa } = useContext(FotosContext);
  const click = true;
  return (
      <header className={styles.cabecalho}>
        <img src={logo} alt="Logo do Alura Space"/>
        <div className={styles.cabecalho__container}>
        <input className={styles.cabecalho__input} type="text" placeholder="O que você procura?" id='pesquisa' onKeyDown={(event) => pesquisa(event)}/>
          <img src={search} alt="Ícone de lupa" onClick={(event) => pesquisa(event, click)}/>
        </div>
      </header>
  );
}