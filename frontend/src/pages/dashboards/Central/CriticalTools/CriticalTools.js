import { Grid, Typography } from "@material-ui/core";
import React from "react";
import Stats from "./Stats";
// import Stats from "./Stats";
import { green, red } from "@material-ui/core/colors";
import { Helmet } from "react-helmet-async";
import Actions from "../Default/Actions";
import styled from "styled-components";
import { spacing } from "@material-ui/system";
import { Divider as MuiDivider } from "@material-ui/core";
import { Link, Router, useLocation } from "react-router-dom";

const Divider = styled(MuiDivider)(spacing);

function CriticalTools(props) {
  return (
    <div>
      <Helmet title="S.H Construction" />
      <Grid justify="space-between" container spacing={6}>
        <Grid item>
          <Typography variant="h3" gutterBottom>
            Critical Tools
          </Typography>
        </Grid>
        <Grid item>
          <Actions />
        </Grid>
      </Grid>

      <Divider my={8} />

      <Grid container spacing={6}>
        <Grid item xs={12} sm={12} md={6} lg={3} xl>
          <Link style={{ textDecoration: "none" }} to="/critical-tool/CB01">
            <Stats
              title="SHCB001"
              amount="Chain Block"
              chip="Muzaffar Iqbal"
              percentageText="Ton.s"
              percentagecolor={green[500]}
            />
          </Link>
        </Grid>

        <Grid item xs={12} sm={12} md={6} lg={3} xl>
          <Link style={{ textDecoration: "none" }} to="/critical-tool/DS01">
            <Stats
              title="SHDS002"
              amount="D-Shackle"
              chip="Anurag"
              percentageText="Ton.s"
              percentagecolor={red[500]}
            />
          </Link>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={3} xl>
          <Link style={{ textDecoration: "none" }} to="/critical-tool/BS01">
            <Stats
              title="SHBS003"
              amount="Bow Shackle"
              chip="Ramesh Sharma"
              percentageText="Ton.s"
              percentagecolor={green[500]}
            />
          </Link>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={3} xl>
          <Link style={{ textDecoration: "none" }} to="/critical-tool/RS01">
            <Stats
              title="SHRS004"
              amount="Rope Sling"
              chip="Love Gope"
              percentageText="Meter"
              percentagecolor={red[500]}
            />
          </Link>
        </Grid>
      </Grid>
      <Grid container spacing={6}>
        <Grid item xs={12} sm={12} md={6} lg={3} xl>
          <Link style={{ textDecoration: "none" }} to="/critical-tool/WS01">
            <Stats
              title="SHWS001"
              amount="WEB Sling"
              chip="RK Srivastava"
              percentageText="Meter"
              percentagecolor={green[500]}
            />
          </Link>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={3} xl>
          <Link style={{ textDecoration: "none" }} to="/critical-tool/WM01">
            <Stats
              title="SHWM006"
              amount="Welding Machine"
              chip="Manoj Mishra"
              percentageText="No.s"
              percentagecolor={red[500]}
            />
          </Link>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={3} xl>
          <Link style={{ textDecoration: "none" }} to="/critical-tool/FE01">
            <Stats
              title="SHFX007"
              amount="Fire Ext"
              chip="Chandan Singh"
              percentageText="No.s"
              percentagecolor={green[500]}
            />
          </Link>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={3} xl>
          <Link style={{ textDecoration: "none" }} to="/critical-tool/GD01">
            <Stats
              title="SHGD08"
              amount="CO Gas Detector"
              chip="Hashim Khan"
              percentageText="No.s"
              percentagecolor={red[500]}
            />
          </Link>
        </Grid>
      </Grid>
    </div>
  );
}

export default CriticalTools;
