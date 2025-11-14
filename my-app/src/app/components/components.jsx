"use client";

import styled from "@emotion/styled";
import { Box, Divider, Typography } from "@mui/material";
import { blue, blueGrey } from "@mui/material/colors";
import { Button } from "@mui/material";
import Link from "next/link";

export const StyledButton = styled(Button)({
  color: blue,
});

export const Text = styled(Typography)(({ theme }) => ({
  // fontSize: "1.1rem",
  padding: "0 1",
  fontWeight: "500",

  [theme.breakpoints.up("md")]: {
    padding: theme.spacing(2),
    lineHeight: 1.6,
  },
}));

export const TextBoxContainer = styled(Box)(({ theme }) => ({
  // backgroundColor: "#fafafa",
  backgroundColor: theme.palette.background.paper,

  [theme.breakpoints.up("xs")]: {
    padding: theme.spacing(1.5),
    paddingTop: theme.spacing(2),
    margin: theme.spacing(1),
    borderRadius: "1rem", // 48px padding for MD screens and up
  },

  [theme.breakpoints.up("md")]: {
    padding: theme.spacing(3),
    borderRadius: "2rem",
  },

  margin: "1rem 0",
}));

export const ContainerDivider = styled(Divider)(({ theme }) => ({
  borderBottomWidth: "0.2rem",
  borderRadius: "4rem",
  borderColor: theme.palette.secondary.main,
  margin: "1rem 4rem 3rem 2rem",
}));

export const HeadBar = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  padding: "4rem 2rem 1rem 2rem",
  [theme.breakpoints.up("md")]: {
    flexDirection: "row",
    minHeight: "35vh",
    padding: "4rem 2rem",
  },
  gap: "1rem",
  justifyContent: "center",
  alignItems: "center",

  minWidth: "100%",
}));

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

export const Pali_verses = styled(Box)(({ theme }) => ({
  px: "2rem",
  py: "1rem",
  backgroundColor: theme.palette.primary.main,
  color: "#EABE70",
  textAlign: "center",
  alignItems: "center",
  justifyContent: "center",
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  [theme.breakpoints.up("md")]: {
    flexDirection: "row",
  },
}));

export const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: theme.palette.primary.light,
  fontWeight: 500,
  "&:hover": {
    color: theme.palette.primary.dark,
  },
}));

export const Verses = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  [theme.breakpoints.up("md")]: {
    flexDirection: "row",
  },
}));
