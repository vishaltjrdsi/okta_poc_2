import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { selectAllProperties } from "../../slices/appPropertiesSlice";
import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";
import { useNavigate } from "react-router-dom";
import { getColumnDefinitions } from "./config/columnDefinitions.jsx";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "./AppGrid.css";

ModuleRegistry.registerModules([AllCommunityModule]);

export default function AppGrid() {
  const navigate = useNavigate();
  const rowData = useSelector(selectAllProperties) || [];

  const colDefs = useMemo(() => getColumnDefinitions(navigate), [navigate]);

  return (
    <div className="ag-theme-alpine" style={{ width: "100%", height: "600px" }}>
      <AgGridReact
        theme="legacy"
        rowData={rowData}
        columnDefs={colDefs}
        pagination={true}
        paginationPageSize={10}  
        overlayNoRowsTemplate="<span class='no-rows'>No rows to show</span>"
      />
      
    </div>
  );
}