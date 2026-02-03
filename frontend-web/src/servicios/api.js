const BASE_URL = "https://clasefeb02.onrender.com/api/servicios";

export async function getServicios() {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error("Error al cargar servicios");
  return res.json();
}

export async function crearServicio(payload) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const msg = await res.text();
    throw new Error(msg || "Error creando servicio");
  }

  return res.json();
}

export async function actualizarServicio(id, payload) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const msg = await res.text();
    throw new Error(msg || "Error actualizando servicio");
  }

  return res.json();
}