import React, { useEffect, useState } from "react";
import {
  getAcceptedMaterial
} from "../../../../services/adminService";
import MaterialTable from "material-table";
import AddIcon from "@material-ui/icons/Add";
import { Typography } from "@mui/material";
import { Grid } from "@material-ui/core";


function MaterialAccepted() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function fetch() {
      await getAcceptedMaterial()
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
  ];

  return (
    <>
      <div>
        <Grid item>
          <Typography variant="h5" gutterBottom>
            Consumable Items
          </Typography>
        </Grid>
      </div>
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
        title="Material Accepted"
        icons={{ Add: () => <AddIcon /> }}
      />
    </>
  );
}

export default MaterialAccepted;