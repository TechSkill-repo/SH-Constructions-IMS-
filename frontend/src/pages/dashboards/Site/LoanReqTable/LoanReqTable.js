import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import AddIcon from "@material-ui/icons/Add";
import { Typography } from "@mui/material";
import { Grid } from "@material-ui/core";
import { Box } from "@material-ui/core";
import { getLoans } from "../../../../services/loanService";

function LoanReqTable() {
  const [items, setItems] = useState([]);
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

  const columns = [
    { title: "Date", field: "date", filterPlaceholder: "filter" },
    {
      title: "Store.Location",
      field: "storeId",
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
      title: "Condition",
      field: "condition",
      filterPlaceholder: "filter",
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
            Lone Requests:
            <span style={{ fontWeight: "900", color: "#376fd0" }}>
              {" "}
              {storeId}{" "}
            </span>
          </Typography>
        </Grid>
      </Grid>
      <Grid
        container
        spacing={2}
        alignItems="center"
        style={{ justifyContent: "center" }}
      ></Grid>
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
          title="Lone Requests"
          icons={{ Add: () => <AddIcon /> }}
        />
      </Box>
    </>
  );
}

export default LoanReqTable;
