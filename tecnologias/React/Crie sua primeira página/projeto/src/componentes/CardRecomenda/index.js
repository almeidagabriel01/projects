import styled from "styled-components"
import { Titulo } from "../Titulo"

const Card = styled.div`
    align-items: center;
    background-color: #FFF;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    display: flex;
    margin: 0 auto;
    max-width: 610px;
    padding: 25px 20px;
    justify-content: space-around;
    width: 100%;  
`

const LivroRecomendado = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 0 20px 0;
`

const Subtitulo = styled.h4`
    color: #002F52;
    font-size: 18px;
    font-weight: bold;
    margin: 15px 0 0 0;
`

const Descricao = styled.p`
  display: flex;
  max-width: 300px;
  text-align: center;
`

const ImgLivro = styled.img`
  display: flex;
  width: 150px;
  align-items: center;
`

const Botao = styled.button`
    background-color: #EB9B00;
    color: #FFF;
    padding: 10px 0px;
    font-size: 16px;
    border: none;
    border-radius: 5px;
    font-weight: 900;
    display: block;
    text-align: center;
    width: 150px;
    margin-top: 20px;
    &:hover {
      cursor: pointer;
      transform: scale(1.1);
      transition: 1s;
    }
`

function CardRecomenda({titulo, subtitulo, descricao, img}){
  return (
    <Card>
      <div>
        <Titulo tamanhoFonte="16px" cor="#EB9B00">{titulo}</Titulo>
        <LivroRecomendado>
          <Subtitulo>{subtitulo}</Subtitulo>
          <Descricao>{descricao}</Descricao>
          <ImgLivro src={img} alt={titulo}/>
          <Botao>Saiba mais</Botao>
        </LivroRecomendado>
      </div>
    </Card>
  )
}

export default CardRecomenda