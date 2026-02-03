
function SearchBox({ value, onChange }) {
  return (
    <input
      type="text"
      placeholder="Buscar servicio..."
      value={value}
      onChange={e => onChange(e.target.value)}
    />
  );
}
export default SearchBox;
