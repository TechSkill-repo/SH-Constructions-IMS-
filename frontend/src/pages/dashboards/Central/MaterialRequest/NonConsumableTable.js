import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getMaterial } from "../../../../services/materialService";
import MaterialTable from "material-table";
import GetAppIcon from "@material-ui/icons/GetApp";
import AddIcon from "@material-ui/icons/Add";

function NonConsumableTable() {
  const [items, setItems] = useState([]);
  const { storeId } = useParams();
  const category = "non-consumable";

  useEffect(() => {
    getMaterial(storeId, category).then(data => {
      setItems(data.items);
    }).catch(err => {
      console.log(err);
    });
  }, []);

  const columns = [
    {
      title: "Store ID",
      field: "storeId",
      sorting: false,
      filtering: false,
    },
    { title: "Slip Number", field: "slip_no", filterPlaceholder: "filter" },
    { title: "Material Code", field: "mcode", filterPlaceholder: "filter" },
    { title: "Material Name", field: "mname", filterPlaceholder: "filter" },
    { title: "Material Description", field: "mdescription", filterPlaceholder: "filter" },
    { title: "Date", field: "date", filterPlaceholder: "filter" },
    { title: "U.O.M", field: "uom", filterPlaceholder: "filter" },
    { title: "Category", field: "category", lookup: { consumable: "Consumable", 'non-consumable': "Non-Consumable" } },
    { title: "Quantity Request", field: "quantity_req", filterPlaceholder: "filter" },
    { title: "Incharge Name", field: "incharge_name", filterPlaceholder: "filter" },
    { title: "Site Location", field: "site_location", filterPlaceholder: "filter" },
  ];

  return (
    <>
      <div>Non-Consumable Item {storeId}</div>
      <MaterialTable
        columns={columns}
        data={items}
        editable={{
          onRowAdd: (newRow) =>
            new Promise((resolve, reject) => {
              setItems([...items, newRow]);

              setTimeout(() => resolve(), 500);
            }),
          onRowUpdate: (newRow, oldRow) =>
            new Promise((resolve, reject) => {
              const updatedData = [...items];
              updatedData[oldRow.items.id] = newRow;
              setItems(updatedData);
              setTimeout(() => resolve(), 500);
            }),
          onRowDelete: (selectedRow) =>
            new Promise((resolve, reject) => {
              const updatedData = [...items];
              updatedData.splice(selectedRow.items.id, 1);
              setItems(updatedData);
              setTimeout(() => resolve(), 1000);
            }),
        }}
        actions={[
          {
            icon: () => <GetAppIcon />,
            tooltip: "Click me",
            onClick: (e, data) => console.log(data),
            // isFreeAction:true
          },
        ]}
        onSelectionChange={(selectedRows) => console.log(selectedRows)}
        options={{
          sorting: true,
          search: true,
          searchFieldAlignment: "right",
          searchAutoFocus: true,
          searchFieldVariant: "standard",
          filtering: true,
          paging: true,
          pageSizeOptions: [2, 5, 10, 20, 25, 50, 100],
          pageSize: 5,
          paginationType: "stepped",
          showFirstLastPageButtons: false,
          paginationPosition: "both",
          exportButton: true,
          exportAllData: true,
          exportFileName: "items",
          addRowPosition: "first",
          actionsColumnIndex: -1,
          selection: true,
          showSelectAllCheckbox: false,
          showTextRowsSelected: false,
          selectionProps: (rowData) => ({
            disabled: rowData.age == null,
          }),
          columnsButton: true,
          rowStyle: (data, index) =>
            index % 2 === 0 ? { background: "#f5f5f5" } : null,
          headerStyle: { background: "#233044", color: "#fff" },
        }}
        title="Material Requests"
        icons={{ Add: () => <AddIcon /> }}
      />
    </>
  );
}

export default NonConsumableTable;