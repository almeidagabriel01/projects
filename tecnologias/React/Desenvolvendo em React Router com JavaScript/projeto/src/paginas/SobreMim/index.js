import styles from "./SobreMim.module.css";

import PostModelo from "componentes/PostModelo";
import fotoCapa from "assets/sobre_mim_capa.png";
import fotoSobreMim from "assets/sobre_mim_foto.png"

export default function SobreMim() {
  return (
    <PostModelo
      fotoCapa={fotoCapa}
      titulo="Sobre mim"
    >
      <h3 className={styles.subtitulo}>
        Olá, eu sou o Gabriel!
      </h3>

      <img 
        src={fotoSobreMim}
        alt="Foto do Gabriel"
        className={styles.fotoSobreMim}
      />

      <p className={styles.paragrafo}>
                Oi, tudo bem? Eu sou um estudante de programação e estou feliz de te ver por aqui.
      </p>
      <p className={styles.paragrafo}>
          Minha história com programação começou no Instituto Nacional de Telecomunicações (INATEL). Aprendi lógica de programação e o básico de várias linguagens, tanto como estudante, como também fazendo estágio.
      </p>
      <p className={styles.paragrafo}>
          Escolhi cursar Engenharia de Software. Lá eu participei de uma feira tecnológica em 2021, no qual meu grupo escolheu fazer um site que ajudasse pessoas desempregadas a divulgar seu trabalho. Com esse projeto, nosso grupo foi o projeto ganhador do Prêmio Municipal de Inovações que foi julgado pela prefeitura da cidade.
      </p>
      <p className={styles.paragrafo}>
          No estágio foi a onde eu tive experiência de dev mais próxima da realidade, com prazos de implementação para o site, e aprendi muito enquanto codificava.
      </p>
      <p className={styles.paragrafo}>
          Desde então, aprendi várias linguagens de programação, tanto na faculdade quanto no estágio... Entre elas estão: Java, MySQL, HTML, CSS, JavaScript, jQuery, React, entre outras.
      </p>
    </PostModelo>
  )
}