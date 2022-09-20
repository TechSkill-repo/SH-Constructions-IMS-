import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import { getMatetrialDestructs, materialDestruct } from "../../../../services/storeService";
import { getMcodes } from "../../../../services/materialService";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Alert from "@mui/material/Alert";
import Grid from "@mui/material/Grid";
import { Typography } from "@material-ui/core";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import MaterialTable from "material-table";
import Popup from "./Popup";
import Modal from "@mui/material/Modal";

function MaterialIssue() {
  const uniqueId = () => {
    var id = "id" + Math.random().toString(16).slice(2);
    return id.substring(3, 8);
  };

  const user = JSON.parse(window.sessionStorage.getItem("user"));
  const storeId = user.storeId;

  const [data, setData] = useState([]);
  const [items, setItems] = useState([
    {
      storeId: user ? user.storeId : "",
      empName: "",
      empId: "",
      mcode: "",
      Ddate: getCurrentDate(),
      mquantity: ""
    },
  ]);
  const [mcodes, setMcodes] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "100%",
    maxWidth: "80vw",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

  useEffect(() => {
    async function fetch() {
      await getMatetrialDestructs(storeId)
        .then((data) => {
          setData(data.items);
        })
        .catch((err) => {
          console.log(err);
        });

      await getMcodes()
        .then((data) => setMcodes(data.codes))
        .catch((err) => console.log(err));
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
            .then((data) => {
              const { mname, mdescription, uom, category } = data.item;
              i.mname = mname;
              i.mdescription = mdescription;
              i.uom = uom;
              i.category = category;
            })
            .catch((err) => console.log(err));
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
        empName: "",
        empId: "",
        mcode: "",
        Ddate: getCurrentDate(),
        mquantity: ""
      },
    ]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSuccess(true);

    items.map((item) => {
      materialDestruct(item)
        .then((resp) => {
          console.log(resp.data);
        })
        .catch((err) => {
          console.log(err);
        });
    });

    setTimeout(() => {
      window.location.href = "/material-issue";
    }, 3000);
  };

  const columns = [
    { title: "M.Code", field: "mcode", filterPlaceholder: "filter" },
    { title: "Date", field: "Ddate", filterPlaceholder: "filter" },
    {
      title: "Qty.",
      field: "mquantity",
      filterPlaceholder: "filter",
    }
  ];

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
        // onSubmit={handleSubmit}
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="h3">Requisition Form</Typography>
        {items.map((item, index) => {
          return (
            <Grid
              container
              spacing={2}
              alignItems="center"
              justifyContent="center"
              key={index.toString()}
            >
              <Grid item xs={12} md={5}>
                <input style={{ display: "none" }} id="dummy" />
                <TextField
                  variant="outlined"
                  name="mcode"
                  select
                  label="Material Code"
                  value={item.mcode}
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
              <Grid item xs={12} md={5}>
                <TextField
                  variant="outlined"
                  name="mquantity"
                  label="Quantity Request"
                  type="text"
                  value={item.mquantity}
                  onChange={(e) => {
                    handleInputChange(item.slip_no, e);
                  }}
                />
              </Grid>
              <Grid item xs={12} md={5}>
                <TextField
                  variant="outlined"
                  name="empId"
                  label="Employee ID"
                  type="text"
                  value={item.empId}
                  onChange={(e) => {
                    handleInputChange(item.slip_no, e);
                  }}
                />
              </Grid>
              <Grid item xs={12} md={5}>
                <TextField
                  variant="outlined"
                  name="empName"
                  label="Employee Name"
                  type="text"
                  value={item.empName}
                  onChange={(e) => {
                    handleInputChange(item.slip_no, e);
                  }}
                />
              </Grid>
              <Grid item xs={6} md={2}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    alignItems: "end",
                  }}
                >
                  <RemoveCircleIcon
                    style={{
                      fontSize: "3em",
                      cursor: "pointer",
                      color: "#4782da",
                      display: items.length === 1 ? "none" : "",
                    }}
                    onClick={() => handleRemoveClick(item.slip_no)}
                  />
                  <AddCircleIcon
                    onClick={handleAddClick}
                    style={{
                      fontSize: "3em",
                      cursor: "pointer",
                      color: "#4782da",
                    }}
                  />
                </div>
              </Grid>
            </Grid>
          );
        })}
        <Grid
          container
          justifyContent="center"
          style={{ margin: "2em auto 0" }}
        >
          <Button
            variant="contained"
            color="primary"
            size="medium"
            onClick={handleOpen}
            style={{ width: "100%", maxWidth: "220px" }}
          >
            Add Items
          </Button>
        </Grid>
      </Box>
      <div>
        <MaterialTable
          columns={columns}
          data={data}
          onSelectionChange={(selectedRows) => console.log(selectedRows)}
          options={{
            sorting: true,
            search: true,
            searchFieldAlignment: "right",
            searchAutoFocus: true,
            searchFieldVariant: "standard",
            filtering: true,
            paging: true,
            pageSizeOptions: [2, 5, 10, 20, 25, 50, 100],
            pageSize: 5,
            paginationType: "stepped",
            showFirstLastPageButtons: false,
            paginationPosition: "both",
            exportButton: true,
            exportAllData: true,
            exportFileName: "items",
            addRowPosition: "first",
            showSelectAllCheckbox: false,
            showTextRowsSelected: false,
            selectionProps: (rowData) => ({
              disabled: rowData.age == null,
            }),
            columnsButton: true,
            rowStyle: (data, index) =>
              index % 2 === 0 ? { background: "#f5f5f5" } : null,
            headerStyle: { background: "#376fd0", color: "#fff" },
          }}
          title="Material Issue"
          icons={{ Add: () => <AddIcon /> }}
        />
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Popup tableValues={items} />
          <Grid
            container
            justifyContent="center"
            style={{ margin: "2em auto 0" }}
          >
            <Button
              variant="contained"
              color="primary"
              size="medium"
              onClick={handleSubmit}
              style={{ width: "100%", maxWidth: "220px" }}
            >
              Submit
            </Button>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}

export default MaterialIssue;
