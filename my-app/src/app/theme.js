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
  },
  typography: {
    fontFamily: "var(--font-roboto-slab), serif",
    fontSize: 16,

    // 2. Override all headings to use Arial
    h1: { fontFamily: "var(--font-mont), sans-serif",fontWeight:500  },
    h2: { fontFamily: "var(--font-mont), sans-serif" ,fontWeight:500 },
    h3: { fontFamily: "var(--font-mont), sans-serif" ,fontWeight:500 },
    h4: { fontFamily: "var(--font-mont), sans-serif",fontWeight:500  },
    h5: { fontFamily: "var(--font-mont), sans-serif",fontWeight:500  },
    h6: { fontFamily: "var(--font-mont), sans-serif",fontWeight:500  },

    // You might also want to override buttons
    button: { fontFamily: "Arial, sans-serif" },
  },
});

theme = responsiveFontSizes(theme);

export default theme;
