import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Grid from "@mui/material/Grid";
import { Typography } from "@material-ui/core";
import { postCriticalTools } from "../../../../services/criticalTools";

function ConsumablesForm() {
  const [mcode, setMcode] = useState("");
  const [mname, setMname] = useState("");
  const [mdescription, setMdescription] = useState("");
  const [entryDate, setEntryDate] = useState("");
  const [uom, setUom] = useState("");
  const [make, setMake] = useState("");
  const [serialNo, setserialNo] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  // const [error, showError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // if (mname !== "" && uom != "" && currStock !== "" && totalReceived !== "") {
    setShowSuccess(true);

    postCriticalTools({
      mcode,
      mname,
      mdescription,
      entryDate,
      uom,
      make,
      serialNo,
      dueDate,
    })
      .then((resp) => {
        console.log(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });

    setTimeout(() => {
      setShowSuccess(false);
      // window.location.href = "/critical-tools";
    }, 3000);
    // } else {
    //   showError(true);
    // }
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
        Add Critical Tool
      </Typography>
      {showSuccess && (
        <Alert severity="success" sx={{ my: 3 }}>
          Item successfully Added — check it out!
        </Alert>
      )}
      <Grid container spacing={2} alignItems="center" justifyContent="center">
        {/* <Grid item xs={12} md={4}>
          <TextField
            id="mcode"
            label="Material Code"
            type="text"
            value={mcode}
            onChange={(e) => {
              setMcode(e.target.value);
            }}
          />
        </Grid> */}
        {/* <Grid item xs={12} md={4}>
          <TextField
            // required
            id="mname"
            label="Material Name"
            type="text"
            value={mname}
            // error={error && mname == "" ? true : false}
            onChange={(e) => {
              setMname(e.target.value);
            }}
          />
        </Grid> */}
        <Grid item xs={12} md={6}>
          <TextField
            // required
            id="serialNo"
            label="Serial Number"
            type="number"
            value={serialNo}
            // error={error && serialNo == "" ? true : false}
            onChange={(e) => {
              e.target.value >= 0 ? setserialNo(e.target.value) : 0;
            }}
          />
        </Grid>
        {/* <Grid item xs={12} md={6}>
          <TextField
            // required
            id="uom"
            label="Unit of Measurement"
            type="text"
            value={uom}
            // error={error && uom == "" ? true : false}
            onChange={(e) => {
              setUom(e.target.value);
            }}
          />
        </Grid> */}
        <Grid item xs={12} md={6}>
          <TextField
            // required
            id="make"
            label="Make"
            type="text"
            value={make}
            // error={error && make == "" ? true : false}
            onChange={(e) => {
              setMake(e.target.value);
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            // required
            id="entryDate"
            label="Entry date"
            type="text"
            value={entryDate}
            // error={error && uom == "" ? true : false}
            onChange={(e) => {
              setEntryDate(e.target.value);
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            // required
            id="dueDate"
            label="Due Date"
            type="text"
            value={dueDate}
            // error={error && make == "" ? true : false}
            onChange={(e) => {
              setDueDate(e.target.value);
            }}
          />
        </Grid>
        {/* <Grid item xs={12}>
          <TextField
            id="mdescription"
            label="Material Description"
            type="text"
            value={mdescription}
            onChange={(e) => {
              setMdescription(e.target.value);
            }}
          />
        </Grid> */}
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
