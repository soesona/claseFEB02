import { useEffect, useState } from "react";

function EditServiceForm({ servicio, onGuardar, loading }) {
const [nombre, setNombre] = useState("");
const [descripcion, setDescripcion] = useState("");
const [msg, setMsg] = useState("");

useEffect(() => {
    if (servicio) {
    setNombre(servicio.nombre || "");
    setDescripcion(servicio.descripcion || "");
    }
}, [servicio]);

const submit = async (e) => {
    e.preventDefault();
    setMsg("");

    if (!nombre.trim() || !descripcion.trim()) {
    setMsg("Nombre y descripción son obligatorios.");
    return;
    }

    const ok = await onGuardar({
    nombre: nombre.trim(),
    descripcion: descripcion.trim(),
    });

    if (!ok) setMsg("No se pudo actualizar (revisá el error).");
};

return (
    <form onSubmit={submit}>
    <input
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        disabled={loading}
        placeholder="Nombre"
/>
<input
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
        disabled={loading}
        placeholder="Descripción"
    />

    <button type="submit" disabled={loading}>
        {loading ? "Actualizando..." : "Guardar cambios"}
    </button>

    {msg && <p>{msg}</p>}
    </form>
);
}

export default EditServiceForm;