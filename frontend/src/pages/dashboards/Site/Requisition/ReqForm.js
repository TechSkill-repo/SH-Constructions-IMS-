import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { requisition, fetchDetails, getMcodes } from "../../../../services/materialService";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Alert from "@mui/material/Alert";
import Grid from "@mui/material/Grid";
import { InputLabel, Typography } from "@material-ui/core";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

function ReqForm() {
  let seq = (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);

  const user = JSON.parse(window.sessionStorage.getItem("user"));
  const [items, setItems] = useState([
    {
      storeId: user ? user.storeId : "",
      slip_no: seq,
      mcode: "",
      mname: "",
      mdescription: "",
      date: getCurrentDate(),
      uom: "",
      category: "",
      quantity_req: "",
      incharge_name: "",
      site_location: user ? user.site_location : "",
    },
  ]);
  const [mcodes, setMcodes] = useState([]);

  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    async function fetch() {
      await getMcodes()
        .then(data => setMcodes(data.codes))
        .catch(err => console.log(err));

      console.log(mcodes);
    }
    fetch();
  }, []);

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
        i[event.target.name] = event.target.value;

        if (event.target.name === "mcode") {
          fetchDetails(event.target.value)
            .then(data => {
              const { mname, mdescription, uom, category } = data.item;
              i.mname = mname;
              i.mdescription = mdescription;
              i.uom = uom;
              i.category = category;
            })
            .catch(err => console.log(err))
        }
      }
      return i;
    });
    setItems(newItems);
  };

  const handleRemoveClick = (slip_no) => {
    const values = [...items];
    values.splice(
      values.findIndex((value) => value.slip_no === slip_no),
      1
    );
    setItems(values);
  };

  const handleAddClick = () => {
    setItems([
      ...items,
      {
        storeId: user ? user.storeId : "",
        slip_no: seq,
        mcode: "",
        mname: "",
        mdescription: "",
        date: getCurrentDate(),
        uom: "",
        category: "",
        quantity_req: "",
        incharge_name: "",
        site_location: user ? user.site_location : "",
      },
    ]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSuccess(true);

    items.map((item) => {
      requisition(item)
        .then((resp) => {
          console.log(resp.data);
        })
        .catch((err) => {
          console.log(err);
        });
    });

    setTimeout(() => {
      setShowSuccess(false);
      setItems([
        {
          storeId: user ? user.storeId : "",
          slip_no: seq,
          mcode: "",
          mname: "",
          mdescription: "",
          date: getCurrentDate(),
          uom: "",
          category: "",
          quantity_req: "",
          incharge_name: "",
          site_location: user ? user.site_location : "",
        },
      ]);
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
                  name="mname"
                  label="Material Name"
                  type="text"
                  value={item.mname}
                  onChange={(e) => {
                    handleInputChange(item.slip_no, e);
                  }}
                  disabled={true}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <input style={{ display: "none" }} id="dummy" />
                <TextField
                  name="mcode"
                  select
                  label="Material Code"
                  value={item.mcode}
                  helperText="Select mcode"
                  onChange={(e) => {
                    handleInputChange(item.slip_no, e);
                  }}
                >
                  {mcodes.map((mcode) => (
                    <MenuItem key={mcode} value={mcode}>
                      {mcode}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  name="quantity_req"
                  label="Quantity Request"
                  type="text"
                  value={item.quantity_req}
                  onChange={(e) => {
                    handleInputChange(item.slip_no, e);
                  }}
                />
              </Grid>
              {/* <Grid item xs={12} md={6}>
                <TextField
                  name="storeId"
                  label="Store ID"
                  type="text"
                  value={item.storeId}
                  onChange={(e) => {
                    handleInputChange(item.slip_no, e);
                  }}
                  disabled={true}
                />
              </Grid> */}
              {/* <Grid item xs={12} md={6}>
                <TextField
                  name="uom"
                  label="Unit of Measurement"
                  type="text"
                  value={item.uom}
                  onChange={(e) => {
                    handleInputChange(item.slip_no, e);
                  }}
                  disabled={true}
                />
              </Grid> */}
              {/* <Grid item xs={12}>
                <TextField
                  name="mdescription"
                  label="Material Description"
                  type="text"
                  value={item.mdescription}
                  onChange={(e) => {
                    handleInputChange(item.slip_no, e);
                  }}
                  disabled={true}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  name="date"
                  label="Date"
                  type="text"
                  value={item.date}
                  onChange={(e) => {
                    handleInputChange(item.slip_no, e);
                  }}
                  disabled={true}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  name="category"
                  label="Category"
                  value={item.category}
                  onChange={(e) => {
                    handleInputChange(item.slip_no, e);
                  }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  name="slip_no"
                  label="Slip Number"
                  type="text"
                  value={item.slip_no}
                  onChange={(e) => {
                    handleInputChange(item.slip_no, e);
                  }}
                  disabled={true}
                />
              </Grid> */}
              {/* <TextField
                name="incharge_name"
                label="Incharge Name"
                type="text"
                value={item.incharge_name}
                onChange={(e) => {
                  handleInputChange(item.slip_no, e);
                }}
                disabled={true}
              />
              <TextField
                name="site_location"
                label="Site Location"
                type="text"
                value={item.site_location}
                onChange={(e) => {
                  handleInputChange(item.slip_no, e);
                }}
                disabled={true}
              /> */}
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
