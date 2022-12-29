import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import AddIcon from "@material-ui/icons/Add";
import { Typography } from "@mui/material";
import { Grid } from "@material-ui/core";
import {
  getConsumableIssue,
  checkIsAccepted,
  acceptConsumableMaterial,
  putIssuedMaterial
} from "../../../../services/issueService";
import Alert from "@mui/material/Alert";


function MaterialConsumableAccept() {
  const [items, setItems] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [message, setMessage] = useState("");
  const [approved, setApproved] = useState(false);

  const user = JSON.parse(window.sessionStorage.getItem("user"));
  const storeId = user.storeId;
  const category = "consumable";

  useEffect(() => {
    getConsumableIssue(storeId)
      .then((data) => {
        setItems(data.items);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const columns = [
    { title: "Slip.No", field: "issue_slip_no", filterPlaceholder: "filter" },
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
      title: "Qty.Accept",
      field: "quantity_acpt",
      filterPlaceholder: "filter",
    },
    
    {
      title: "Status",
      filterPlaceholder: "filter",
      render: (rowData) =>
        rowData.quantity_acpt?.length ? (
          rowData.issued || approved ? (
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
        <Grid item>
          <Typography variant="h5" gutterBottom>
            Consumable Items StoreId:{" "}
            <span style={{ fontWeight: "900", color: "#376fd0" }}>
              {" "}
              {storeId}{" "}
            </span>
          </Typography>
        </Grid>
      </div>
      {showAlert && (
        <Alert severity={`${isValid ? "success" : "error"}`} sx={{ my: 4 }}>
          {message}
        </Alert>
      )}
      <MaterialTable
       localization={{
       
        header: {
            actions: 'Accept'
        },
       
    }}
        actions={[
          {
            icon: "checkbox",
            tooltip: "Approve",
            onClick: async (event, rowData) => {
              let accepted = false;
              await checkIsAccepted(rowData.issue_slip_no).then((data) => {
                accepted = data.accepted;
                setMessage("Material is already accepted.");
                setIsValid(false);
                setShowAlert(accepted);
                setApproved(true);
                setTimeout(() => setShowAlert(false), 2000);
              });
              if (rowData.quantity_acpt?.length && !accepted) {
                acceptConsumableMaterial(rowData)
                  .then((resp) => {
                    setApproved(true)
                    setMessage("Material Accepted Successfully");
                    setShowAlert(true);
                    setIsValid(true);
                    setTimeout(() => setShowAlert(false), 2000);
                    window.location = '/consumable-accept';
                  })
                  .catch((err) => {
                    setMessage(err.response.data.message);
                    setShowAlert(true);
                    setIsValid(false);
                    setTimeout(() => setShowAlert(false), 2000);
                  });
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

                newData.category = "consumable";

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
          pageSize: 10,
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
        title="Material Issued"
        icons={{ Add: () => <AddIcon /> }}
      />
    </>
  );
}

export default MaterialConsumableAccept;