import { Link } from "react-router-dom";

function ServiceCard({ servicio, onEdit }) {
  return (
    <div style={{ border: "1px solid #ccc", padding: 10, margin: "10px 0" }}>
      <h3>{servicio.nombre}</h3>
      <p>{servicio.descripcion}</p>

      <Link to={`/servicios/${servicio.id}`}>Ver detalle</Link>

      {onEdit && (
        <button onClick={() => onEdit(servicio)} style={{ marginLeft: 10 }}>
          Editar
        </button>
      )}
    </div>
  );
}

export default ServiceCard;