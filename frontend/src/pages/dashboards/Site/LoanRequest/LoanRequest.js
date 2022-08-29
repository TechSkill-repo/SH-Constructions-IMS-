import React, { useState } from "react";
import { requestLoan } from "../../../../services/loanService";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Alert from "@mui/material/Alert";
import Grid from "@mui/material/Grid";
import { Typography } from "@material-ui/core";

function LoanRequest() {
  const user = JSON.parse(window.sessionStorage.getItem("user"));
  const [storeId, setStoreId] = useState(user ? user.storeId : "");
  const [mcode, setMcode] = useState("");
  const [mname, setMname] = useState("");
  const [rqDate, setRqDate] = useState(getCurrentDate());
  const [mquantity, setMquantity] = useState("");
  const [uom, setUom] = useState("");
  const [category, setCategory] = useState("");
  const [requestedStoreId, setRequestedStoreId] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

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

    requestLoan({ rqDate, mquantity, storeId, mcode, mname, uom, requestedStoreId, category })
      .then((resp) => {
        console.log(resp);
      })
      .catch((err) => {
        console.log(err);
      });

    setTimeout(() => {
      setRequestedStoreId("")
      setMcode("");
      setMname("");
      setUom("");
      setCategory("");
      setMquantity("");
      setShowSuccess("");
    }, 2000);
  };

  return (
    <div>
      {showSuccess && (
        <Alert severity="success" sx={{ my: 3 }}>
          This is a success alert — check it out!
        </Alert>
      )}
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "100%" },
          "&.MuiBox-root": { background: "#fff", p: 3, borderRadius: 3 },
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <Typography variant="h3" gutterBottom gutterLeft>
          Loan Request Form
        </Typography>
        <Grid container spacing={2} alignItems="center" justifyContent="center">
          <Grid item xs={12} md={4}>
            <TextField
              id="storeId"
              label="Store ID"
              type="text"
              value={storeId}
              onChange={(e) => {
                setStoreId(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              id="requestedStoreId"
              label="Requested Store Id"
              type="text"
              value={requestedStoreId}
              onChange={(e) => {
                setRequestedStoreId(e.target.value);
              }}
            />
          </Grid>
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
          <Grid item xs={12} md={4}>
            <TextField
              id="rqDate"
              label="Request Date"
              type="text"
              value={rqDate}
              onChange={(e) => {
                setRqDate(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl sx={{ m: 1, width: "100%" }} size="medium">
              <InputLabel id="category-label">Category</InputLabel>
              <Select
                labelId="category-label"
                id="category"
                value={category}
                label="Category"
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
              >
                <MenuItem value={"consumable"}>Consumable</MenuItem>
                <MenuItem value={"non-consumable"}>Non-Consumable</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              id="mquantity"
              label="Request Quantity"
              type="text"
              value={mquantity}
              onChange={(e) => {
                setMquantity(e.target.value);
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
    </div>
  );
}

export default LoanRequest;
