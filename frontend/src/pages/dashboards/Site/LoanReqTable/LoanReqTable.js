import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import AddIcon from "@material-ui/icons/Add";
import { Alert, Typography } from "@mui/material";
import { Grid } from "@material-ui/core";
import { Box } from "@material-ui/core";
import {
  getLoans,
  lendMaterial,
  putMaterial,
} from "../../../../services/loanService";
import { FormField } from "../../../auth/Login.style";

function LoanReqTable() {
  const [items, setItems] = useState([]);
  const [loneApproved, setLoneApproved] = useState(false);
  const [loneDenied, setLoneDenied] = useState(false);

  const user = JSON.parse(window.sessionStorage.getItem("user"));
  const storeId = user.storeId;

  useEffect(() => {
    getLoans(storeId)
      .then((resp) => {
        setItems(resp.items);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, []);

  function getCurrentDate() {
    let newDate = new Date();
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();

    return `${date}/${month < 10 ? `0${month}` : `${month}`}/${year}`;
  }

  const columns = [
    // { title: "Slip.No", field: "slip_no", filterPlaceholder: "filter" },
    // { title: "Date", field: "rqDate", filterPlaceholder: "filter" },
    {
      title: "Store.Location",
      field: "receiverStoreId",
      filterPlaceholder: "filter",
    },
    { title: "M.Name", field: "mname", filterPlaceholder: "filter" },
    { title: "M.Code", field: "mcode", filterPlaceholder: "filter" },
    {
      title: "M.Des",
      field: "mdescription",
      filterPlaceholder: "filter",
    },
    { title: "U.O.M", field: "uom", filterPlaceholder: "filter" },
    {
      title: "Qty.Req",
      field: "mquantity",
      filterPlaceholder: "filter",
    },
    {
      title: "Category",
      field: "category",
      filterPlaceholder: "filter",
    },
    {
      title: "Qty.App",
      field: "lendQuantity",
      filterPlaceholder: "filter",
    },
    {
      title: "Status",
      filterPlaceholder: "filter",
      render: (rowData) =>
        rowData.lendQuantity?.length ? (
          rowData.issued ? (
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
  ];

  return (
    <>
      <Grid
        container
        spacing={2}
        alignItems="center"
        style={{ marginBottom: "0.8em" }}
      >
        <Grid item xs={11}>
          <Typography variant="h5" gutterBottom>
            Loan Requests:
            <span style={{ fontWeight: "900", color: "#376fd0" }}>
              {" "}
              {storeId}{" "}
            </span>
          </Typography>
        </Grid>
      </Grid>
      {loneDenied && (
        <FormField style={{ marginBottom: "1.3em" }}>
          <Alert severity="error">Loan Denied! 😕</Alert>
        </FormField>
      )}
      {loneApproved && (
        <FormField style={{ marginBottom: "1.3em" }}>
          <Alert severity="success">Loan Request success! </Alert>
        </FormField>
      )}
      <Grid
        container
        spacing={2}
        alignItems="center"
        style={{ justifyContent: "center" }}
      ></Grid>
      <Box component="div" sx={{ mt: 2 }}>
        <MaterialTable
          actions={[
            {
              icon: "checkbox",
              tooltip: "Approve",
              onClick: async (event, rowData) => {
                let issued = rowData.issued;

                if (rowData.lendQuantity?.length && !issued) {
                  rowData.lendDate = getCurrentDate();
                  rowData.returnCondition = "";
                  rowData.condition = "";
                  rowData.returnDate = "";

                  lendMaterial(rowData)
                    .then((resp) => {
                      console.log(resp);
                      setLoneApproved(true);
                      setTimeout(() => setLoneApproved(false), 2000);
                      window.location = '/loan-request-table';
                    })
                    .catch((err) => {
                      console.log(err.response);
                      if (err.response?.status === 403) {
                        setLoneDenied(true);
                        setTimeout(() => setLoneDenied(false), 2000);
                      }
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
                if (!oldData.lendQuantity?.length) {
                  const dataUpdate = [...items];
                  const index = oldData.tableData.id;
                  dataUpdate[index] = newData;
                  setItems([...dataUpdate]);

                  newData.lendDate = getCurrentDate();
                  newData.returnCondition = "";
                  newData.condition = "";
                  newData.returnDate = "";

                  putMaterial(newData)
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
            headerStyle: { background: "#376fd0", color: "#fff" },
          }}
          title="Loan Requests"
          icons={{ Add: () => <AddIcon /> }}
        />
      </Box>
    </>
  );
}

export default LoanReqTable;
