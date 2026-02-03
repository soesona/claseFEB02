function Modal({ open, title, children, onClose }) {
if (!open) return null;

return (
    <div
    onClick={onClose}
    style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.4)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
    }}
    >
    <div
        onClick={(e) => e.stopPropagation()}
        style={{ background: "white", padding: 15, width: 420 }}
    >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h3>{title}</h3>
          <button onClick={onClose}>X</button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          {children}
        </div>
      </div>
    </div>
  );
}

export default Modal;