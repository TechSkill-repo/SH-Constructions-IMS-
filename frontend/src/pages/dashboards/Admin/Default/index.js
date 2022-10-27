import React, { useState } from "react";
import styled from "styled-components/macro";

import { Helmet } from "react-helmet-async";
import { Button, Box, Alert, Snackbar, IconButton, Collapse } from "@mui/material";

import {
  Grid,
  Divider as MuiDivider,
  Typography as MuiTypography,
} from "@material-ui/core";

import { spacing } from "@material-ui/system";

import { green, red } from "@material-ui/core/colors";

import Actions from "./Actions";
import Stats from "./Stats";
import LineChart from "./LineChart";
import DoughnutChart from "./DoughnutChart";
import BarChart from "./BarChart";
import Table from "./Table";
import { useSelector, useDispatch } from "react-redux";
import { remove } from "../../../../redux/reducers/adminReducer";
import { Close } from "@material-ui/icons";

const Divider = styled(MuiDivider)(spacing);

const Typography = styled(MuiTypography)(spacing);

function Default() {
  const userDetails = window.sessionStorage.getItem("user");
  const userRole = JSON.parse(userDetails);
  const [viewMore, setViewMore] = useState(false);

  const { elements } = useSelector(state => state.admin);
  const dispatch = useDispatch();

  const handleViewMore = () => setViewMore(!viewMore);
  console.log("elements",elements)

  return (
    <React.Fragment>
      <Helmet title="S.H Construction" />
      <Grid justify="space-between" container spacing={6}>
        <Grid item>
          <Typography variant="h3" gutterBottom>
            S.H Construction {`${userRole.role}`} Dashboard
          </Typography>
          <Typography variant="h7" gutterBottom>
            Welcome back, Admin! 👋
          </Typography>
        </Grid>
        <Grid item>
          <Actions />
        </Grid>
      </Grid>

      <Divider my={6} />
      <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
{/* Same as */}
<ToastContainer />
      <div>
        <Box sx={{ width: '100%' }}>
         
            {elements.map((element, index) => {
              return <Alert
                key={index}
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      dispatch(remove(index))
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
         
        </Box>
      </div>

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

      {
        viewMore && <>
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

        </>

      }
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Button onClick={handleViewMore} variant="contained" sx={{
          marginTop: "20px"
        }}>
          {viewMore ? "View Less" : "View More"}
        </Button>
      </Box>
      <div
        style={{
          textAlign: "center",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "50px",
          color: "#233044",
          fontSize: "25px",
        }}
      >
        <h1>👷‍♂️</h1>
        <h1>Admin Dashboard Under Construction 🛠</h1>
      </div>

      <Grid container spacing={6}>
        <Grid item xs={12} lg={8}>
          <LineChart />
        </Grid>
        <Grid item xs={12} lg={4}>
          <DoughnutChart />
        </Grid>
      </Grid>
      <Grid container spacing={6}>
        <Grid item xs={12} lg={4}>
          <BarChart />
        </Grid>
        <Grid item xs={12} lg={8}>
          <Table />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default Default;
