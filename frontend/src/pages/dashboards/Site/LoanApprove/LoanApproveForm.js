import React, { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { issueConsumableMaterial } from "../../../../services/issueService";
import { lendMaterial } from "../../../../services/loanService";

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
  const [requestedStoreId, setRequestedStoreId] = useState("");
  const [returnCondition, setReturnCondition] = useState("");
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

    lendMaterial({ mcode, mname, uom, lendDate, lendQuantity, returnDate, storeId, receiverStoreId, condition, returnCondition, category })
      .then(resp => {
        console.log(resp);
      }).catch(err => {
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
            label="Req Date"
            type="text"
            value={rqDate}
            onChange={(e) => {
              setRqDate(e.target.value);
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
            label="Lend Qty"
            type="text"
            value={lendQuantity}
            onChange={(e) => {
              setLendQuantity(e.target.value);
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

export default LoanApproveForm;