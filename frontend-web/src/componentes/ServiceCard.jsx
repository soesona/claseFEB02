
function ServiceCard({ servicio, onEdit }) {
  return (
    <div className="service-card">
      <h3>{servicio.nombre}</h3>
      <p>{servicio.descripcion}</p>
      <button onClick={()=> onEdit(servicio)}>Editar</button>
    </div>
  );
}
export default ServiceCard;
