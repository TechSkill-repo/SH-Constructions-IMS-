import React, { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { issueNonConsumableMaterial } from "../../../../services/issueService";

function MIConsumableForm({ storeId }) {
    const [date, setDate] = useState(getCurrentDate());
    const [issue_slip_no, setIssue_slip_no] = useState("");
    const [mname, setMname] = useState("");
    const [mdescription, setMdescription] = useState("");
    const [uom, setUom] = useState("");
    const [mquantity, setMquantity] = useState("");
    const [showSuccess, setShowSuccess] = useState(false);
    const [mcode, setMcode] = useState("");

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

        issueNonConsumableMaterial({ mcode, mname, mdescription, uom, date, storeId, issue_slip_no, mquantity })
            .then(resp => {
                console.log(resp.data);
            }).catch(err => {
                console.log(err);
            });

        setTimeout(() => {
            setShowSuccess(false);
            window.location.href = "/mi-non-consumables-table/" + storeId;
        }, 3000);
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
                Non-Consumable Form
            </Typography>
            {showSuccess && (
                <Alert severity="success" sx={{ my: 3 }}>
                    This is a success alert — check it out!
                </Alert>
            )}
            <Grid container spacing={2} alignItems="center" justifyContent="center">
                <Grid item xs={12} md={6}>
                    <TextField
                        id="date"
                        label="Date"
                        type="text"
                        value={date}
                        onChange={(e) => {
                            setDate(e.target.value);
                        }}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        id="issue_slip_no"
                        label="Issue Slip No."
                        type="text"
                        value={issue_slip_no}
                        onChange={(e) => {
                            setIssue_slip_no(e.target.value);
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
                <Grid item xs={12}>
                    <TextField
                        id="mdescription"
                        label="Material Description"
                        type="text"
                        value={mdescription}
                        onChange={(e) => {
                            setMdescription(e.target.value);
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
                        id="mquantity"
                        label="M. Quantity"
                        type="text"
                        value={mquantity}
                        onChange={(e) => {
                            setMquantity(e.target.value);
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

export default MIConsumableForm;