import React, { useState } from "react";
import MaterialTable from "material-table";
import { Typography } from "@mui/material";

function UserInfo() {
  const columns = [
    { title: "Shop Name", field: "shop" },
    { title: "Shop ID", field: "shopId" },
    { title: "Shop Head", field: "name" },
    { title: "Email", field: "email" },
    { title: "Password", field: "Password" },
  ];

  const items = [
    {
      shop: "RMM",
      shopId: "E22",
      name: "Anurag",
      email: "rmm@shc.com",
      password: "1234567890",
    },
    {
      shop: "RMBB",
      shopId: "E13",
      name: "Ramesh Sharma",
      email: "rmbb@shc.com",
      password: "1234567890",
    },
    {
      shop: "Coke Plant",
      shopId: "EC01",
      name: "Muzaffar Iqbal",
      email: "rmbb@shc.com",
      password: "1234567890",
    },
    {
      shop: "RMBB2",
      shopId: "E17",
      name: "Love Gope",
      email: "rmbb@shc.com",
      password: "1234567890",
    },
    {
      shop: "GBF",
      shopId: "E27",
      name: "RK Srivastava",
      email: "gbf@shc.com",
      password: "1234567890",
    },
    {
      shop: "SP#3,4",
      shopId: "E15",
      name: "Manoj Mishra",
      email: "rmbb@shc.com",
      password: "1234567890",
    },
    {
      shop: "SP#1,2",
      shopId: "E23",
      name: "Chandan Shing",
      email: "rmbb@shc.com",
      password: "1234567890",
    },
    {
      shop: "MM",
      shopId: "E24",
      name: "Hashim Khan",
      email: "mm@shc.com",
      password: "1234567890",
    },
    {
      shop: "LD#1",
      shopId: "E20",
      name: "Prabhat Shing",
      email: "ld#1@shc.com",
      password: "1234567890",
    },
    {
      shop: "PP",
      shopId: "E30",
      name: "Bablu Pandey",
      email: "pp@shc.com",
      password: "1234567890",
    },
    {
      shop: "MRSPP",
      shopId: "E28",
      name: "Santosh Panday",
      email: "mrspp#1@shc.com",
      password: "1234567890",
    },
    {
      shop: "LIME PLNT",
      shopId: "I11",
      name: "Intiyaz Ahmed Khan",
      email: "linePlant#1@shc.com",
      password: "1234567890",
    },
  ];
  return (
    <>
      <Typography variant="h5" gutterBottom>
        All Stores Users Information
      </Typography>
      <MaterialTable
        columns={columns}
        data={items}
        options={{
          sorting: true,
          search: true,
          searchFieldAlignment: "right",
          searchAutoFocus: true,
          searchFieldVariant: "standard",

          paging: true,
          pageSizeOptions: [5, 10, 20, 25, 50, 100],
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
        title="Users Information"
        icons={{ Add: () => <AddIcon /> }}
      />
    </>
  );
}

export default UserInfo;
