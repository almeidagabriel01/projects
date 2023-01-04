import styles from "./Banner.module.css"
import criculoColorido from "assets/circulo_colorido.png"
import minhaFoto from "assets/minha_foto.png"

export default function Banner() {
  return (
    <div className={styles.banner}>
      <div className={styles.apresentacao}>
        <h1 className={styles.titulo}>
          Olá, Mundo!
        </h1>
        <p className={styles.paragrafo}>
          Boas vindas ao meu espaço pessoal! Eu sou Gabriel Almeida. Aqui compartilho vários conhecimentos, espero que aprenda algo novo :)
        </p>
      </div>

      <div className={styles.imagens}>
        <img 
          className={styles.criculoColorido}
          src={criculoColorido}
          aria-hidden={true}
        />

        <img
          className={styles.minhaFoto}
          src={minhaFoto}
          alt="Foto do Gabriel Almeida"
        />
      </div>
    </div>
  )
}