import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./componentes/layout/Header";
import TelaAssentos from "./componentes/TelaAssentos";
import TelaInicial from "./componentes/TelaInicial";
import TelaSessoes from "./componentes/TelaSessoes";
import TelaSucesso from "./componentes/TelaSucesso";

function App() {
  const [reserva, setReserva] = useState(null);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<TelaInicial />} />
        <Route path="/sessoes/:filmeId" element={<TelaSessoes />} />
        <Route
          path="/assentos/:sessaoId"
          element={
            <TelaAssentos finalizar={(reserva) => setReserva(reserva)} />
          }
        />
        <Route
          path="/sucesso"
          element={
            <TelaSucesso
              reserva={reserva}
              novaReserva={() => setReserva(null)}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
