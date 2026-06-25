import Loader from "./Loader";
import EmptyState from "./EmptyState";

const Table = ({
  columns = [],
  data = [],
  loading = false,
  emptyIcon = "📭",
  emptyTitle = "Kayıt bulunamadı",
  emptyText,
  onRowClick,
  rowKey = "id",
}) => {
  if (loading) {
    return <Loader text="Veriler yükleniyor..." />;
  }

  if (!data.length) {
    return (
      <EmptyState icon={emptyIcon} title={emptyTitle} text={emptyText} />
    );
  }

  return (
    <div className="table-wrapper">
      <table className="table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key} style={{ width: col.width }}>
                {col.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr
              key={row[rowKey] ?? index}
              onClick={onRowClick ? () => onRowClick(row) : undefined}
              className={onRowClick ? "table__row--clickable" : ""}
            >
              {columns.map((col) => (
                <td key={col.key}>
                  {col.render
                    ? col.render(row[col.key], row)
                    : row[col.key] ?? "—"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
