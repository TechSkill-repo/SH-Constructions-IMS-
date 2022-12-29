import React, { useEffect, useState } from "react";
import { getApprovedLoans } from "../../../../services/loanService";
import MaterialTable from "material-table";
import AddIcon from "@material-ui/icons/Add";
import { Typography } from "@mui/material";
import { Grid } from "@material-ui/core";
import { Box } from "@material-ui/core";

function MonitorLone() {
  const [items, setItems] = useState([]);
  const user = JSON.parse(window.sessionStorage.getItem("user"));

  useEffect(() => {
    getApprovedLoans()
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
    { title: "Date", field: "lendDate", filterPlaceholder: "filter" },
    { title: "Qty", field: "lendQuantity", filterPlaceholder: "filter" },
    {
      title: "Lender",
      field: "requestedStoreId",
      filterPlaceholder: "filter",
      render: (rowData) => (
        <span style={{ color: "green", fontWeight: "600" }}>
          {rowData.requestedStoreId}
        </span>
      ),
    },
    {
      title: "Receiver",
      field: "receiverStoreId",
      filterPlaceholder: "filter",
      render: (rowData) => (
        <span style={{ color: "green", fontWeight: "600" }}>
          {rowData.receiverStoreId}
        </span>
      ),
    },
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
    // { title: "Condition", field: "condition", filterPlaceholder: "filter" },
    // { title: "Rtrn Date", field: "returnDate", filterPlaceholder: "filter" },
    // { title: "Rtrn Cond", field: "returnCondition", filterPlaceholder: "filter" },
  ];

  return <>
    <Grid
      container
      spacing={2}
      alignItems="center"
      style={{ marginBottom: "0.8em" }}
    >
      <Grid item xs={11}>
        <Typography variant="h5" gutterBottom>
          Material Lone
          <span style={{ fontWeight: "900", color: "#376fd0" }}></span>
        </Typography>
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
        title="Approved Lones"
        icons={{ Add: () => <AddIcon /> }}
      />
    </Box>
  </>;
}

export default MonitorLone;
