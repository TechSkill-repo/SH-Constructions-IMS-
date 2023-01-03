import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Grid from "@mui/material/Grid";
import { MenuItem, Typography } from "@material-ui/core";
import { postCriticalTools } from "../../../../services/criticalTools";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

function ConsumablesForm({ productId }) {
  const [storeId, setStoreId] = useState("");
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
      storeId,
      mcode,
      mname,
      productId,
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
      window.location.href = `/critical-tool/${productId}`;
    }, 3000);
    // } else {
    //   showError(true);
    // }
  };

  const storeLocation = [
    {
      value: "EC01",
      label: "COOKE PLANT",
    },
    {
      value: "E22",
      label: "RMM",
    },
    {
      value: "E13",
      label: "RMBB",
    },
    {
      value: "E17",
      label: "RMBB2",
    },
    {
      value: "E27",
      label: "GBF",
    },
    {
      value: "E15",
      label: "SP#3,4",
    },
    {
      value: "E23",
      label: "SP#1,2",
    },
    {
      value: "E24",
      label: "MM",
    },
    {
      value: "E20",
      label: "LD#01",
    },
    {
      value: "E30",
      label: "PP",
    },
    {
      value: "E28",
      label: "MRSPP",
    },
    {
      value: "ILL",
      label: "LIME PLNT",
    },
  ];

  const makers = [
    {
      value: "Elephant",
      label: "Elephant",
    },
    {
      value: "Keto",
      label: "Keto",
    },
    {
      value: "MSA",
      label: "MSA",
    },
    { value: "Drager", label: "Drager" },
    {
      value: "Honeywel",
      label: "Honeywel",
    },
    {
      value: "Honeywel",
      label: "Honeywel",
    },
    {
      value: "Kanex",
      label: "Kanex",
    },
    {
      value: "Safex",
      label: "Safex",
    },
    {
      value: "Alied",
      label: "Toshan",
    },
    {
      value: "AllStar",
      labels: "All Star",
    },
  ];

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
        <Grid item xs={12} md={4}>
          <TextField
            // required
            id="serialNo"
            label="Serial Number"
            type="text"
            value={serialNo}
            // error={error && serialNo == "" ? true : false}
            onChange={(e) => {
              e.target.value.length >= 0 ? setserialNo(e.target.value) : 0;
            }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          {/* <TextField
            // required
            id="uom"
            label="Unit of Measurement"
            type="text"
            value={uom}
            // error={error && uom == "" ? true : false}
            onChange={(e) => {
              setUom(e.target.value);
            }}
          /> */}
          {/* <TextField
            id="storeId"
            label="Site Location"
            type="text"
            value={storeId}
            onChange={(e) => {
              setStoreId(e.target.value);
            }}
          /> */}
          <TextField
            id="storeId"
            select
            label="Site Location"
            type="text"
            value={storeId}
            onChange={(e) => {
              setStoreId(e.target.value);
            }}
          >
            {storeLocation.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            // required
            id="make"
            select
            label="Make"
            type="text"
            value={make}
            onChange={(e) => {
              setMake(e.target.value);
            }}
          >
            {makers.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} md={6}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              label="Entry Date"
              inputFormat="MM/DD/YYYY"
              value={entryDate}
              color="success"
              onChange={(newValue) => {
                let d = new Date(newValue.$d);
                d = d.toLocaleDateString();

                setEntryDate((prev) => d);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12} md={6}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              label="Due Date"
              inputFormat="MM/DD/YYYY"
              value={dueDate}
              color="success"
              onChange={(newValue) => {
                let d = new Date(newValue.$d);
                d = d.toLocaleDateString();

                setDueDate((prev) => d);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
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
