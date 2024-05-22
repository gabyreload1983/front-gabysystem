export default function CalendarPicker({ label, value, handleOnChange }) {
  return (
    <div className="d-flex justify-content-between align-items-center p-2 bg-dark text-white rounded">
      <label className="text-uppercase" htmlFor="from">
        {label}
      </label>
      <input
        className="ms-3 p-2 rounded border"
        type="date"
        required
        name={label}
        value={value}
        onChange={handleOnChange}
      />
    </div>
  );
}
