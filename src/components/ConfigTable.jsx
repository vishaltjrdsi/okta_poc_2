import React, { useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

// ✅ REQUIRED (fixes your error)
ModuleRegistry.registerModules([AllCommunityModule]);

const ConfigTable = ({ data = [] }) => {
  const columnDefs = useMemo(
    () => [
      { headerName: "ID", field: "id" },
      { headerName: "Title", field: "title", flex: 1 },
      { headerName: "Body", field: "body", flex: 2 },
      {
        headerName: "Status",
        field: "status",
        cellRenderer: (params) => (
          <input type="checkbox" checked={params.value} readOnly />
        ),
      },
      {
        headerName: "Edit",
        cellRenderer: (params) => (
          <button onClick={() => alert(`Edit ${params.data.id}`)}>
            Edit
          </button>
        ),
      },
    ],
    []
  );

  return (
    <div
      className="ag-theme-alpine"
      style={{ height: 400, width: "100%" }}
    >
      <AgGridReact
        rowData={data}
        columnDefs={columnDefs}
        pagination={true}
        paginationPageSize={5}
        theme="legacy" 
      />
    </div>
  );
};

export default ConfigTable;