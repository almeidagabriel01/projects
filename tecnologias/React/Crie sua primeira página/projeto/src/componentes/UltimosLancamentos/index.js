import { livros } from './dadosUltimosLancamentos'
import { Titulo } from '../Titulo'
import CardRecomenda from '../CardRecomenda'
import imagemLivro from '../../imagens/livro2.png'
import styled from 'styled-components'

const UltimosLancamentosContainer = styled.section`
    background-color: #EBECEE;
    padding-bottom: 20px;
    display: flex;
    flex-direction: column;
`

const NovosLivrosContainer = styled.div`
    margin: 15px 0;
    display: flex;
    width: 100%;
    justify-content: center;
    cursor: pointer;
`

const Imagem = styled.img`
  margin: 0 10px;
  &:hover{
    transition: 1s;
    transform: scale(1.1);
  }
`

function UltimosLancamentos() {
  return (
    <UltimosLancamentosContainer>
      <Titulo 
        cor="#EB9B00"
        tamanhoFonte="36px"
      >ÚTLIMOS LANÇAMENTOS</Titulo>
      <NovosLivrosContainer>
        {livros.map( livro => (
          <Imagem src={livro.src} alt="livros" />
        ))}
      </NovosLivrosContainer>
      <CardRecomenda 
        titulo="Talvez você se interesse por..."
        subtitulo="Angular 11"
        descricao="Construindo uma aplicação com a plataforma Google"
        img={imagemLivro}
      />
    </UltimosLancamentosContainer>
  )
}

export default UltimosLancamentos