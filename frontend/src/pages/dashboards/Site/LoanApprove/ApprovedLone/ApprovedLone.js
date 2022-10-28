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
import { socket } from "../../../../../services/socketService";

function ApprovedLone() {
  const [showForm, setShowForm] = useState(false);
  const [items, setItems] = useState([]);
  const user = JSON.parse(window.sessionStorage.getItem("user"));
  const storeId = user.storeId;

  useEffect(() => {
    getApprovedLoans(storeId, true)
      .then((data) => {
        let temp = data.items;

        temp.map(async item => {
          const data = await checkIsReturned(item.slip_no);
          item.returned = data.returned;
          // console.log(item);
          return item;
        });

        setItems(temp);
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
    },
    {
      title: "Qty",
      field: "lendQuantity",
      filterPlaceholder: "filter",
    },
    {
      title: "Location",
      field: "requestedStoreId",
      filterPlaceholder: "filter",
      render: (rowData) =>
      (
        <span style={{ color: "green", fontWeight: "600" }}>
          {rowData.requestedStoreId}
        </span>
      ),
    },
    {
      title: "M.Code",
      field: "mcode",
      filterPlaceholder: "filter",
    },
    {
      title: "M.Name",
      field: "mname",
      filterPlaceholder: "filter",
    },
    {
      title: "Category",
      field: "category",
      filterPlaceholder: "filter",
      render: (rowData) =>
      (<span
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
         localization={{
       
          header: {
              actions: 'Approve'
          },
         
      }}
          actions={[
            {
              icon: "checkbox",
              tooltip: "Return",
              onClick: async (event, rowData) => {
                rowData.returnDate = getCurrentDate();

                if (!rowData.returned) {
                  loanReturn(rowData)
                    .then((resp) => {
                      console.log(resp);

                      socket.emit('clientSiteLoanReturn', user.storeId);

                      setTimeout(() => {
                        window.location = '/loan-approval'
                      }, 2000);
                    })
                    .catch((err) => console.log(err.response));
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
            rowStyle: (data, index) => {
              console.log(data);
              return { background: index % 2 === 0 ? "#f5f5f5" : "", color: data.returned === true ? "red" : "black" }
            },
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
