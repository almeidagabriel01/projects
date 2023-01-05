import './styles/estilosGlobais.scss'
import PaginaInicial from "./paginas/PaginaInicial";
import { FotosProvider } from 'common/context/Fotos';

export default function App() {
  return (
    <FotosProvider>
       <PaginaInicial/>
    </FotosProvider>
  )
}
