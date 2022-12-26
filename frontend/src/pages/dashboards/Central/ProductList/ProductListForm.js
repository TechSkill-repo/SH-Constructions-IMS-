import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Grid from "@mui/material/Grid";
import { MenuItem, Typography } from "@material-ui/core";
import { addMaterial } from "../../../../services/materialService";

function ConsumablesForm() {
  const [mcode, setMcode] = useState("");
  const [mname, setMname] = useState("");
  const [mdescription, setMdescription] = useState("");
  const [uom, setUom] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // if (mname !== "" && uom != "" && currStock !== "" && totalReceived !== "") {
    setShowSuccess(true);
    console.log("inside handle submit");

    addMaterial({
      mcode,
      mname,
      mdescription,
      price,
      uom,
      category,
      brand,
    })
      .then((resp) => {
        setShowSuccess(true);
        console.log(resp.data);
      })
      .catch((err) => {
        console.log(err);
        setShowError(true);
      });

    setTimeout(() => {
      setShowSuccess(false);
      window.location.href = `/product-list`;
    }, 3000);
  };

  const categoryValues = [
    {
      value: "consumable",
      label: "consumable",
    },
    {
      value: "non-consumable",
      label: "non-consumable",
    },
  ];

  const brandValues = [
    {
      value: "Honeywel",
      label: "Honeywel",
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
        Add Product
      </Typography>
      {showSuccess && (
        <Alert severity="success" sx={{ my: 3 }}>
          Item successfully Added — check it out!
        </Alert>
      )}
      {showError && (
        <Alert severity="error" sx={{ my: 3 }}>
          Item cannot be added !
        </Alert>
      )}
      <Grid container spacing={2} alignItems="center" justifyContent="center">
        <Grid item xs={6} md={6}>
          <TextField
            required
            id="mCode"
            label="M.Code"
            type="text"
            value={mcode}
            // error={error && serialNo == "" ? true : false}
            onChange={(e) => {
              e.target.value.length >= 0 ? setMcode(e.target.value) : 0;
            }}
          />
        </Grid>
        <Grid item xs={6} md={6}>
          <TextField
            required
            id="mName"
            label="M.Name"
            type="text"
            value={mname}
            // error={error && serialNo == "" ? true : false}
            onChange={(e) => {
              e.target.value.length >= 0 ? setMname(e.target.value) : 0;
            }}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2} alignItems="center" justifyContent="center">
        <Grid item xs={6} md={6}>
          <TextField
            required
            id="mDis"
            label="M.Desc"
            type="text"
            value={mdescription}
            // error={error && serialNo == "" ? true : false}
            onChange={(e) => {
              e.target.value.length >= 0 ? setMdescription(e.target.value) : 0;
            }}
          />
        </Grid>

        <Grid item xs={6} md={6}>
          <TextField
            required
            id="mPrice"
            label="M.Price"
            type="text"
            value={price}
            // error={error && serialNo == "" ? true : false}
            onChange={(e) => {
              e.target.value.length >= 0 ? setPrice(e.target.value) : 0;
            }}
          />
        </Grid>
      </Grid>

      <Grid container spacing={2} alignItems="center" justifyContent="center">
        <Grid item xs={12} md={4}>
          <TextField
            id="U.O.M"
            label="U.O.M"
            type="text"
            value={uom}
            onChange={(e) => {
              setUom(e.target.value);
            }}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <TextField
            // required
            id="category"
            select
            label="Category"
            type="text"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
            }}
          >
            {categoryValues.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12} md={4}>
          <TextField
            // required
            id="brand"
            select
            label="Brand"
            type="text"
            value={brand}
            onChange={(e) => {
              setBrand(e.target.value);
            }}
          >
            {categoryValues.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
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

      <Grid container spacing={2} alignItems="center" justifyContent="center">
        <Grid item xs={12} md={3}>
          <Button
            variant="contained"
            size="large"
            sx={{ mt: 1, width: "100%" }}
            type="submit"
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ConsumablesForm;
