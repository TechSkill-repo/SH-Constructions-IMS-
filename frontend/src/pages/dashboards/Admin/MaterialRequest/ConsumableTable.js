import React, { useEffect, useState } from "react";
import { getMaterial, putMaterial, issueConsumableMaterial } from "../../../../services/adminService";
import MaterialTable from "material-table";
import AddIcon from "@material-ui/icons/Add";
import { Typography } from "@mui/material";
import { Grid } from "@material-ui/core";

function ConsumableTable() {
  const [items, setItems] = useState([]);
  const category = "consumable";

  useEffect(() => {
    async function fetch() {
      await getMaterial(category)
        .then((data) => {
          setItems(data.items);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    fetch();
  }, []);

  const columns = [
    { title: "Slip.No", field: "slip_no", filterPlaceholder: "filter" },
    { title: "M.Code", field: "mcode", filterPlaceholder: "filter" },
    { title: "M.Name", field: "mname", filterPlaceholder: "filter" },
    {
      title: "M.Description",
      field: "mdescription",
      filterPlaceholder: "filter",
    },
    { title: "Date", field: "date", filterPlaceholder: "filter" },
    { title: "U.O.M", field: "uom", filterPlaceholder: "filter" },
    {
      title: "Qty.Req",
      field: "quantity_req",
      filterPlaceholder: "filter",
    },
    {
      title: "Qty.App",
      field: "quantity_aprv",
      filterPlaceholder: "filter",
    },
    {
      title: "Status",
      filterPlaceholder: "filter",
      render: (rowData) => (
        rowData.quantity_aprv?.length ? (
          <div style={{ width: "100%", textAlign: "center" }}>
            <span style={{ backgroundColor: "#edf7ed", color: "#1e4620", border: "1px solid #1e4620", borderRadius: "10px", padding: "5px 8px" }}>
              Approvable
            </span>
          </div>
        ) : (
          <div style={{ width: "100%", textAlign: "center" }}>
            <span style={{ backgroundColor: "#fdeded", color: "#5f2120", border: "1px solid #5f2120", borderRadius: "10px", padding: "5px 8px" }}>
              Pending
            </span>
          </div>
        )
      ),
    }
  ];

  return (
    <>
      <div>
        <Grid item>
          <Typography variant="h5" gutterBottom>
            Consumable Items
          </Typography>
        </Grid>
      </div>
      <MaterialTable
        actions={[
          {
            icon: "checkbox",
            tooltip: "Approve",
            onClick: (event, rowData) => {
              if (rowData.quantity_aprv?.length) {
                issueConsumableMaterial(rowData)
                  .then((resp) => console.log(resp))
                  .catch((err) => console.log(err.response));
              }
            },
            color: "blue",
          },
        ]}
        columns={columns}
        editable={{
          onRowDelete: (selectedRow) =>
            new Promise((resolve, reject) => {
              const updatedData = [...tableData];
              updatedData.splice(selectedRow.tableData.id, 1);
              setTableData(updatedData);
              setTimeout(() => resolve(), 1000);
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              if (!(oldData.quantity_aprv?.length)) {
                const dataUpdate = [...items];
                const index = oldData.tableData.id;
                dataUpdate[index] = newData;
                setItems([...dataUpdate]);

                newData.category = "consumable";

                putMaterial(newData)
                  .then((resp) => console.log(resp))
                  .catch((err) => console.log(err.response));

                resolve();
              }
              else {
                reject();
              }
            }),
        }}
        data={items}
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
          showSelectAllCheckbox: false,
          showTextRowsSelected: false,
          selectionProps: (rowData) => ({
            disabled: rowData.age == null,
          }),
          columnsButton: true,
          rowStyle: (data, index) =>
            index % 2 === 0 ? { background: "#f5f5f5" } : null,
          headerStyle: { background: "#376fd0", color: "#fff" },
        }}
        title="Material Requests"
        icons={{ Add: () => <AddIcon /> }}
      />
    </>
  );
}

export default ConsumableTable;
