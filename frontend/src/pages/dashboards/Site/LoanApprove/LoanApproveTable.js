import React, { useEffect, useState } from "react";
import { getApprovedLoans } from "../../../../services/loanService";
import MaterialTable from "material-table";
import AddIcon from "@material-ui/icons/Add";
import { Typography } from "@mui/material";
import { Grid } from "@material-ui/core";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import LoanApproveForm from "./LoanApproveForm";
import { Box } from "@material-ui/core";

function LoanApproveTable() {
  const [showForm, setShowForm] = useState(false);
  const [items, setItems] = useState([]);
  const user = JSON.parse(window.sessionStorage.getItem("user"));
  const storeId = user.storeId;

  useEffect(() => {
    getApprovedLoans(storeId)
      .then((data) => {
        setItems(data.items);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const columns = [
    { title: "Date", field: "lendDate", filterPlaceholder: "filter" },
    { title: "Qty", field: "lendQuantity", filterPlaceholder: "filter" },
    {
      title: "Location",
      field: "receiverStoreId",
      filterPlaceholder: "filter",
      render: (rowData) => (
        <span style={{ color: "green", fontWeight: "600" }}>
          {rowData.storeId}
        </span>
      ),
    },
    { title: "R.Date", field: "returnDate", filterPlaceholder: "filter" },
    // {
    //   title: "Rtrn Cond",
    //   field: "returnCondition",
    //   filterPlaceholder: "filter",
    // },
    { title: "M.Code", field: "mcode", filterPlaceholder: "filter" },
    { title: "M.Name", field: "mname", filterPlaceholder: "filter" },
    {
      title: "Category",
      field: "category",
      filterPlaceholder: "filter",
      render: (rowData) => (
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
    { title: "U.O.M", field: "uom", filterPlaceholder: "filter" },
    { title: "Condition", field: "condition", filterPlaceholder: "filter" },
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
          title="Material Issue"
          icons={{ Add: () => <AddIcon /> }}
        />
      </Box>
    </>
  );
}

export default LoanApproveTable;
