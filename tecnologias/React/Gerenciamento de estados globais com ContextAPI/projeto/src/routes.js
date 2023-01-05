import Carrinho from "pages/Carrinho";
import Feira from "pages/Feira";
import Login from "pages/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UsuarioProvider } from "common/context/Usuario";
import { CarrinhoProvider } from "common/context/Carrinho";
import { PagamentoProvider } from "common/context/Pagamento";
import NaoEncontrada from "pages/NaoEncontrada";

function Router() {
  return (
    <BrowserRouter>
      <UsuarioProvider>
        <CarrinhoProvider>
          <PagamentoProvider>
            <Routes>
              <Route exact path="/" element={<Login />} />
              <Route path="/feira" element={<Feira />} />
              <Route path="/carrinho" element={<Carrinho />} />
              <Route path="*" element={<NaoEncontrada />} />
            </Routes>
          </PagamentoProvider>
        </CarrinhoProvider>
      </UsuarioProvider>
    </BrowserRouter>
  );
}

export default Router;
