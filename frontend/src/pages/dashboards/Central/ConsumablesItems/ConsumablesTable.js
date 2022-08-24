import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMaterial } from "../../../../services/materialService";
import MaterialTable from "material-table";
import AddIcon from "@material-ui/icons/Add";

function ConsumablesTable() {
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
    { title: "M.Code", field: "mcode", filterPlaceholder: "filter" },
    { title: "M.Name", field: "mname", filterPlaceholder: "filter" },
    {
      title: "M.Description",
      field: "mdescription",
      filterPlaceholder: "filter",
    },
    { title: "Opening Stock", field: "openingStock", filterPlaceholder: "filter" },
    { title: "U.O.M", field: "uom", filterPlaceholder: "filter" },
    { title: "Date", field: "date", filterPlaceholder: "filter" },
    { title: "Curr. Stock", field: "currStock", filterPlaceholder: "filter" },
    {
      title: "Total Received",
      field: "totalReceived",
      filterPlaceholder: "filter",
    },
  ];

  return (
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
      title="Material Requests"
      icons={{ Add: () => <AddIcon /> }}
    />
  );
}

export default ConsumablesTable;
