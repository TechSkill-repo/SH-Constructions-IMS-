import React, { useState, useEffect } from "react";
import {
  getIssuedMaterial,
  putIssuedMaterial,
  acceptNonConsumableMaterial,
  checkIsAccepted,
} from "../../../../services/adminService";
import MaterialTable from "material-table";
import AddIcon from "@material-ui/icons/Add";
import Alert from "@mui/material/Alert";
import { Grid, Typography } from "@material-ui/core";

function AcceptNonConsumableTable() {
  const [items, setItems] = useState([]);
  const category = "non-consumable";
  const [showSuccess, setShowSuccess] = useState(false);
  const [approved, setApproved] = useState(false);



  useEffect(() => {
    async function fetch() {
      await getIssuedMaterial(category)
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
      title: "Qty.Accepted",
      field: "quantity_acpt",
      filterPlaceholder: "filter",
    },

    {
      title: "Status",
      filterPlaceholder: "filter",
      render: (rowData) =>
        rowData.quantity_acpt?.length ? (
          approved ? (
            <div style={{ width: "100%", textAlign: "center" }}>
              <span
                style={{
                  backgroundColor: "rgba(76,175,80,0.1)",
                  color: "#4caf50",
                  fontWeight: "bold",
                  border: "",
                  borderRadius: "3px",
                  padding: "5px 8px",
                }}
              >
                Approved
              </span>
            </div>
          ) : (
            <div style={{ width: "100%", textAlign: "center" }}>
              <span
                style={{
                  backgroundColor: "rgb(255, 244, 229)",
                  color: "rgb(102, 60, 0)",
                  fontWeight: "bold",
                  border: "",
                  borderRadius: "3px",
                  padding: "5px 8px",
                }}
              >
                Edited
              </span>
            </div>
          )
        ) : (
          <div style={{ width: "100%", textAlign: "center" }}>
            <span
              style={{
                backgroundColor: "rgba(244,67,54,0.1)",
                color: "#f44336",
                fontWeight: "bold",
                border: "",
                borderRadius: "3px",
                padding: "5px 8px",
              }}
            >
              Pending
            </span>
          </div>
        ),
    },
    // {
    //   title: "Status",
    //   filterPlaceholder: "filter",
    //   render: (rowData) =>
    //     rowData.quantity_aprv?.length ? (
    //       <div style={{ width: "100%", textAlign: "center" }}>
    //         <span
    //           style={{
    //             backgroundColor: "rgba(76,175,80,0.1)",
    //             color: "#4caf50",
    //             fontWeight: "bold",
    //             border: "",
    //             borderRadius: "3px",
    //             padding: "5px 8px",
    //           }}
    //         >
    //           Approved
    //         </span>
    //       </div>
    //     ) : (
    //       <div style={{ width: "100%", textAlign: "center" }}>
    //         <span
    //           style={{
    //             backgroundColor: "rgba(244,67,54,0.1)",
    //             color: "#f44336",
    //             fontWeight: "bold",
    //             border: "",
    //             borderRadius: "3px",
    //             padding: "5px 8px",
    //           }}
    //         >
    //           Pending
    //         </span>
    //       </div>
    //     ),
    // },
  ];

  return (
    <>
      <div>
      {showSuccess && (
        <Alert severity="success" sx={{ my: 3 }}>
          This is a success alert — check it out!
        </Alert>
      )}
        <Grid item>
          <Typography variant="h3" gutterBottom>
            Non-Consumable Items
          </Typography>
        </Grid>
      </div>
      <MaterialTable
        actions={[
          {
            icon: "checkbox",
            tooltip: "Accept",
            style: { color: "red" },
            onClick: async (event, rowData) => {
              const data = await checkIsAccepted(rowData.slip_no);
              console.log(data);
             
              if (rowData.quantity_acpt?.length && !data.accepted) {
                acceptNonConsumableMaterial(rowData)
                  .then((resp) => {
                    setApproved(true)
                    setShowSuccess(true);
                    console.log(resp);
                    window.location = '/accept-non-consumables';
                  })
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
              if (!oldData.quantity_acpt?.length) {
                const dataUpdate = [...items];
                const index = oldData.tableData.id;
                dataUpdate[index] = newData;
                setItems([...dataUpdate]);

                newData.category = "non-consumable";

                putIssuedMaterial(newData)
                  .then((resp) => console.log(resp))
                  .catch((err) => console.log(err.response));

                resolve();
              } else {
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

export default AcceptNonConsumableTable;
