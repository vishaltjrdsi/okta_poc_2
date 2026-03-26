import StatusCell from "../components/StatusCell";
import ActionCell from "../components/ActionCell";

export const getColumnDefinitions = (navigate) => [
  { field: "key", headerName: "Key", flex: 1 },
  { field: "type", headerName: "Type", flex: 1 },
  { field: "value", headerName: "Value", flex: 1 },
  { field: "defaultValue", headerName: "Default Value", flex: 1 },
  { field: "groupName", headerName: "Group Name", flex: 1 },
  { field: "description", headerName: "Description", flex: 2 },
  {
    headerName: "Status",
    field: "status",
    colId: "status",
    flex: 1,
    cellRenderer: (params) => <StatusCell data={params.data} />,
  },
  {
    headerName: "Actions",
    colId: "Actions",
    width: 120,
    cellRenderer: (params) => <ActionCell data={params.data} navigate={navigate} />,
  },
];
