import React, { useState } from "react";
import { requisition } from "../../../../services/materialService";
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
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

function ReqForm() {
  const user = JSON.parse(window.sessionStorage.getItem("user"));
  const [storeId, setStoreId] = useState(user ? user.storeId : "");
  const [slip_no, setSlipNo] = useState("123");
  const [mcode, setMcode] = useState("");
  const [mname, setMname] = useState("");
  const [mdescription, setMdescription] = useState("Dusk Mask");
  const [date, setDate] = useState(getCurrentDate());
  const [uom, setUom] = useState("Kg");
  const [category, setCategory] = useState("non-consumable");
  const [quantity_req, setQuantityReq] = useState("");
  const [incharge_name, setInchargeName] = useState("");
  const [site_location, setSiteLocation] = useState(
    user ? user.site_location : ""
  );
  const [showSuccess, setShowSuccess] = useState(false);
  const [inputList, setInputList] = useState([
    { mcode: "", mname: "", quantity: "" },
  ]);

  function getCurrentDate() {
    let newDate = new Date();
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();

    return `${date}/${month < 10 ? `0${month}` : `${month}`}/${year}`;
  }

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  const handleAddClick = () => {
    setInputList([...inputList, { mcode: "", mname: "", quantity: "" }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSuccess(true);

    requisition({
      storeId,
      slip_no,
      mcode,
      mname,
      mdescription,
      date,
      uom,
      category,
      quantity_req,
      incharge_name,
      site_location,
    })
      .then((resp) => {
        console.log(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });

    setTimeout(() => {
      setSlipNo("");
      setMcode("");
      setMname("");
      setMdescription("");
      setUom("");
      setCategory("");
      setQuantityReq("");
      setInchargeName("");
      setSiteLocation("");
      setShowSuccess(false);
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
        {inputList.map((x, i) => {
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
                  value={mname}
                  onChange={(e) => {
                    setMname(e.target.value);
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
              <Grid item xs={12} md={4}>
                <TextField
                  id="quantityReq"
                  label="Quantity Request"
                  type="text"
                  value={quantity_req}
                  onChange={(e) => {
                    setQuantityReq(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id="storeId"
                  label="Store ID"
                  type="text"
                  value={storeId}
                  onChange={(e) => {
                    setStoreId(e.target.value);
                  }}
                  sx={{ display: "none" }}
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
                  sx={{ display: "none" }}
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
                  sx={{ display: "none" }}
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
                  sx={{ display: "none" }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControl sx={{ m: 1, width: "100%" }} size="medium">
                  {/* <InputLabel id="category-label">Category</InputLabel> */}
                  <Select
                    labelId="category-label"
                    id="category"
                    value={category}
                    label="Category"
                    onChange={(e) => {
                      setCategory(e.target.value);
                    }}
                    sx={{ display: "none" }}
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
                  value={slip_no}
                  onChange={(e) => {
                    setSlipNo(e.target.value);
                  }}
                  sx={{ display: "none" }}
                />
              </Grid>
              <TextField
                id="inchargeName"
                label="Incharge Name"
                type="text"
                value={incharge_name}
                onChange={(e) => {
                  setInchargeName(e.target.value);
                }}
                sx={{ display: "none" }}
              />
              <TextField
                id="siteLocation"
                label="Site Location"
                type="text"
                value={site_location}
                onChange={(e) => {
                  setSiteLocation(e.target.value);
                }}
                sx={{ display: "none" }}
              />
              <div className="btn-box">
                {inputList.length !== 1 && (
                  <RemoveCircleIcon
                    onClick={() => handleRemoveClick(i)}
                    style={{
                      fontSize: "50px",
                      cursor: "pointer",
                      color: "#4782da",
                    }}
                  />
                )}
                {inputList.length - 1 === i && (
                  <AddCircleIcon
                    onClick={handleAddClick}
                    style={{
                      fontSize: "50px",
                      cursor: "pointer",
                      color: "#4782da",
                    }}
                  />
                )}
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
