import React, { useMemo, useEffect } from "react";
import { useSelector, useDispatch  } from "react-redux";
import { selectAllProperties, fetchProperties } from "../../slices/appPropertiesSlice";
import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";
import { useNavigate } from "react-router-dom";
import { getColumnDefinitions } from "./config/columnDefinitions.jsx";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "./AppGrid.css";

ModuleRegistry.registerModules([AllCommunityModule]);

export default function AppGrid() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const rowData = useSelector(selectAllProperties);
  const loading = useSelector((state) => state.appProperties.loading);

  useEffect(() => {
    if (!rowData.length) {
      dispatch(fetchProperties());
    }
  }, [dispatch, rowData.length]);

  const colDefs = useMemo(() => getColumnDefinitions(navigate), [navigate]);

  const rowDataMemo = useMemo(() => [...rowData], [rowData]);

  return (
    <div className="ag-theme-alpine" style={{ width: "100%", height: "600px" }}>
      {loading && <p>Loading...</p>}

     <AgGridReact
        theme="legacy"
        rowData={rowDataMemo}
        columnDefs={colDefs}
        pagination={true}
        paginationPageSize={10}  
        overlayNoRowsTemplate="<span class='no-rows'>No rows to show</span>"
      />
    </div>
  );
}