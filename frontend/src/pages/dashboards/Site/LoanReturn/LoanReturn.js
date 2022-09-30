import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import AddIcon from "@material-ui/icons/Add";
import { Typography } from "@mui/material";
import { Grid } from "@material-ui/core";
import { Box } from "@material-ui/core";
import { getLoanReturn, loanReturnApprove } from "../../../../services/loanService";

function LoanReturn() {
  const [items, setItems] = useState([]);
  const user = JSON.parse(window.sessionStorage.getItem("user"));
  const storeId = user.storeId;

  useEffect(() => {
    getLoanReturn(storeId)
      .then((resp) => {
        setItems(resp.items);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, []);

  const columns = [
    { title: "Slip.No", field: "slip_no", filterPlaceholder: "filter" },
    { title: "Date", field: "returnDate", filterPlaceholder: "filter" },
    {
      title: "Store.Location",
      field: "receiverStoreId",
      filterPlaceholder: "filter",
    },
    { title: "M.Name", field: "mname", filterPlaceholder: "filter" },
    { title: "M.Code", field: "mcode", filterPlaceholder: "filter" },
    { title: "U.O.M", field: "uom", filterPlaceholder: "filter" },
    {
      title: "Category",
      field: "category",
      filterPlaceholder: "filter",
    },
    {
      title: "Return Qty",
      field: "lendQuantity",
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
            Lone Returns:
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
          actions={[
            {
              icon: "checkbox",
              tooltip: "Approve",
              onClick: async (event, rowData) => {
                loanReturnApprove(rowData)
                  .then((resp) => {
                    console.log(resp);
                    setTimeout(() => {
                      window.location = '/loan-return';
                    }, 2000);
                  })
                  .catch((err) => console.log(err.response));
              },
              color: "blue",
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
          title="Lone Returns"
          icons={{ Add: () => <AddIcon /> }}
        />
      </Box>
    </>
  );
}

export default LoanReturn;
