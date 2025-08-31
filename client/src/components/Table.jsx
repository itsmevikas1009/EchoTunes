import React from "react";

const Table = ({ rows, columns, heading }) => {
  return (
    <div className="h-[90vh] p-4">
      <div className="bg-[#1a1a1a] h-full rounded-lg shadow-lg overflow-hidden">
        <h2 className="text-2xl font-bold text-center text-white uppercase py-6">
          {heading}
        </h2>
        <div className="relative h-[calc(100%-100px)]">
          <table className="relative w-full text-white border-collapse">
            <thead className="bg-[#1F2739] sticky top-0 z-10 table w-full table-fixed">
              <tr>
                {columns.map((column) => (
                  <th
                    key={column.field}
                    className="p-4 text-left font-semibold"
                    style={{
                      width: column.field === 'id' ? '15%' :
                        column.field === 'name' ? '25%' :
                          column.field === 'avatar' ? '15%' :
                            column.field === 'artist' ? '35%' : '10%'
                    }}
                  >
                    {column.headerName}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="block overflow-y-auto h-[calc(100vh-300px)] divide-y divide-gray-700">
              {rows.map((row) => (
                <tr
                  key={row.id}
                  className="table w-full table-fixed hover:bg-[#2c3344] transition-colors duration-150"
                >
                  {columns.map((column) => (
                    <td
                      key={`${row.id}-${column.field}`}
                      className="p-4"
                      style={{
                        width: column.field === 'id' ? '15%' :
                          column.field === 'name' ? '25%' :
                            column.field === 'avatar' ? '15%' :
                              column.field === 'artist' ? '35%' : '10%'
                      }}
                    >
                      <div className="w-full overflow-hidden">
                        {column.renderCell ? (
                          column.renderCell({ row })
                        ) : (
                          <span className="truncate block" title={row[column.field]}>
                            {row[column.field]}
                          </span>
                        )}
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <style jsx>{`
        tbody::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        tbody::-webkit-scrollbar-track {
          background: #1a1a1a;
        }
        tbody::-webkit-scrollbar-thumb {
          background-color: #888;
          border-radius: 4px;
        }
        tbody::-webkit-scrollbar-thumb:hover {
          background-color: #555;
        }
        tbody tr {
          display: table;
          width: 100%;
          table-layout: fixed;
        }
      `}</style>
    </div>
  );
};

export default Table;
