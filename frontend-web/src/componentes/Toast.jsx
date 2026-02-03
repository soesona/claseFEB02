function Toast({ type = "info", text = "", onClose }) {
if (!text) return null;

return (
    <div style={{ margin: "10px 0", padding: 10, border: "1px solid #d0d0d0ff" }}>
    <strong>{type.toUpperCase()}:</strong> {text}
    <button onClick={onClose} style={{ marginLeft: 10 }}>
        X
    </button>
    </div>
);
}

export default Toast;