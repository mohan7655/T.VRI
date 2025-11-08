"use client";

import styled from "@emotion/styled";
import {
  Box,
  Divider,
  Drawer,
  Paper,
  StyledEngineProvider,
  Typography,
} from "@mui/material";
import { blue, blueGrey } from "@mui/material/colors";
import { Button } from "@mui/material";

export const StyledButton = styled(Button)({
  color: blue,
});

export const Text = styled(Typography)({
  fontSize: "1.1rem",
  padding: "0 2rem",
  fontWeight: "300",
  lineHeight:1.7,
});

export const TextBoxContainer = styled(Box)(({ theme }) => ({
  // backgroundColor: "#fafafa",
  backgroundColor: theme.palette.background.paper,
  borderRadius: "2rem",
  padding: "2rem",
  margin: "2rem 0",
}));

export const ContainerDivider = styled(Divider)(({ theme }) => ({
  borderBottomWidth: "0.2rem",
  borderRadius: "2rem",
  borderColor: theme.palette.background.default,
  margin: "2rem -2rem",
}));

export const HeadBar = styled(Box)({
  display: "flex",
  flexDirection: "row",
  gap: "1rem",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "40vh",
  minWidth: "100%",
});

export const HeadText = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",

  p: 0,
  gap: 0,
  height: "100%",
  justifyContent: "center",
  alignItems: "center",
  color: theme.palette.primary.main,
}));

export const Image = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: 125,
  height: 125,
  animation: "roll 2s linear infinite",
  "@keyframes spin": {
    "0%": {
      transform: "rotate(0deg)",
    },
    "100%": {
      transform: "rotate(360deg)",
    },
  },
});

export const Pali_verses = styled(Box)({
  px: "2rem",
  py: "1rem",
  backgroundColor: "#002299",
  color: "#EABE70",
  textAlign: "center",
  alignItems: "center",
  justifyContent: "center",
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
});
