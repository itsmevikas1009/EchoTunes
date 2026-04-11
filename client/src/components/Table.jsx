import { useEffect, useMemo, useState } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";

const Table = ({ rows, columns, heading, pageSize = 6 }) => {
  const [page, setPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(rows.length / pageSize));

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  const paginatedRows = useMemo(() => {
    const startIndex = (page - 1) * pageSize;
    return rows.slice(startIndex, startIndex + pageSize).map((row, index) => ({
      ...row,
      serial: startIndex + index + 1,
    }));
  }, [page, pageSize, rows]);

  const columnWidth = (field) => {
    if (field === "serial") return "8%";
    if (field === "name") return "25%";
    if (field === "avatar") return "14%";
    if (field === "artist") return "19%";
    if (field === "song") return "18%";
    return "16%";
  };

  return (
    <div className="glass-panel rounded-[34px] p-5 md:p-6">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Admin Catalog</p>
          <h2 className="hero-title mt-3 text-3xl font-bold text-white">{heading}</h2>
        </div>
        <div className="text-sm text-white/50">
          Showing {(page - 1) * pageSize + 1}-{Math.min(page * pageSize, rows.length)} of{" "}
          {rows.length}
        </div>
      </div>

      <div className="overflow-hidden rounded-[28px] border border-white/8 bg-black/15">
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse text-left text-white">
            <thead className="bg-white/8 text-sm uppercase tracking-[0.18em] text-white/55">
              <tr>
                {columns.map((column) => (
                  <th
                    key={column.field}
                    className="p-4 font-semibold"
                    style={{ width: columnWidth(column.field) }}
                  >
                    {column.headerName}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {paginatedRows.map((row) => (
                <tr
                  key={row.id}
                  className="border-t border-white/6 transition hover:bg-white/6"
                >
                  {columns.map((column) => (
                    <td
                      key={`${row.id}-${column.field}`}
                      className="p-4 align-middle"
                      style={{ width: columnWidth(column.field) }}
                    >
                      <div className="w-full overflow-hidden">
                        {column.renderCell ? (
                          column.renderCell({ row })
                        ) : (
                          <span className="block truncate" title={row[column.field]}>
                            {row[column.field]}
                          </span>
                        )}
                      </div>
                    </td>
                  ))}
                </tr>
              ))}

              {paginatedRows.length === 0 && (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="px-6 py-14 text-center text-white/50"
                  >
                    No songs found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-white/45">Page {page} of {totalPages}</p>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPage((current) => Math.max(1, current - 1))}
            disabled={page === 1}
            className="muted-button inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-40"
            type="button"
          >
            <HiChevronLeft size={18} />
            Previous
          </button>
          <button
            onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
            disabled={page === totalPages}
            className="accent-button inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold transition disabled:cursor-not-allowed disabled:opacity-40"
            type="button"
          >
            Next
            <HiChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Table;
