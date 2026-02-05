import { useEffect, useState } from "react";
// useState: permite almacenar y actualizar el estado del componente.
// useEffect: permite ejecutar lógica cuando el componente se monta o cuando cambian dependencias.

import { useParams, Link } from "react-router-dom";
// useParams: obtiene parámetros dinámicos desde la URL (/servicios/:id).
// Link: permite navegar entre rutas sin recargar la página.

import { getServicios } from "../servicios/api";
// Función que consume la API para obtener el listado de servicios.

import Loading from "../componentes/Loading";
// Componente reutilizable para mostrar un indicador de carga.


// Define un componente funcional de React.
function ServicioDetalle() {
// Extrae el valor del parámetro id desde la URL.
// Ejemplo: /servicios/3 → id = "3".
  const { id } = useParams();

// Guarda el servicio encontrado según el id.
  // Inicialmente es null.
  const [servicio, setServicio] = useState(null);

  // Controla si los datos están cargando.
    // Se inicia en true para mostrar el componente <Loading />.
  const [loading, setLoading] = useState(true);

  // Almacena mensajes de error si ocurre un problema al buscar el servicio.
  const [error, setError] = useState("");

// Este efecto se ejecuta:
  // Cuando el componente se monta o cuando cambia el id
  useEffect(() => {
    // Activa el estado de carga * Limpia cualquier error previo
    setLoading(true);
    setError("");

// Llama a la API para obtener el listado completo de servicios.
    getServicios()
// Busca dentro del arreglo el servicio cuyo id coincida con el de la URL.
// Se usa String() para evitar errores por tipo (number vs string).
      .then((data) => {
        const encontrado = data.find((x) => String(x.id) === String(id));
// Se usa String() para evitar errores por tipo (number vs string).
        if (!encontrado) {
          setError("Servicio no encontrado.");
        } else {
// Si se encuentra, se guarda en el estado servicio.
          setServicio(encontrado);
        }
      })
// Si se encuentra, se guarda en el estado servicio.
      .catch(() => setError("Error cargando el servicio."))
// Desactiva el estado de carga independientemente del resultado.
      .finally(() => setLoading(false));
// El efecto se vuelve a ejecutar si cambia el id de la URL.
  }, [id]);

// Mientras los datos están cargando, se muestra el componente de carga.
  if (loading) return <Loading />;

// Si existe un error, se muestra el mensaje correspondiente.
  if (error) {
    return (
      <div>
        <p>{error}</p>
        <Link to="/">⬅ Volver</Link>
      </div>
    );
  }

  return (
    <div>
      <h2>Detalle del Servicio</h2>

      <p><strong>ID:</strong> {servicio.id}</p>
      <p><strong>Nombre:</strong> {servicio.nombre}</p>
      <p><strong>Descripción:</strong> {servicio.descripcion}</p>

      <Link to="/">⬅ Volver</Link>
    </div>
  );
}

// Permite importar el componente en App.jsx para usarlo como ruta.
export default ServicioDetalle;