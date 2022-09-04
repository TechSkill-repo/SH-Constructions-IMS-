import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getMaterial, putMaterial } from "../../../../services/requestService";
import MaterialTable from "material-table";
import GetAppIcon from "@material-ui/icons/GetApp";
import AddIcon from "@material-ui/icons/Add";
import { Grid, Typography } from "@material-ui/core";
import { issueNonConsumableMaterial } from "../../../../services/issueService";

function NonConsumableTable() {
  const [items, setItems] = useState([]);
  const { storeId } = useParams();
  const category = "non-consumable";

  useEffect(() => {
    getMaterial(storeId, category)
      .then((data) => {
        setItems(data.items);
      })
      .catch((err) => {
        console.log(err);
      });
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
          <Typography variant="h3" gutterBottom>
            Non-Consumable Items StoreId{" "}
            <span style={{ fontWeight: "900", color: "#376fd0" }}>
              {" "}
              {storeId}{" "}
            </span>
          </Typography>
        </Grid>
      </div>
      <MaterialTable
        actions={[
          {
            icon: "checkbox",
            tooltip: "Approve",
            style: { color: "red" },
            onClick: (event, rowData) => {
              if (rowData.quantity_aprv?.length) {
                issueNonConsumableMaterial(rowData)
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
          headerStyle: { background: "#233044", color: "#fff" },
        }}
        title="Material Requests"
        icons={{ Add: () => <AddIcon /> }}
      />
    </>
  );
}

export default NonConsumableTable;
