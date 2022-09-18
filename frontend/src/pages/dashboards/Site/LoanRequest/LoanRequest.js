import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@mui/material/InputLabel";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import { fetchDetails, getMcodes } from "../../../../services/materialService";
import { requestLoan, getLoans } from "../../../../services/loanService";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Alert from "@mui/material/Alert";
import Grid from "@mui/material/Grid";
import { Typography } from "@material-ui/core";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Popup from "./Popup";
import Modal from "@mui/material/Modal";
import MaterialTable from "material-table";

function LoanRequest() {
  const [showSuccess, setShowSuccess] = useState(false);

  const uniqueId = () => {
    var id = "id" + Math.random().toString(16).slice(2);
    return id.substring(3, 8);
  };

  const user = JSON.parse(window.sessionStorage.getItem("user"));

  const [mcodes, setMcodes] = useState([]);

  const [items, setItems] = useState([
    {
      receiverStoreId: user ? user.storeId : "",
      slip_no: uniqueId(),
      mcode: "",
      mname: "",
      mdescription: "",
      rqDate: getCurrentDate(),
      uom: "",
      category: "",
      mquantity: "",
      incharge_name: "",
      requestedStoreId: "",
    },
  ]);

  const [data, setData] = useState([]);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    async function fetch() {
      await getMcodes()
        .then((data) => setMcodes(data.codes))
        .catch((err) => console.log(err));

      await getLoans()
        .then((resp) => {
          const oldData = resp.items;
          const newData = oldData.filter(
            (item) => item.receiverStoreId === user.storeId
          );
          setData(newData);
        })
        .catch((err) => {
          console.log(err.response);
        });
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

  const columns = [
    { title: "Slip.No", field: "slip_no", filterPlaceholder: "filter" },
    // { title: "Date", field: "rqDate", filterPlaceholder: "filter" },
    {
      title: "Req.Store",
      field: "requestedStoreId",
      filterPlaceholder: "filter",
    },
    { title: "M.Name", field: "mname", filterPlaceholder: "filter" },
    { title: "M.Code", field: "mcode", filterPlaceholder: "filter" },
    {
      title: "M.Des",
      field: "mdescription",
      filterPlaceholder: "filter",
    },
    { title: "U.O.M", field: "uom", filterPlaceholder: "filter" },
    {
      title: "Qty.Req",
      field: "mquantity",
      filterPlaceholder: "filter",
    },
    {
      title: "Category",
      field: "category",
      filterPlaceholder: "filter",
    },
    {
      title: "Qty.App",
      field: "lendQuantity",
      filterPlaceholder: "filter",
    },
    {
      title: "Status",
      filterPlaceholder: "filter",
      render: (rowData) =>
        rowData.lendQuantity?.length ? (
          <div style={{ width: "100%", textAlign: "center" }}>
            <span
              style={{
                backgroundColor: "rgba(76,175,80,0.1)",
                color: "#4caf50",
                borderRadius: "3px",
                padding: "5px 8px",
              }}
            >
              Approvable
            </span>
          </div>
        ) : (
          <div style={{ width: "100%", textAlign: "center" }}>
            <span
              style={{
                backgroundColor: "rgba(244,67,54,0.1)",
                color: "#f44336",
                borderRadius: "3px",
                padding: "5px 8px",
              }}
            >
              Pending
            </span>
          </div>
        ),
    },
  ];

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
        receiverStoreId: user ? user.storeId : "",
        slip_no: uniqueId(),
        mcode: "",
        mname: "",
        mdescription: "",
        rqDate: getCurrentDate(),
        uom: "",
        category: "",
        mquantity: "",
        incharge_name: "",
        requestedStoreId: "",
      },
    ]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSuccess(true);

    items.map((item) => {
      requestLoan(item)
        .then((resp) => {
          console.log(resp);
        })
        .catch((err) => {
          console.log(err);
        });
    });

    setTimeout(() => {
      setShowSuccess(false);
      window.location.href = "/loan-request";
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
        // onSubmit={handleSubmit}
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="h3">Loan Request Form</Typography>
        {items.map((item, index) => {
          return (
            <Grid
              container
              spacing={2}
              alignItems="end"
              justifyContent="center"
              key={index.toString()}
            >
              <Grid item xs={12} md={4}>
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
              <Grid item xs={12} md={4}>
                <TextField
                  variant="outlined"
                  name="mquantity"
                  label="Loan Amount"
                  type="text"
                  value={item.mquantity}
                  onChange={(e) => {
                    handleInputChange(item.slip_no, e);
                  }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  variant="outlined"
                  name="requestedStoreId"
                  label="Requested store Id"
                  type="text"
                  value={item.requestedStoreId}
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
            size="medium"
            onClick={handleOpen}
            style={{ width: "100%", maxWidth: "220px" }}
          >
            Add Items
          </Button>
        </Grid>
      </Box>
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
              size="medium"
              onClick={handleSubmit}
              style={{ width: "100%", maxWidth: "220px" }}
            >
              Submit
            </Button>
          </Grid>
        </Box>
      </Modal>

      <Grid
        container
        spacing={2}
        alignItems="center"
        style={{ marginBottom: "0.8em" }}
      >
        <Grid item xs={11}>
          <Typography variant="h5" gutterBottom>
            Lone Requests:
            <span style={{ fontWeight: "900", color: "#376fd0" }}>
              {" "}
              {user.storeId}{" "}
            </span>
          </Typography>
        </Grid>
      </Grid>
      <Grid
        container
        spacing={2}
        alignItems="center"
        style={{ justifyContent: "center" }}
      ></Grid>
      <Box component="div" sx={{ mt: 2 }}>
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
            actionsColumnIndex: -1,
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
          title="Lone Requests"
          icons={{ Add: () => <AddIcon /> }}
        />
      </Box>
    </div>
  );
}

export default LoanRequest;
