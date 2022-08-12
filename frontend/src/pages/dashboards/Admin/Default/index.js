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
    // <React.Fragment>
    //   <Helmet title="Company Name" />
    //   <Grid justify="space-between" container spacing={6}>
    //     <Grid item>
    //       <Typography variant="h3" gutterBottom>
    //        Company Name
    //       </Typography>
    //     </Grid>

    //     <Grid item>
    //       <Actions />
    //     </Grid>
    //   </Grid>

    //   <Divider my={6} />

    //   <Grid container spacing={6}>
    //     <Grid item xs={12} sm={12} md={6} lg={3} xl>
    //       <Stats
    //         title="Past Order"
    //         amount="2532"
    //         chip="Today"
    //         percentageText="+26%"
    //         percentagecolor={green[500]}
    //       />
    //     </Grid>
    //     <Grid item xs={12} sm={12} md={6} lg={3} xl>
    //       <Stats
    //         title="Ongoing Order"
    //         amount="1702"
    //         chip="Annual"
    //         percentageText="-14%"
    //         percentagecolor={red[500]}
    //       />
    //     </Grid>
    //     <Grid item xs={12} sm={12} md={6} lg={3} xl>
    //       <Stats
    //         title="Order Compleated"
    //         amount="$ 24300"
    //         chip="Yearly"
    //         percentageText="+18%"
    //         percentagecolor={green[500]}
    //       />
    //     </Grid>
    //     <Grid item xs={12} sm={12} md={6} lg={3} xl>
    //       <Stats
    //         title="Pending Orders"
    //         amount="45"
    //         chip="Today"
    //         percentageText="-9%"
    //         percentagecolor={red[500]}
    //       />
    //     </Grid>
    //   </Grid>

    //   <Grid container spacing={6}>
    //     <Grid item xs={12} lg={8}>
    //       <LineChart />
    //     </Grid>
    //     <Grid item xs={12} lg={4}>
    //       <DoughnutChart />
    //     </Grid>
    //   </Grid>
    //   <Grid container spacing={6}>
    //     <Grid item xs={12} lg={4}>
    //       <BarChart />
    //     </Grid>
    //     <Grid item xs={12} lg={8}>
    //       <Table />
    //     </Grid>
    //   </Grid>
    // </React.Fragment>
    <h1>Admin Under Construction</h1>
  );
}

export default Default;
