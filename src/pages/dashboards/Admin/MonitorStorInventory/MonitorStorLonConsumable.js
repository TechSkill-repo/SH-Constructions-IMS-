import { Grid, Typography } from "@material-ui/core";
import React from "react";
// import Stats from "../Default/Stats";
import Stats from "./Stats";
import { green, red } from "@material-ui/core/colors";
import { Helmet } from "react-helmet-async";
import Actions from "../Default/Actions";
import styled from "styled-components";
import { spacing } from "@material-ui/system";
import { Divider as MuiDivider } from "@material-ui/core";
import { Link, Router, useLocation } from "react-router-dom";

const Divider = styled(MuiDivider)(spacing);

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

function MonitorStorLonConsumable(props) {
  let query = useQuery();

  let childProps = query.get("store-id");

  console.log(props.title);
  console.log(childProps);
  return (
    <div>
      <Helmet title="S.H Construction" />
      <Grid justify="space-between" container spacing={6}>
        <Grid item>
          <Typography variant="h3" gutterBottom>
            Stores Consumables Inventory
          </Typography>
        </Grid>
        <Grid item>
          <Actions />
        </Grid>
      </Grid>

      <Divider my={8} />

      <Grid container spacing={6}>
        <Grid item xs={12} sm={12} md={6} lg={3} xl>
          <Link
            style={{ textDecoration: "none" }}
            to="/store-inventory/consumable/EC01"
          >
            <Stats
              title="EC01"
              amount="Coke Plant"
              chip="Muzaffar Iqbal"
              percentageText="EC01"
              percentagecolor={green[500]}
            />
          </Link>
        </Grid>

        <Grid item xs={12} sm={12} md={6} lg={3} xl>
          <Link
            style={{ textDecoration: "none" }}
            to="/store-inventory/consumable/E22"
          >
            <Stats
              title="E22"
              amount="RMM"
              chip="Anurag"
              percentageText="E22"
              percentagecolor={red[500]}
            />
          </Link>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={3} xl>
          <Link
            style={{ textDecoration: "none" }}
            to="/store-inventory/consumable/E13"
          >
            <Stats
              title="E13"
              amount="RMBB"
              chip="Ramesh Sharma"
              percentageText="E13"
              percentagecolor={green[500]}
            />
          </Link>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={3} xl>
          <Link
            style={{ textDecoration: "none" }}
            to="/store-inventory/consumable/E17"
          >
            <Stats
              title="E17"
              amount="RMBB2"
              chip="Love Gope"
              percentageText="E17"
              percentagecolor={red[500]}
            />
          </Link>
        </Grid>
      </Grid>
      <Grid container spacing={6}>
        <Grid item xs={12} sm={12} md={6} lg={3} xl>
          <Link
            style={{ textDecoration: "none" }}
            to="/store-inventory/consumable/E27"
          >
            <Stats
              title="E27"
              amount="GBF"
              chip="RK Srivastava"
              percentageText="E27"
              percentagecolor={green[500]}
            />
          </Link>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={3} xl>
          <Link
            style={{ textDecoration: "none" }}
            to="/store-inventory/consumable/E15"
          >
            <Stats
              title="E15"
              amount="SP#3,4"
              chip="Manoj Mishra"
              percentageText="E15"
              percentagecolor={red[500]}
            />
          </Link>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={3} xl>
          <Link
            style={{ textDecoration: "none" }}
            to="/store-inventory/consumable/E23"
          >
            <Stats
              title="E23"
              amount="SP#1,2"
              chip="Chandan Singh"
              percentageText="E23"
              percentagecolor={green[500]}
            />
          </Link>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={3} xl>
          <Link
            style={{ textDecoration: "none" }}
            to="/store-inventory/consumable/E24"
          >
            <Stats
              title="E24"
              amount="MM"
              chip="Hashim Khan"
              percentageText="E25"
              percentagecolor={red[500]}
            />
          </Link>
        </Grid>
      </Grid>
      <Grid container spacing={6}>
        <Grid item xs={12} sm={12} md={6} lg={3} xl>
          <Link
            style={{ textDecoration: "none" }}
            to="/store-inventory/consumable/E20"
          >
            <Stats
              title="E20"
              amount="LD#01"
              chip="Prabhat Singh"
              percentageText="E20"
              percentagecolor={green[500]}
            />
          </Link>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={3} xl>
          <Link
            style={{ textDecoration: "none" }}
            to="/store-inventory/consumable/E30"
          >
            <Stats
              title="E30"
              amount="PALLET PLANT"
              chip="Bablu Panday"
              percentageText="E30"
              percentagecolor={red[500]}
            />
          </Link>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={3} xl>
          <Link
            style={{ textDecoration: "none" }}
            to="/store-inventory/consumable/E28"
          >
            <Stats
              title="E28"
              amount="MRSPP"
              chip="Santosh Panday"
              percentageText="E28"
              percentagecolor={green[500]}
            />
          </Link>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={3} xl>
          <Link
            style={{ textDecoration: "none" }}
            to="/store-inventory/consumable/I11"
          >
            <Stats
              title="I11"
              amount="LIME PLNT"
              chip="Imteyaz Ahmed"
              percentageText="I11"
              percentagecolor={red[500]}
            />
          </Link>
        </Grid>
      </Grid>
    </div>
  );
}

export default MonitorStorLonConsumable;
