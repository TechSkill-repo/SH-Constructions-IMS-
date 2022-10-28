import React, { useState, useEffect } from "react";
import styled from "styled-components/macro";

import {
  Box,
  Card as MuiCard,
  CardContent as MuiCardContent,
  Chip as MuiChip,
  Typography as MuiTypography,
} from "@material-ui/core";

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

const Stats = ({
  title,
  chip,
  percentageText,
  percentagecolor,
  amount,
  amountNC,
}) => {
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
        <Typography variant="h6" mb={4}>
          {title}
        </Typography>
        <Typography variant="h3" mb={3}>
          <Box fontWeight="fontWeightRegular">{amount}</Box>
        </Typography>
        <Typography variant="h3" mb={3}>
          <Box fontWeight="fontWeightRegular">{amountNC}</Box>
        </Typography>
        <Percentage
          variant="subtitle2"
          mb={4}
          color="textSecondary"
          percentagecolor={percentagecolor}
        >
          <span>{percentageText}</span>
        </Percentage>
        <Chip label={chip} />
      </CardContent>
    </Card>
  );
};

export default Stats;
