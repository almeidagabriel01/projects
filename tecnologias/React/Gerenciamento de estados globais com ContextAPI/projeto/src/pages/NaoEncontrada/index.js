import styles from "./NaoEncontrada.module.css";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function NaoEncontrada() {
  const navegar = useNavigate();

  return (
    <>
      <div className={styles.conteudoContainer}>
        <span className={styles.texto404}>404</span>

        <h1 className={styles.titulo}>Ops! Página não encontrada.</h1>

        <p className={styles.paragrafo}>
          Tem certeza de que era isso que você estava procurando?
        </p>

        <p className={styles.paragrafo}>
          Aguarde uns instantes e recarregue a página, ou volte para a página
          inicial.
        </p>

        <div className={styles.botaoContainer} onClick={() => navegar(-1)}>
          <button className={`
            ${styles.botaoPrincipal}
            ${styles.lg}
          `}>
            Voltar
          </button>
        </div>
      </div>
    </>
  );
}
