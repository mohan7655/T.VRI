"use client";
import React, { useState } from "react";
import {
  IconButton,
  Dialog,
  Slide,
  Box,
  useTheme,
  useMediaQuery,
  AppBar,
  Toolbar,
  Typography,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Fade,
  Zoom,
  Grow,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import { useRouter, useSearchParams } from "next/navigation";

// Assuming your existing search logic is imported here
import SearchComponent from "./search";

export default function SearchButtonWithModal() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const isSearchOpen = searchParams.get("search") === "true";

  const handleOpen = () => {
    const params = new URLSearchParams(searchParams);
    params.set("search", "true");
    // This adds '?search=true' to the URL and creates a new history entry
    router.push(`?${params.toString()}`);
  };
  const handleClose = () => {
    router.back();
  };

  return (
    <>
      {/* 1. The Search Button (Icon) */}

      <ListItemIcon
        sx={{ minWidth: 0, flexGrow: 1 }}
        onClick={handleOpen}
      >
        <SearchIcon />
      </ListItemIcon>

      {/* 2. The Modal/Dialog */}
      <Dialog
        open={isSearchOpen}
        onClose={handleClose}
        // fullScreen
        fullScreen={isMobile} // Full screen on mobile
        maxWidth="lg"
        fullWidth
        sx={{
          "& .MuiDialog-container": {
            // CRITICAL: Stops vertical centering (alignItems: 'center' is the default)
            alignItems: "flex-start",
            m: {xs:0,md:-2},
            p: 0,
            justifyContent: "flex-end",
            
          },
        }}
        // Use Slide for a smooth opening transition
        slots={{ transition: Grow }}
        slotProps={{
          transition: { direction: "down" },
          paper: { sx: { borderRadius: {xs:0,md:5} } },
        }}
      >
        

        {/* 3. The Search Component */}
        <Box sx={{ p: isMobile ? 3 : 1, height: "100%" }}>
          {/* Pass the close handler so the modal shuts after a result is clicked */}
          <SearchComponent onResultClick={handleClose} />
        </Box>
      </Dialog>
    </>
  );
}
