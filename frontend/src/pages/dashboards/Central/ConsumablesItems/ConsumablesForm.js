import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Grid from "@mui/material/Grid";
import { Typography } from "@material-ui/core";
import { postConsumableItem } from "../../../../services/inventoryService";
import { number } from "prop-types";

function ConsumablesForm() {
  const [mcode, setMcode] = useState("");
  const [mname, setMname] = useState("");
  const [mdescription, setMdescription] = useState("");
  const [openingStock, setOpeningStock] = useState("");
  const [uom, setUom] = useState("");
  const [date, setDate] = useState(getCurrentDate());
  const [currStock, setCurrStock] = useState("");
  const [totalReceived, setTotalReceived] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, showError] = useState(false);

  function getCurrentDate() {
    let newDate = new Date();
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();

    return `${date}/${month < 10 ? `0${month}` : `${month}`}/${year}`;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mname !== "" && uom != "" && currStock !== "" && totalReceived !== "") {
      setShowSuccess(true);

      postConsumableItem({ mcode, mname, mdescription, opening_stock: openingStock, current_stock: currStock, total_received: totalReceived, uom, date })
        .then(resp => {
          console.log(resp.data);
        }).catch(err => {
          console.log(err);
        });

      setTimeout(() => {
        setShowSuccess(false);
        window.location.href = "/consumables-items";
      }, 3000);
    } else {
      showError(true);
    }
  };

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "100%" },
        "&.MuiBox-root": { background: "#fff", p: 3, borderRadius: 3, my: 4 },
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <Typography variant="h3" gutterBottom gutterLeft>
        Consumable Form
      </Typography>
      {showSuccess && (
        <Alert severity="success" sx={{ my: 3 }}>
          This is a success alert — check it out!
        </Alert>
      )}
      <Grid container spacing={2} alignItems="center" justifyContent="center">
        <Grid item xs={12} md={4}>
          <TextField
            id="mcode"
            label="Material Code"
            type="text"
            value={mcode}
            onChange={(e) => {
              setMcode(e.target.value);
            }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            required
            id="mname"
            label="Material Name"
            type="text"
            value={mname}
            error={error && mname == "" ? true : false}
            onChange={(e) => {
              setMname(e.target.value);
            }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            id="date"
            label="Date"
            type="text"
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="mdescription"
            label="Material Description"
            type="text"
            value={mdescription}
            onChange={(e) => {
              setMdescription(e.target.value);
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="uom"
            label="Unit of Measurement"
            type="text"
            value={uom}
            error={error && uom == "" ? true : false}
            onChange={(e) => {
              setUom(e.target.value);
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="totalReceived"
            label="Total Received"
            type="number"
            value={totalReceived}
            error={error && totalReceived == "" ? true : false}
            onChange={(e) => {
              e.target.value >= 0 ? setTotalReceived(e.target.value) : 0;
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            id="openingStock"
            label="Opening Stock"
            type="number"
            value={openingStock}
            onChange={(e) => {
              e.target.value >= 0 ? setOpeningStock(e.target.value) : 0;
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="currStock"
            label="Current Stock"
            type="number"
            value={currStock}
            error={error && currStock == "" ? true : false}
            onChange={(e) => {
              e.target.value >= 0 ? setCurrStock(e.target.value) : 0;
            }}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <Button
            variant="contained"
            size="large"
            type="submit"
            sx={{ mt: 1, width: "100%" }}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ConsumablesForm;
