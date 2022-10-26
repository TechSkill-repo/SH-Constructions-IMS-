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
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";

import Actions from "./Actions";
import BarChart from "./BarChart";
import LineChart from "./LineChart";
import DoughnutChart from "./DoughnutChart";
import Stats from "./Stats";
import Table from "./Table";
import { Box, Alert, IconButton, Collapse } from "@mui/material";

import { Close } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { remove } from "../../../../redux/reducers/centralReducer";

const Divider = styled(MuiDivider)(spacing);

const Typography = styled(MuiTypography)(spacing);

function Default() {
  const userDetails = window.sessionStorage.getItem("user");
  const userRole = JSON.parse(userDetails);

  const { elements } = useSelector(state => state.central);
  const dispatch = useDispatch();

  return (
    <React.Fragment>
      <Helmet title="S.H Construction" />
      <Grid justify="space-between" container spacing={6}>
        <Grid item>
          <Typography variant="h3" gutterBottom>
            S.H Construction {`${userRole.role}`} Dashboard
          </Typography>
          <Typography variant="h7" gutterBottom>
            Welcome back, Lucy! We've missed you. 👋
          </Typography>
        </Grid>
        <Grid item>
          <Actions />
        </Grid>
      </Grid>

      <div>
        <Box sx={{ width: '100%', marginTop: "6px" }} >
          <Collapse in={true}>
            {elements.map(element => {
              return <Alert
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      dispatch(remove());
                    }}
                  >
                    <Close fontSize="inherit" />
                  </IconButton>
                }
                sx={{ mb: 2 }}
              >
                {element}
              </Alert>
            })}
          </Collapse>
        </Box>
      </div>

      <Divider my={6} />

      <Grid container spacing={6}>
        <Grid item xs={12} sm={12} md={6} lg={4} xl>
          <Stats
            title="Coke Plant"
            chip="Muzaffar Iqbal"
            percentageText="EC01"
            percentagecolor={green[500]}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={4} xl>
          <Stats
            title="RMM"
            chip="Anurag"
            percentageText="E22"
            percentagecolor={red[500]}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={4} xl>
          <Stats
            title="RMBB"
            chip="Ramesh Sharma"
            percentageText="E13"
            percentagecolor={green[500]}
          />
        </Grid>

      </Grid>
      <Grid container spacing={6}>
        <Grid item xs={12} sm={12} md={6} lg={4} xl>
          <Stats
            title="RMBB2"
            chip="Love Gope"
            percentageText="E17"
            percentagecolor={red[500]}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={4} xl>
          <Stats
            title="GBF"
            chip="RK Srivastava"
            percentageText="E27"
            percentagecolor={green[500]}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={4} xl>
          <Stats
            title="SP#1,2"
            chip="Chandan Singh"
            percentageText="E23"
            percentagecolor={green[500]}
          />
        </Grid>

      </Grid>
      <Grid container spacing={6}>
        <Grid item xs={12} sm={12} md={6} lg={4} xl>
          <Stats
            title="SP#3,4"
            chip="Manoj Mishra"
            percentageText="E15"
            percentagecolor={red[500]}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={4} xl>
          <Stats
            title="MM"
            chip="Hashim Khan"
            percentageText="E24"
            percentagecolor={red[500]}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={4} xl>
          <Stats
            title="LD#01"
            chip="Prabhat Singh"
            percentageText="E20"
            percentagecolor={green[500]}
          />
        </Grid>

      </Grid>
      <Grid container spacing={6}>
        <Grid item xs={12} sm={12} md={6} lg={4} xl>
          <Stats
            title="PALLET PLANT"
            chip="Bablu Panday"
            percentageText="E30"
            percentagecolor={red[500]}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={4} xl>
          <Stats
            title="MRSPP"
            chip="Santosh Panday"
            percentageText="E28"
            percentagecolor={green[500]}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={4} xl>
          <Stats
            title="Line Plant"
            chip="Imteyaz Ahmed"
            percentageText="I11"
            percentagecolor={green[500]}
          />
        </Grid>

      </Grid>
    </React.Fragment>
  );
}

export default Default;
