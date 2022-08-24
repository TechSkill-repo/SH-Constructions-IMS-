import React, { useState } from "react";
import ConsumablesForm from "../ConsumablesItems/ConsumablesForm";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { Typography } from "@material-ui/core";
import ConsumablesTable from "../ConsumablesItems/ConsumablesTable";
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from "@material-ui/icons/Add";
import Box from "@mui/material/Box";

function NonConsumable() {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <Grid container spacing={4} alignItems="center" justifyContent="center">
        <Grid item xs={10} >
          <Typography variant="h3" gutterBottom gutterLeft>
            Non Consumable Items
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Button
            variant="contained"
            size="medium"
            onClick={() => {
              setShowForm(!showForm);
            }}
          >
            {showForm ? [<CloseIcon />, "Close"] : [<AddIcon />, " Add items"]}
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

export default NonConsumable;
