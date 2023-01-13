import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import AddIcon from "@material-ui/icons/Add";
import { Autocomplete, Typography } from "@mui/material";
import { Grid, Select } from "@material-ui/core";
import { Box } from "@material-ui/core";
import { getMaterials } from "../../../../services/storeService";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { addSiteConsumable, getMcodes, fetchDetails } from "../../../../services/materialService";

function ConsumablesForm() {
  const user = JSON.parse(window.sessionStorage.getItem("user"));

  const storeId = user.storeId;
  const [mcode, setMcode] = useState("");
  const [mname, setMname] = useState("");
  const [mdescription, setMdescription] = useState("");
  const [date, setDate] = useState(getCurrentDate());
  const [uom, setUom] = useState("");
  const [category, setCategory] = useState("");
  const [quantity_req, setQuantity_req] = useState("");

  const [mcodes, setMcodes] = useState([]);

  useEffect(() => {
    async function fetch() {
      await getMcodes()
        .then((data) => setMcodes(data.codes))
        .catch((err) => console.log(err));
    }
    fetch();
  }, []);

  function getCurrentDate() {
    let newDate = new Date();
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();

    return `${date}/${month < 10 ? `0${month}` : `${month}`}/${year}`;
  }

  const handleInputChange = async (event) => {
    setMcode(event.target.value);

    try {
      const data = await fetchDetails(event.target.value);

      const { mname, mdescription, uom, category } = data.item;
      setMname(mname);
      setMdescription(mdescription);
      setUom(uom);
      setCategory(category);
    } catch (err) {
      console.log(err);
    }
  }

  const handleSubmit = () => {
    addSiteConsumable({ mcode, mname, mdescription, uom, category, storeId, date, mquantity: quantity_req })
      .then((resp) => {
        console.log(resp);
      })
      .catch((err) => {
        console.log(err);
      });

    setTimeout(() => {
      window.navigation.navigate(window.location.href);
    }, 3000);
  };

  return (
    <div>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "100%" },
          "&.MuiBox-root": { background: "#fff", p: 3, borderRadius: 3 },
        }}
        noValidate
        autoComplete="off"
        // onSubmit={handleSubmit}
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="h3">Add form</Typography>
        <Grid
          container
          spacing={2}
          alignItems="center"
          justifyContent="center"
        >
          <Grid item xs={12} md={5}>
            <Select
              style={{ width: "300px" }}
              name="mcode"
              value={mcode}
              onChange={(e) => {
                handleInputChange(e)
              }}
            >
              {mcodes.map(mc => <option value={mc}>{mc}</option>)}
            </Select>
          </Grid>
          <Grid item xs={12} md={5}>
            <TextField
              variant="outlined"
              name="quantity_req"
              label="Quantity Request"
              type="text"
              value={quantity_req}
              onChange={(e) =>
                setQuantity_req(e.target.value)
              }
            />
          </Grid>
        </Grid>
        <Grid
          container
          justifyContent="center"
          style={{ margin: "2em auto 0" }}
        >
          <Button
            variant="contained"
            color="primary"
            disabled={mcode === "" || quantity_req === ""}
            size="medium"
            style={{ width: "100%", maxWidth: "220px" }}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Grid>
      </Box>
    </div>
  );
}

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
      <ConsumablesForm />
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
