import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMaterial, putMaterial } from "../../../../services/materialService";
import MaterialTable from "material-table";
import AddIcon from "@material-ui/icons/Add";
import { Typography } from "@mui/material";
import { Grid, IconButton } from "@material-ui/core";
import { Save, Delete } from "@material-ui/icons";
import { issueConsumableMaterial } from "../../../../services/issueService";

function ConsumableTable() {
  const [items, setItems] = useState([]);
  const { storeId } = useParams();
  const category = "consumable";

  useEffect(() => {
    getMaterial(storeId, category)
      .then((data) => {
        setItems(data.items);
      })
      .catch((err) => {
        console.log(err);
      });
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
      title: "Approval Qty.",
      field: "quantity_aprv",
      filterPlaceholder: "filter",
    }
  ];

  return (
    <>
      <div>
        <Grid item>
          <Typography variant="h5" gutterBottom>
            Consumable Items StoreId:{" "}
            <span style={{ fontWeight: "900", color: "#376fd0" }}>
              {" "}
              {storeId}{" "}
            </span>
          </Typography>
        </Grid>
      </div>
      <MaterialTable
        actions={[
          {
            icon: "checkbox",
            tooltip: "Approve",
            onClick: (event, rowData) => {
              issueConsumableMaterial(rowData)
                .then(resp => console.log(resp))
                .catch(err => console.log(err.response));
            },
            color: "blue",
          }
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
              const dataUpdate = [...items];
              const index = oldData.tableData.id;
              dataUpdate[index] = newData;
              setItems([...dataUpdate]);

              newData.category = "consumable";

              putMaterial(newData)
                .then(resp => console.log(resp))
                .catch(err => console.log(err.response));

              resolve();
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
        title="Material Requests"
        icons={{ Add: () => <AddIcon /> }}
      />
    </>
  );
}

export default ConsumableTable;
