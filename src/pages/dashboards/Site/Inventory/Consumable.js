import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import AddIcon from "@material-ui/icons/Add";
import { Typography } from "@mui/material";
import { Grid } from "@material-ui/core";
import { Box } from "@material-ui/core";
import { getMaterials } from "../../../../services/storeService";

function Consumable() {
  const [items, setItems] = useState([]);
  const user = JSON.parse(window.sessionStorage.getItem("user"));
  const storeId = user.storeId;

  useEffect(() => {
    getMaterials(storeId)
      .then((data) => {
        const temp = data.items.filter(
          (item) => item.category === "consumable"
        );
        setItems(temp);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const columns = [
    { title: "Date", field: "date", filterPlaceholder: "filter" },
    {
      title: "M.code",
      field: "mcode",
      filterPlaceholder: "filter",
    },
    { title: "M.Name", field: "mname", filterPlaceholder: "filter" },
    {
      title: "M.Description",
      field: "mdescription",
      filterPlaceholder: "filter",
    },
    { title: "U.O.M", field: "uom", filterPlaceholder: "filter" },
    {
      title: "Curr.Stock",
      field: "mquantity",
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
            Consumable Items StoreId:{" "}
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
          title="Store Consumable Inventory"
          icons={{ Add: () => <AddIcon /> }}
        />
      </Box>
    </>
  );
}

export default Consumable;
