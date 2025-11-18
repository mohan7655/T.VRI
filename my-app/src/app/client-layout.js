"use client";

import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import ResponsiveDrawer from "./components/navigation/responsiveDraw";
import "./globals.css";
import ThemeRegistry from "./themeregistry";

export default function ClientLayout({ children, menuData }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <ThemeRegistry>
      <Box sx={{ display: "flex", gap: "0", position: "absolute" }}>
        <ResponsiveDrawer menuData={menuData} />
        <Box
          sx={{
            flexGrow: 1,
            width: { xs: "100vw", md: "92vw" },
            ml: { md: "0vw" },
          }}
        >
          <Header />
          {children}
          <Footer />
        </Box>
      </Box>
    </ThemeRegistry>
  );
}
