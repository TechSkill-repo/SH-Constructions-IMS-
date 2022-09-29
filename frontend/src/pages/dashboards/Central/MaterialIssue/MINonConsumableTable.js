import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MaterialTable from "material-table";
import AddIcon from "@material-ui/icons/Add";
import { Typography } from "@mui/material";
import { Grid } from "@material-ui/core";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import MINonConsumableForm from "./MINonConsumableForm";
import { Box } from "@material-ui/core";
import { getNonConsumbaleAccept } from "../../../../services/issueService";

function MINonConsumableTable() {
  const [showForm, setShowForm] = useState(false);
  const [items, setItems] = useState([]);
  const { storeId } = useParams();
  const category = "non-consumable";

  useEffect(() => {
    getNonConsumbaleAccept(storeId)
      .then((data) => {
        setItems(data.items);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const columns = [
    { title: "Date", field: "date", filterPlaceholder: "filter" },
    {
      title: "Issue Slip.No",
      field: "issue_slip_no",
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
      title: "Approve Qty.",
      field: "quantity_aprv",
      filterPlaceholder: "filter",
    },
    {
      title: "Received Qty.",
      field: "mquantity",
      filterPlaceholder: "filter",
      render: (rowData) => {
        if (rowData.mquantity != rowData.quantity_aprv) return <span style={{ color: "red", fontWeight: "bold" }}>{rowData.mquantity}</span>;
        else return rowData.mquantity;
      }
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
            Non-Consumable Items StoreId:{" "}
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
          {showForm && <MINonConsumableForm storeId={storeId} />}
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
          title="Material Issues for Non-Consumable Item"
          icons={{ Add: () => <AddIcon /> }}
        />
      </Box>
    </>
  );
}

export default MINonConsumableTable;
