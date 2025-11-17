"use client";
import { createTheme, responsiveFontSizes } from "@mui/material";

const mode = "light";

let theme = createTheme({
  palette: {
    mode: mode,
    primary: {
      main: "#002299",
    },
    secondary: {
      main: "#EABE70",
    },

    ...(mode === "light"
      ? {
          background: {
            paper: "#fafafa",
          },
        }
      : {
          background: {
            paper: "#1E1E1E",
            default: "#121212",
          },
        }),

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
    fontFamily: "var(--font-geist-roboto)",
    fontSize: 16,
  },
});

theme = responsiveFontSizes(theme);

export default theme;
