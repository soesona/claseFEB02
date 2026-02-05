import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./paginas/Home";
import ServicioDetalle from "./componentes/ServicioDetalle";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/servicios/:id" element={<ServicioDetalle />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;