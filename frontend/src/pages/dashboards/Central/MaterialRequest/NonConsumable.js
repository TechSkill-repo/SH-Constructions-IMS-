import { Grid, Typography } from "@material-ui/core";
import React from "react";
import Stats from "../Default/Stats";
// import Stats from "./Stats";
import { green, red } from "@material-ui/core/colors";
import { Helmet } from "react-helmet-async";
import Actions from "../Default/Actions";
import styled from "styled-components";
import { spacing } from "@material-ui/system";
import { Divider as MuiDivider } from "@material-ui/core";
import { Link } from "react-router-dom";

const Divider = styled(MuiDivider)(spacing);

function NonConsumable() {
  return (
    <div>
      <Helmet title="S.H Construction" />
      <Grid justify="space-between" container spacing={6}>
        <Grid item>
          <Typography variant="h3" gutterBottom>
            Material Request Non-Consumable Items
          </Typography>
        </Grid>
        <Grid item>
          <Actions />
        </Grid>
      </Grid>

      <Divider my={8} />

      <Grid container spacing={6}>
        <Grid item xs={12} sm={12} md={6} lg={3} xl>
          <Link style={{ textDecoration: "none" }} to="/non-consumables-items/125">
            <Stats
              title="EC01"
              amount="Coke Plant"
              chip="Site Store"
              percentageText="EC01"
              percentagecolor={green[500]}
            />
          </Link>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={3} xl>
          <Stats
            title="E22"
            amount="RMM"
            chip="Site Store"
            percentageText="E22"
            percentagecolor={red[500]}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={3} xl>
          <Stats
            title="E13"
            amount="RMBB"
            chip="Site Store"
            percentageText="E13"
            percentagecolor={green[500]}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={3} xl>
          <Stats
            title="E17"
            amount="RMBB2"
            chip="Site Store"
            percentageText="E17"
            percentagecolor={red[500]}
          />
        </Grid>
      </Grid>
      <Grid container spacing={6}>
        <Grid item xs={12} sm={12} md={6} lg={3} xl>
          <Stats
            title="E27"
            amount="GBF"
            chip="Site Store"
            percentageText="E27"
            percentagecolor={green[500]}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={3} xl>
          <Stats
            title="E15"
            amount="SP#3,4"
            chip="Site Store"
            percentageText="E15"
            percentagecolor={red[500]}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={3} xl>
          <Stats
            title="E23"
            amount="SP#1,2"
            chip="Site Store"
            percentageText="E23"
            percentagecolor={green[500]}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={3} xl>
          <Stats
            title="E24"
            amount="MM"
            chip="Site Store"
            percentageText="E25"
            percentagecolor={red[500]}
          />
        </Grid>
      </Grid>
      <Grid container spacing={6}>
        <Grid item xs={12} sm={12} md={6} lg={3} xl>
          <Stats
            title="E20"
            amount="LD#01"
            chip="Site Store"
            percentageText="E20"
            percentagecolor={green[500]}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={3} xl>
          <Stats
            title="E20"
            amount="PALLET PLANT"
            chip="Site Store"
            percentageText="E30"
            percentagecolor={red[500]}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={3} xl>
          <Stats
            title="E28"
            amount="MRSPP"
            chip="Site Store"
            percentageText="E28"
            percentagecolor={green[500]}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={3} xl>
          <Stats
            title="I11"
            amount="LINE PLANT"
            chip="Site Store"
            percentageText=""
            percentagecolor={red[500]}
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default NonConsumable;
