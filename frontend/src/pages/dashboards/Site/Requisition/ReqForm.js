import React, { useState } from "react";
import { requisition } from "../../../../services/materialService";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Alert from '@mui/material/Alert';
import Grid from '@mui/material/Grid';

function ReqForm() {
  const [storeId, setStoreId] = useState("");
  const [slip_no, setSlipNo] = useState("");
  const [mcode, setMcode] = useState("");
  const [mname, setMname] = useState("");
  const [mdescription, setMdescription] = useState("");
  const [date, setDate] = useState(getCurrentDate());
  const [uom, setUom] = useState("");
  const [category, setCategory] = useState("");
  const [quantity_req, setQuantityReq] = useState("");
  const [incharge_name, setInchargeName] = useState("");
  const [site_location, setSiteLocation] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  function getCurrentDate() {

    let newDate = new Date()
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();

    return `${date}/${month < 10 ? `0${month}` : `${month}`}/${year}`
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSuccess(true);

    requisition({ storeId, slip_no, mcode, mname, mdescription, date, uom, category, quantity_req, incharge_name, site_location })
      .then(resp => {
        console.log(resp.data);
      }).catch(err => {
        console.log(err);
      });

    setTimeout(() => {
      setStoreId("");
      setSlipNo("");
      setMcode("");
      setMname("");
      setMdescription("");
      setUom("");
      setCategory("");
      setQuantityReq("");
      setInchargeName("");
      setSiteLocation("");
      setShowSuccess("");
    }, 2000)
  };

  return (
    <div >
      <h2 style={{ marginBottom: '0.8em' }}>ReqForm</h2>
      {showSuccess && (
        <Alert severity="success" sx={{ my: 3 }} >This is a success alert — check it out!</Alert>
      )}
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '100%' },
          '&.MuiBox-root': { background: "#fff", p: 3, borderRadius: 3 }
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <Grid container spacing={2} alignItems="center" justifyContent="center">
          <Grid item xs={12} md={4}>
            <TextField
              id="storeId"
              label="Store ID"
              type="text"
              value={storeId}
              onChange={(e) => { setStoreId(e.target.value) }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              id="slip_no"
              label="Slip Number"
              type="text"
              value={slip_no}
              onChange={(e) => { setSlipNo(e.target.value) }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              id="mcode"
              label="Material Code"
              type="text"
              value={mcode}
              onChange={(e) => { setMcode(e.target.value) }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              id="mname"
              label="Material Name"
              type="text"
              value={mname}
              onChange={(e) => { setMname(e.target.value) }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              id="uom"
              label="Unit of Measurement"
              type="text"
              value={uom}
              onChange={(e) => { setUom(e.target.value) }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="mdescription"
              label="Material Description"
              type="text"
              value={mdescription}
              onChange={(e) => { setMdescription(e.target.value) }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              id="date"
              label="Date"
              type="text"
              value={date}
              onChange={(e) => { setDate(e.target.value) }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl sx={{ m: 1, width: '100%' }} size="medium">
              <InputLabel id="category-label">Category</InputLabel>
              <Select
                labelId="category-label"
                id="category"
                value={category}
                label="Category"
                onChange={(e) => { setCategory(e.target.value) }}
              >
                <MenuItem value={"consumable"}>Consumable</MenuItem>
                <MenuItem value={"non-consumable"}>Non-Consumable</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              id="quantityReq"
              label="Quantity Request"
              type="text"
              value={quantity_req}
              onChange={(e) => { setQuantityReq(e.target.value) }}
            />
          </Grid>
          <TextField
            id="inchargeName"
            label="Incharge Name"
            type="text"
            value={incharge_name}
            onChange={(e) => { setInchargeName(e.target.value) }}
            sx={{ display: 'none' }}
          />
          <TextField
            id="siteLocation"
            label="Site Location"
            type="text"
            value={site_location}
            onChange={(e) => { setSiteLocation(e.target.value) }}
            sx={{ display: 'none' }}
          />
          <Grid item xs={12} md={2}>
            <Button variant="contained" type="submit" sx={{ mt: 1, width: '100%' }}>Submit</Button>
          </Grid>
        </Grid>
      </Box>
    </div >
  );
}

export default ReqForm;
