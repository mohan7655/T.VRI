"use client";

import "./globals.css";
import { useEffect, useRef, useState } from "react";
import ThemeRegistry from "./themeregistry";
import Header from "./components/Header";
import { Box } from "@mui/material";
import PermanentDrawerWithTree from "./components/gemini";
import Footer from "./components/Footer";
import ResponsiveDrawer from "./components/responsiveDraw";
import { blue } from "@mui/material/colors";

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
      <Box sx={{ display: "flex", gap: "1vw", position: "absolute", }}>
        {/* <PermanentDrawerWithTree menuData={menuData}  /> */}
        <ResponsiveDrawer menuData={menuData}/>
        <Box
          sx={{
            flexGrow: 1,
            width: {xs:"100vw",md:"91vw"},
            
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
