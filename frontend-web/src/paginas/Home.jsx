import { useEffect, useState } from "react";
import { getServicios, crearServicio, actualizarServicio } from "../servicios/api";

import ServiceForm from "../componentes/ServiceForm";
import Toast from "../componentes/Toast";
import SearchBox from "../componentes/SearchBox";
import ServiceCard from "../componentes/ServiceCard";
import Loading from "../componentes/Loading";
import Modal from "../componentes/Modal";
import EditServiceForm from "../componentes/EditServiceForm";

import "../App.css";

function Home() {
  const [servicios, setServicios] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [loading, setLoading] = useState(true);

  const [guardando, setGuardando] = useState(false);

  const [editOpen, setEditOpen] = useState(false);
  const [seleccionado, setSeleccionado] = useState(null);
  const [actualizando, setActualizando] = useState(false);

  const [toast, setToast] = useState({ type: "", text: "" });

  const showToast = (type, text) => {
    setToast({ type, text });
    setTimeout(() => setToast({ type: "", text: "" }), 3000);
  };

  const cargar = () => {
    setLoading(true);
    getServicios()
      .then(setServicios)
      .catch(() => showToast("error", "No se pudieron cargar los servicios."))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    cargar();
  }, []);

  const guardarServicio = async (payload) => {
    try {
      setGuardando(true);
      await crearServicio(payload);
      showToast("success", "Servicio creado con éxito ✅");
      cargar();
      return true;
    } catch (e) {
      showToast("error", e.message || "Error guardando servicio");
      return false;
    } finally {
      setGuardando(false);
    }
  };

  const abrirEdicion = (servicio) => {
    setSeleccionado(servicio);
    setEditOpen(true);
  };

  const guardarCambios = async (payload) => {
    try {
      setActualizando(true);
      await actualizarServicio(seleccionado.id, payload);
      showToast("success", "Servicio actualizado ✅");
      setEditOpen(false);
      setSeleccionado(null);
      cargar();
      return true;
    } catch (e) {
      showToast("error", e.message || "Error actualizando");
      return false;
    } finally {
      setActualizando(false);
    }
  };

  const filtrados = servicios.filter((s) =>
    (s.nombre + " " + s.descripcion).toLowerCase().includes(filtro.toLowerCase())
  );

  if (loading) return <Loading />;

  return (
    <div>
      <h2 className="title-style">Servicios TI</h2>

      <Toast
        type={toast.type}
        text={toast.text}
        onClose={() => setToast({ type: "", text: "" })}
      />

      <ServiceForm onGuardar={guardarServicio} loading={guardando} />

      <SearchBox value={filtro} onChange={setFiltro} />

      {filtrados.length === 0 && <p>No hay resultados</p>}

      <div className="services-grid">

      {filtrados.map((s) => (
        <ServiceCard key={s.id} servicio={s} onEdit={abrirEdicion} />
      ))}
      </div>

      <Modal
        open={editOpen}
        title="Editar Servicio"
        onClose={() => setEditOpen(false)}
      >
        <EditServiceForm
          servicio={seleccionado}
          onGuardar={guardarCambios}
          loading={actualizando}
        />
      </Modal>
    </div>
  );
}

export default Home;