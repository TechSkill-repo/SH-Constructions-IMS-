import React, { useEffect, useState } from "react";
import {
  checkIsReturned,
  getApprovedLoans,
  loanReturn,
} from "../../../../../services/loanService";
import MaterialTable from "material-table";
import AddIcon from "@material-ui/icons/Add";
import { Typography } from "@mui/material";
import { Grid } from "@material-ui/core";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import { Box } from "@material-ui/core";
import LoanApproveForm from "../LoanApproveForm";

function ApprovedLone() {
  const [showForm, setShowForm] = useState(false);
  const [items, setItems] = useState([]);
  const user = JSON.parse(window.sessionStorage.getItem("user"));
  const storeId = user.storeId;

  useEffect(() => {
    getApprovedLoans(storeId, true)
      .then((data) => {
        setItems(data.items);
      })
      .catch((err) => {
        console.log(err);
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
    {
      title: "Date",
      field: "lendDate",
      filterPlaceholder: "filter",
      render: (rowData) => (
        <span
          style={{
            backgroundColor: rowData.returned === true ? "red" : "",
          }}
        >
          {rowData.lendDate}
        </span>
      ),
    },
    {
      title: "Qty",
      field: "lendQuantity",
      filterPlaceholder: "filter",
      render: (rowData) => (
        <span style={{ color: rowData.returned && "red" }}>
          {rowData.lendQuantity}
        </span>
      ),
    },
    {
      title: "Location",
      field: "requestedStoreId",
      filterPlaceholder: "filter",
      render: (rowData) =>
        (rowData.returned && (
          <span style={{ color: "red" }}>{rowData.requestedStoreId}</span>
        )) || (
          <span style={{ color: "green", fontWeight: "600" }}>
            {rowData.requestedStoreId}
          </span>
        ),
    },
    {
      title: "M.Code",
      field: "mcode",
      filterPlaceholder: "filter",
      render: (rowData) => (
        <span style={{ color: rowData.returned && "red" }}>
          {rowData.mcode}
        </span>
      ),
    },
    {
      title: "M.Name",
      field: "mname",
      filterPlaceholder: "filter",
      render: (rowData) => (
        <span style={{ color: rowData.returned && "red" }}>
          {rowData.mname}
        </span>
      ),
    },
    {
      title: "Category",
      field: "category",
      filterPlaceholder: "filter",
      render: (rowData) =>
        (rowData.returned && (
          <span style={{ color: "red" }}>rowData.requestedStoreId</span>
        )) || (
          <span
            style={{
              color: `${rowData.category == "consumable" ? "red" : "green"}`,
              fontWeight: "600",
            }}
          >
            {rowData.category}
          </span>
        ),
    },
    {
      title: "U.O.M",
      field: "uom",
      filterPlaceholder: "filter",
      render: (rowData) => (
        <span style={{ color: rowData.returned && "red" }}>{rowData.uom}</span>
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
            Approved Loan StoreId:{" "}
            <span style={{ fontWeight: "900", color: "#376fd0" }}>
              {" "}
              {storeId}{" "}
            </span>
          </Typography>
        </Grid>
        <Grid item xs={1}>
          <Button
            variant="contained"
            size="medium"
            onClick={() => {
              setShowForm(!showForm);
            }}
          >
            {showForm ? <CloseIcon /> : <AddIcon />}
          </Button>
        </Grid>
      </Grid>
      <Grid
        container
        spacing={2}
        alignItems="center"
        style={{ justifyContent: "center" }}
      >
        <Grid item xs={9} justifyContent="center">
          {showForm && <LoanApproveForm storeId={storeId} />}
        </Grid>
      </Grid>
      <Box component="div" sx={{ mt: 2 }}>
        <MaterialTable
          actions={[
            {
              icon: "checkbox",
              tooltip: "Return",
              onClick: async (event, rowData) => {
                const data = await checkIsReturned(rowData.slip_no);
                rowData.returned = data.returned;
                console.log(data);
                rowData.returnDate = getCurrentDate();

                if (!rowData.returned) {
                  loanReturn(rowData)
                    .then((resp) => console.log(resp))
                    .catch((err) => console.log(err.response));

                  window.location = "/loan-approval";
                }
              },
            },
          ]}
          columns={columns}
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
          title="Approved Lone"
          icons={{ Add: () => <AddIcon /> }}
        />
      </Box>
    </>
  );
}

export default ApprovedLone;
