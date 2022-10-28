import React, { useEffect, useState } from "react";
import { getConsumableItem } from "../../../../services/inventoryService";
import MaterialTable from "material-table";
import AddIcon from "@material-ui/icons/Add";

function ConsumablesTable() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    getConsumableItem()
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
      title: "M.Des",
      field: "mdescription",
      filterPlaceholder: "filter",
    },
    // {
    //   title: "Open.Stock",
    //   field: "opening_stock",
    //   filterPlaceholder: "filter",
    // },
    { title: "U.O.M", field: "uom", filterPlaceholder: "filter" },
    // { title: "Date", field: "date", filterPlaceholder: "filter" },
    
    {
      title: "Curr.Stock",
      field: "current_stock",
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
        rowStyle: (data, index) =>
          index % 2 === 0 ? { background: "#f5f5f5" } : null,
        headerStyle: { background: "#376fd0", color: "#fff" },
      }}
      title="Inventory: Consumable Items"
      icons={{ Add: () => <AddIcon /> }}
    />
  );
}

export default ConsumablesTable;
