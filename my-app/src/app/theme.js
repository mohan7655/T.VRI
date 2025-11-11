"use client";
import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#002299",
    },
    secondary: {
      main: "#EABE70",
    },
    background: {
      paper: "#fafafa",
    },

    // background: {
    //   paper: "#282A2C",
    //   default: "#1B1C1D",
    // },
    //  ...(mode === 'light'
    //     ? {
    //         // --- LIGHT MODE VALUES ---
    //         background: {
    //           default: '#ffffff',
    //           paper: '#f5f5f5',
    //         },
    //       }
    //     : {
    //         // --- DARK MODE VALUES ---
    //         // This is your block, placed in the 'else' part
    //         background: {
    //           default: '#0c111c', // Very dark blue
    //           paper: '#1a2333',   // Lighter surface blue
    //         },
    //       }),
  },
  typography: {
    fontFamily: "var(--font-geist-sans)",
    
    body1: {
      // fontWeight: 500,
      // color:"#fafaff"
      // fontSize:"1.1rem",
    },
    fontWeightRegular:500,
  },
});

export default theme;
