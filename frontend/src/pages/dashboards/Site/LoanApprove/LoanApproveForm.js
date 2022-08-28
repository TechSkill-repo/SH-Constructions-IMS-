import React, { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { issueConsumableMaterial } from "../../../../services/issueService";
import { lendMaterial } from "../../../../services/loanService";
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";

function LoanApproveForm() {
  const [lendDate, setLendDate] = useState(getCurrentDate());
  const user = JSON.parse(window.sessionStorage.getItem("user"));
  const [storeId, setStoreId] = useState(user ? user.storeId : "");
  const [receiverStoreId, setReceiverStoreId] = useState("");
  const [mcode, setMcode] = useState("");
  const [mname, setMname] = useState("");
  const [rqDate, setRqDate] = useState(getCurrentDate());
  const [lendQuantity, setLendQuantity] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [uom, setUom] = useState("");
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState("");
  const [returnCondition, setReturnCondition] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [mdescription, setMdescription] = useState("");

  function getCurrentDate() {
    let newDate = new Date();
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();

    return `${date}/${month < 10 ? `0${month}` : `${month}`}/${year}`;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSuccess(true);

    lendMaterial({
      mcode,
      mname,
      uom,
      lendDate,
      lendQuantity,
      returnDate,
      storeId,
      receiverStoreId,
      condition,
      returnCondition,
      category,
      mdescription,
    })
      .then((resp) => {
        console.log(resp);
      })
      .catch((err) => {
        console.log(err);
      });

    // setTimeout(() => {
    //   setShowSuccess(false);
    //   window.location.href = "/mi-consumables-table/" + storeId;
    // }, 3000);
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
      <Typography variant="h5" gutterBottom gutterLeft>
        Consumable Form
      </Typography>
      {showSuccess && (
        <Alert severity="success" sx={{ my: 3 }}>
          This is a success alert — check it out!
        </Alert>
      )}
      <Grid container spacing={2} alignItems="center" justifyContent="center">
        <Grid item xs={12} md={6}>
          <TextField
            id="rqDate"
            label="Approve Date"
            type="text"
            value={rqDate}
            onChange={(e) => {
              setRqDate(e.target.value);
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            id="storeId"
            label="Site Location"
            type="text"
            value={storeId}
            onChange={(e) => {
              setStoreId(e.target.value);
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            id="receiverStoreId"
            label="Reciever Store Id"
            type="text"
            value={receiverStoreId}
            onChange={(e) => {
              setReceiverStoreId(e.target.value);
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
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
        <Grid item xs={12} md={6}>
          <TextField
            id="mname"
            label="Material Name"
            type="text"
            value={mname}
            onChange={(e) => {
              setMname(e.target.value);
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            id="uom"
            label="Unit of Measurement"
            type="text"
            value={uom}
            onChange={(e) => {
              setUom(e.target.value);
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            id="lendQuantity"
            label="Approve Qty"
            type="text"
            value={lendQuantity}
            onChange={(e) => {
              setLendQuantity(e.target.value);
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            id="lendQuantity"
            label="Approve Qty"
            type="text"
            value={mdescription}
            onChange={(e) => {
              setMdescription(e.target.value);
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            id="condition"
            select
            label="Condition"
            value={condition}
            onChange={(e) => {
              setCondition(e.target.value);
            }}
            helperText="Please select current condition"
          >
            <MenuItem value={"good"}>Good</MenuItem>
            <MenuItem value={"moderate"}>Moderate</MenuItem>
            <MenuItem value={"bad"}>Bad</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            id="category"
            select
            label="Category"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
            }}
            helperText="Please select your category"
          >
            <MenuItem value={"consumable"}>Consumable</MenuItem>
            <MenuItem value={"non-consumable"}>Non-Consumable</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12} md={6}>
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

export default LoanApproveForm;
