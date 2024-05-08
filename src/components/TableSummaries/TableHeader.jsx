export default function TableHeader({ columns }) {
  return (
    <thead>
      <tr>
        {columns.map((col) => (
          <th key={col.name} className="text-uppercase">
            {col.name}
          </th>
        ))}
      </tr>
    </thead>
  );
}
