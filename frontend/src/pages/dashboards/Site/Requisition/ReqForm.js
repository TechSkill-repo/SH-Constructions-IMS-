import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { v4 as uuidv4 } from "uuid";
import { requisition } from "../../../../services/materialService";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Alert from "@mui/material/Alert";
import Grid from "@mui/material/Grid";
import { InputLabel, Typography } from "@material-ui/core";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

function ReqForm() {
  const user = JSON.parse(window.sessionStorage.getItem("user"));
  const [items, setItems] = useState([{
    storeId: user ? user.storeId : "",
    slip_no: uuidv4(),
    mcode: "",
    mname: "",
    mdescription: "",
    date: getCurrentDate(),
    uom: "",
    category: "consumable",
    quantity_req: "",
    incharge_name: "",
    site_location: user ? user.site_location : ""
  }]);

  const [showSuccess, setShowSuccess] = useState(false);

  function getCurrentDate() {
    let newDate = new Date();
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();

    return `${date}/${month < 10 ? `0${month}` : `${month}`}/${year}`;
  }

  const handleInputChange = (slip_no, event) => {
    const newItems = items.map((i) => {
      if (slip_no === i.slip_no) {
        i[event.target.id] = event.target.value;
      }
      return i;
    });
    setItems(newItems);
  }

  const handleRemoveClick = (slip_no) => {
    const values = [...items];
    values.splice(
      values.findIndex((value) => value.slip_no === slip_no),
      1
    );
    setItems(values);
  };

  const handleAddClick = () => {
    setItems([...items, {
      storeId: user ? user.storeId : "",
      slip_no: uuidv4(),
      mcode: "",
      mname: "",
      mdescription: "",
      date: getCurrentDate(),
      uom: "",
      category: "consumable",
      quantity_req: "",
      incharge_name: "",
      site_location: user ? user.site_location : ""
    }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSuccess(true);

    items.map(item => {
      requisition(item)
        .then((resp) => {
          console.log(resp.data);
        })
        .catch((err) => {
          console.log(err);
        });
    });


    setTimeout(() => {
      setItems([{
        storeId: user ? user.storeId : "",
        slip_no: uuidv4(),
        mcode: "",
        mname: "",
        mdescription: "",
        date: getCurrentDate(),
        uom: "",
        category: "consumable",
        quantity_req: "",
        incharge_name: "",
        site_location: user ? user.site_location : ""
      }])
    }, 3000);
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
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="h3" gutterBottom gutterLeft>
          Requisition Form
        </Typography>
        {items.map((item) => {
          return (
            <Grid
              container
              spacing={2}
              alignItems="center"
              justifyContent="center"
            >
              <Grid item xs={12} md={4}>
                <TextField
                  id="mname"
                  label="Material Name"
                  type="text"
                  value={item.mname}
                  onChange={(e) => {
                    handleInputChange(item.slip_no, e);
                  }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  id="mcode"
                  label="Material Code"
                  type="text"
                  value={item.mcode}
                  onChange={(e) => {
                    handleInputChange(item.slip_no, e);
                  }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  id="quantity_req"
                  label="Quantity Request"
                  type="text"
                  value={item.quantity_req}
                  onChange={(e) => {
                    handleInputChange(item.slip_no, e);
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id="storeId"
                  label="Store ID"
                  type="text"
                  value={item.storeId}
                  onChange={(e) => {
                    handleInputChange(item.slip_no, e);
                  }}
                  sx={{ display: "none" }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id="uom"
                  label="Unit of Measurement"
                  type="text"
                  value={item.uom}
                  onChange={(e) => {
                    handleInputChange(item.slip_no, e);
                  }}
                  sx={{ display: "none" }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="mdescription"
                  label="Material Description"
                  type="text"
                  value={item.mdescription}
                  onChange={(e) => {
                    handleInputChange(item.slip_no, e);
                  }}
                  sx={{ display: "none" }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  id="date"
                  label="Date"
                  type="text"
                  value={item.date}
                  onChange={(e) => {
                    handleInputChange(item.slip_no, e);
                  }}
                  sx={{ display: "none" }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControl sx={{ m: 1, width: "100%" }} size="medium">
                  <InputLabel id="category">Category</InputLabel>
                  <Select
                    labelId="category-label"
                    id="category"
                    value={item.category}
                    label="Category"
                    onChange={(e) => {
                      handleInputChange(item.slip_no, e);
                    }}
                  // sx={{ display: "none" }}
                  >
                    <MenuItem value={"consumable"}>Consumable</MenuItem>
                    <MenuItem value={"non-consumable"}>Non-Consumable</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  id="slip_no"
                  label="Slip Number"
                  type="text"
                  value={item.slip_no}
                  onChange={(e) => {
                    handleInputChange(item.slip_no, e);
                  }}
                  sx={{ display: "none" }}
                />
              </Grid>
              <TextField
                id="incharge_name"
                label="Incharge Name"
                type="text"
                value={item.incharge_name}
                onChange={(e) => {
                  handleInputChange(item.slip_no, e);
                }}
                sx={{ display: "none" }}
              />
              <TextField
                id="site_location"
                label="Site Location"
                type="text"
                value={item.site_location}
                onChange={(e) => {
                  handleInputChange(item.slip_no, e);
                }}
                sx={{ display: "none" }}
              />
              <div className="btn-box">
                <RemoveCircleIcon
                  style={{
                    fontSize: "50px",
                    cursor: "pointer",
                    color: "#4782da",
                    display: items.length === 1 ? "none" : "",
                  }}
                  onClick={() => handleRemoveClick(item.slip_no)}
                />
                <AddCircleIcon
                  onClick={handleAddClick}
                  style={{
                    fontSize: "50px",
                    cursor: "pointer",
                    color: "#4782da",
                  }}
                />
              </div>
            </Grid>
          );
        })}
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
      </Box>
    </div>
  );
}

export default ReqForm;
