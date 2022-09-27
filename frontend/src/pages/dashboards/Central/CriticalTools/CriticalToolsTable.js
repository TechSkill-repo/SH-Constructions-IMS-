import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import AddIcon from "@material-ui/icons/Add";
import { getCriticalTools } from "../../../../services/criticalTools";

function CriticalToolsTable({ productId }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    getCriticalTools()
      .then((data) => {
        setItems(
          data.criticalTools.filter((item) => item.productId == productId)
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const columns = [
    // { title: "M.Code", field: "mcode", filterPlaceholder: "filter" },
    // { title: "M.Name", field: "mname", filterPlaceholder: "filter" },
    // {
    //   title: "M.Des",
    //   field: "mdescription",
    //   filterPlaceholder: "filter",
    // },
    { title: "Entry Date", field: "entryDate", filterPlaceholder: "filter" },
    // { title: "U.O.M", field: "uom", filterPlaceholder: "filter" },
    { title: "Store Location", field: "storeId", filterPlaceholder: "storeId" },
    { title: "Make", field: "make", filterPlaceholder: "filter" },
    { title: "Serial no.", field: "serialNo", filterPlaceholder: "filter" },
    { title: "Due Date", field: "dueDate", filterPlaceholder: "filter" },
  ];

  return (
    <MaterialTable
      editable={{
        onRowAdd: (newRow) =>
          new Promise((resolve, reject) => {
            setTableData([...tableData, newRow]);

            setTimeout(() => resolve(), 500);
          }),
        onRowUpdate: (newRow, oldRow) =>
          new Promise((resolve, reject) => {
            const updatedData = [...tableData];
            updatedData[oldRow.tableData.id] = newRow;
            setTableData(updatedData);
            setTimeout(() => resolve(), 500);
          }),
        onRowDelete: (selectedRow) =>
          new Promise((resolve, reject) => {
            const updatedData = [...tableData];
            updatedData.splice(selectedRow.tableData.id, 1);
            setTableData(updatedData);
            setTimeout(() => resolve(), 1000);
          }),
      }}
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
      title="Critical Tool"
      icons={{ Add: () => <AddIcon /> }}
    />
  );
}

export default CriticalToolsTable;
