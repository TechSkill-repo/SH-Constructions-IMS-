import React, { useEffect, useState } from "react";
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

import { getConsumableTotalPrice, getNonConsumableTotalPrice } from "../../../../services/materialService";

const Divider = styled(MuiDivider)(spacing);

const Typography = styled(MuiTypography)(spacing);

function Default() {
  const userDetails = window.sessionStorage.getItem("user");
  const userRole = JSON.parse(userDetails);
  const [totalC, setTotalC] = useState(0);
  const [totalNC, setTotalNC] = useState(0);

  useEffect(() => {
    getConsumableTotalPrice().then(data => setTotalC(data.total)).catch(err => console.log(err));
    getNonConsumableTotalPrice().then(data => setTotalNC(data.total)).catch(err => console.log(err));
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

      <Grid container spacing={6}>
        <Grid item xs={12} sm={12} md={6} lg={3} xl>
          <Stats
            title="Coke Plant"
            amountC={totalC}
            amountNC={totalNC}
            chip="Muzaffar Iqbal"
            percentageText="EC01"
            percentagecolor={green[500]}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={3} xl>
          <Stats
            title="RMM"
            amountC={totalC}
            amountNC={totalNC}
            chip="Anurag"
            percentageText="E22"
            percentagecolor={red[500]}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={3} xl>
          <Stats
            title="RMBB"
            amountC={totalC}
            amountNC={totalNC}
            chip="Ramesh Sharma"
            percentageText="E13"
            percentagecolor={green[500]}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={3} xl>
          <Stats
            title="RMBB2"
            amountC={totalC}
            amountNC={totalNC}
            chip="Love Gope"
            percentageText="E17"
            percentagecolor={red[500]}
          />
        </Grid>
      </Grid>
      <Grid container spacing={6}>
        <Grid item xs={12} sm={12} md={6} lg={3} xl>
          <Stats
            title="GBF"
            amountC={totalC}
            amountNC={totalNC}
            chip="RK Srivastava"
            percentageText="E27"
            percentagecolor={green[500]}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={3} xl>
          <Stats
            title="SP#1,2"
            amountC={totalC}
            amountNC={totalNC}
            chip="Chandan Singh"
            percentageText="E23"
            percentagecolor={green[500]}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={3} xl>
          <Stats
            title="SP#3,4"
            amountC={totalC}
            amountNC={totalNC}
            chip="Manoj Mishra"
            percentageText="E15"
            percentagecolor={red[500]}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={3} xl>
          <Stats
            title="MM"
            amountC={totalC}
            amountNC={totalNC}
            chip="Hashim Khan"
            percentageText="E25"
            percentagecolor={red[500]}
          />
        </Grid>
      </Grid>
      <Grid container spacing={6}>
        <Grid item xs={12} sm={12} md={6} lg={3} xl>
          <Stats
            title="LD#01"
            amountC={totalC}
            amountNC={totalNC}
            chip="Prabhat Singh"
            percentageText="E20"
            percentagecolor={green[500]}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={3} xl>
          <Stats
            title="PALLET PLANT"
            amountC={totalC}
            amountNC={totalNC}
            chip="Bablu Panday"
            percentageText="E30"
            percentagecolor={red[500]}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={3} xl>
          <Stats
            title="MRSPP"
            amountC={totalC}
            amountNC={totalNC}
            chip="Santosh Panday"
            percentageText="E28"
            percentagecolor={green[500]}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={3} xl>
          <Stats
            title="Line Plant"
            amountC={totalC}
            amountNC={totalNC}
            chip="Imteyaz Ahmed"
            percentageText="I11"
            percentagecolor={red[500]}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default Default;
