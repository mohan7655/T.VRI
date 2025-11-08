"use client";

import "./globals.css";
import { useEffect, useState } from "react";
import ThemeRegistry from "./themeregistry";
import Header from "./components/Header";
import { Box } from "@mui/material";
import PermanentDrawerWithTree from "./components/gemini";

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
      <Box sx={{ display: "flex", gap: "1vw", position: "absolute" }}>
        <PermanentDrawerWithTree menuData={menuData} />
        <Box
          sx={{
            flexGrow: 1,
            width: "92vw",
          }}
        >
          <Header />
          {children}
        </Box>
      </Box>
    </ThemeRegistry>
  );
}