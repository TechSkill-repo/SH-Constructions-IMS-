import React,{useEffect, useState} from "react";
import styled from "styled-components/macro";

import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";

import {
 
  Card as MuiCard,
  CardContent as MuiCardContent,
  Chip as MuiChip,
  Typography as MuiTypography,
} from "@material-ui/core";
import Box from "@mui/material/Box";
import { rgba } from "polished";

import { spacing } from "@material-ui/system";

import {
  getConsumableTotalPrice,
  getNonConsumableTotalPrice,
} from "../../../../services/materialService";


const Card = styled(MuiCard)(spacing);

const Typography = styled(MuiTypography)(spacing);

const CardContent = styled(MuiCardContent)`
  position: relative;

  &:last-child {
    padding-bottom: ${(props) => props.theme.spacing(4)}px;
  }
`;

const Chip = styled(MuiChip)`
  position: absolute;
  top: 16px;
  right: 16px;
  height: 20px;
  padding: 4px 0;
  font-size: 85%;
  background-color: ${(props) => props.theme.palette.secondary.main};
  color: ${(props) => props.theme.palette.common.white};
  margin-bottom: ${(props) => props.theme.spacing(4)}px;

  span {
    padding-left: ${(props) => props.theme.spacing(2)}px;
    padding-right: ${(props) => props.theme.spacing(2)}px;
  }
`;

const Percentage = styled(MuiTypography)`
  span {
    color: ${(props) => props.percentagecolor};
    font-weight: ${(props) => props.theme.typography.fontWeightBold};
    background: ${(props) => rgba(props.percentagecolor, 0.1)};
    padding: 2px;
    border-radius: 3px;
    margin-right: ${(props) => props.theme.spacing(2)}px;
  }
`;

const Stats = ({ title, amount, chip, percentageText, percentagecolor }) => {

  const [totalC, setTotalC] = useState(0);
  const [totalNC, setTotalNC] = useState(0);

  useEffect(() => {
    getConsumableTotalPrice(percentageText)
      .then((data) => setTotalC(data.total))
      .catch((err) => console.log(err));
    getNonConsumableTotalPrice(percentageText)
      .then((data) => setTotalNC(data.total))
      .catch((err) => console.log(err));
  }, []);

  return (
    <Card mb={3}>
      <CardContent>
        <Typography variant="h5" mb={4}>
          {title}
        </Typography>
        <Typography variant="h4" mb={3}>
          <Box
            fontWeight="fontWeightRegular"
            sx={{
              backgroundColor: "rgba(76,175,80,0.1)",
              color: "#4caf50",
              display: "flex",
              alignItems: "center",
              justifyContent:"space-between",
              borderRadius: "5px",
              padding: "5px",
            }}
          >
             <Box sx={{
              display: "flex",
              alignItems: "center",
              height:"100%",
              justifyContent: "center",

            }}>

            <CurrencyRupeeIcon
              sx={{
                width: "20px",
              }}
            ></CurrencyRupeeIcon>{" "}
            <span style={{ fontWeight: "bold", textAlign: "end" }}>
              {" "}
              {totalC}{" "}
            </span>

            </Box>
            C

          </Box>
        </Typography>
        <Typography variant="h4" mb={3}>
        <Box
            fontWeight="fontWeightRegular"
            sx={{
              backgroundColor: "rgba(244,67,54,0.1)",
              color: "#f44336",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderRadius: "5px",
              padding: "5px",
            }}
          >
           
            <Box sx={{
              display: "flex",
              alignItems: "center",
              height:"100%",
              justifyContent: "center",

            }}>

            <CurrencyRupeeIcon
              sx={{
                width: "20px",
              }}
              ></CurrencyRupeeIcon>{" "}
            <span style={{ fontWeight: "bold" }}> {totalNC}</span>
              </Box>
              NC
           
          </Box>
        </Typography>
        <Percentage
          variant="subtitle2"
          mb={4}
          color="textSecondary"
          percentagecolor={percentagecolor}
        >
          <span>{percentageText}</span> current stock
        </Percentage>
        <Chip label={chip} />
      </CardContent>
    </Card>
  );
};

export default Stats;