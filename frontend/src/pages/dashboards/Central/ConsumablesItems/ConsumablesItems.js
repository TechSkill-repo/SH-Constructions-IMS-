import React, { useState } from "react";
import ConsumablesForm from "./ConsumablesForm";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { Typography } from "@material-ui/core";
import ConsumablesTable from "./ConsumablesTable";
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from "@material-ui/icons/Add";
import Box from "@mui/material/Box";

function ConsumablesItems() {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <Grid container spacing={4} alignItems="center" justifyContent="center">
        <Grid item xs={11} >
          <Typography variant="h3" gutterBottom gutterLeft>
            Consumable Items
          </Typography>
        </Grid>
        <Grid item xs={1}>
          <Button
            variant="contained"
            size="medium"
            onClick={() => {
              setShowForm(!showForm);
            }}
          >
            {showForm ? <CloseIcon /> : <AddIcon />}
          </Button>
        </Grid>
      </Grid>
      <Grid container spacing={2} alignItems="center" justifyContent="center">
        <Grid item xs={9}>
          {showForm && <ConsumablesForm />}
        </Grid>
      </Grid>
      <Box component="div"
        sx={{ mt: 2 }}>
        <ConsumablesTable />
      </Box>
    </>
  );
}

export default ConsumablesItems;
