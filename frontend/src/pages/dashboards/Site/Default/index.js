import React from "react";
import styled from "styled-components/macro";

import { Helmet } from "react-helmet-async";

import {
  Grid,
  Divider as MuiDivider,
  Typography as MuiTypography,
} from "@material-ui/core";

import { spacing } from "@material-ui/system";

import { green, red } from "@material-ui/core/colors";

import Actions from "./Actions";
import BarChart from "./BarChart";
import LineChart from "./LineChart";
import DoughnutChart from "./DoughnutChart";
import Stats from "./Stats";
import Table from "./Table";

const Divider = styled(MuiDivider)(spacing);

const Typography = styled(MuiTypography)(spacing);

function Default() {
  return (
    <React.Fragment>
      <Helmet title="Company Name" />
      <Grid justify="space-between" container spacing={6}>
        <Grid item>
          <Typography variant="h3" gutterBottom>
            Store Name
          </Typography>
        </Grid>

        <Grid item>
          <Actions />
        </Grid>
      </Grid>

      <Divider my={6} />

      <Grid container spacing={6}>
        <Grid item xs={12} sm={12} md={6} lg={3} xl>
          <Stats
            title="Coke Plant"
            amount="₹ 19900"
            chip="Muzaffar Iqbal"
            percentageText="EC01"
            percentagecolor={green[500]}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default Default;
