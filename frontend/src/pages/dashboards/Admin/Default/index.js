import React, { useEffect, useState } from "react";
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
import { centralStoreRequisition } from "../../../../services/socketService";
import { Close } from "@material-ui/icons";

const Divider = styled(MuiDivider)(spacing);

const Typography = styled(MuiTypography)(spacing);

function Default() {
  const userDetails = window.sessionStorage.getItem("user");
  const userRole = JSON.parse(userDetails);
  const [elements, setElements] = useState([]);
  const [viewMore, setViewMore] = useState(false);
  const [open, setOpen] = useState(false);

  const handleViewMore = () => setViewMore(!viewMore);

  useEffect(() => {
    centralStoreRequisition(() => {
      setElements(prevElements => [...prevElements, "Central Store requisition"]);
      setOpen(true);
    });
  }, []);

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

      <Divider my={6} />

      <div>
        <Box sx={{ width: '100%' }}>
          <Collapse in={open}>
            {elements.map((element, index) => {
              return <Alert
                key={index}
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      setOpen(false);
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

      <Grid container spacing={6}>
        <Grid item xs={12} sm={12} md={6} lg={4} xl>
          <Stats
            title="Gloves"
            amount="200"
            chip="Today"
            percentageText="On Stock"
            percentagecolor={green[500]}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={4} xl>
          <Stats
            title="Gloves"
            amount="2"
            chip="Annual"
            percentageText="Low Stock"
            percentagecolor={red[500]}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={4} xl>
          <Stats
            title="Order Compleated"
            amount="24300"
            chip="Yearly"
            percentageText="+18%"
            percentagecolor={green[500]}
          />
        </Grid>

        {viewMore && (
          <>
            <Grid container>
              <Grid item xs={12} sm={12} md={6} lg={4} xl>
                <Stats
                  title="Pending Orders"
                  amount="45"
                  chip="Today"
                  percentageText="-9%"
                  percentagecolor={red[500]}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={4} xl>
                <Stats
                  title="Pending Orders"
                  amount="45"
                  chip="Today"
                  percentageText="-9%"
                  percentagecolor={red[500]}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={4} xl>
                <Stats
                  title="Pending Orders"
                  amount="45"
                  chip="Today"
                  percentageText="-9%"
                  percentagecolor={red[500]}
                />
              </Grid>
            </Grid>

            <Grid container>
              <Grid item xs={12} sm={12} md={6} lg={4} xl>
                <Stats
                  title="Pending Orders"
                  amount="45"
                  chip="Today"
                  percentageText="-9%"
                  percentagecolor={red[500]}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={4} xl>
                <Stats
                  title="Pending Orders"
                  amount="45"
                  chip="Today"
                  percentageText="-9%"
                  percentagecolor={red[500]}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={4} xl>
                <Stats
                  title="Pending Orders"
                  amount="45"
                  chip="Today"
                  percentageText="-9%"
                  percentagecolor={red[500]}
                />
              </Grid>
            </Grid>

            <Grid container>
              <Grid item xs={12} sm={12} md={6} lg={4} xl>
                <Stats
                  title="Pending Orders"
                  amount="45"
                  chip="Today"
                  percentageText="-9%"
                  percentagecolor={red[500]}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={4} xl>
                <Stats
                  title="Pending Orders"
                  amount="45"
                  chip="Today"
                  percentageText="-9%"
                  percentagecolor={red[500]}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={4} xl>
                <Stats
                  title="Pending Orders"
                  amount="45"
                  chip="Today"
                  percentageText="-9%"
                  percentagecolor={red[500]}
                />
              </Grid>
            </Grid>
          </>
        )}
      </Grid>
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
