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
      <ListItemButton
        onClick={handleOpen}
        sx={{
          display: "flex",
          gap: 0,
          p: 1,
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-end",
          borderRadius: 3,
          height: { md: "10.8vh" },
          "& .MuiSvgIcon-root": {
            color: "text.secondary",
          },
          "&:hover": {
            "& .MuiSvgIcon-root": {
              transform: "scale(1.1)",
              color: "primary.main",
            },
            "& .MuiListItemText-primary": {
              fontWeight: 550,
              color: "primary.main",
            },
          },
        }}
      >
        <ListItemIcon
          sx={{ minWidth: 0, scale: { md: 1.3 }, flexGrow: { md: 1 } }}
        >
          <SearchIcon />
        </ListItemIcon>
        <ListItemText
          primary={"Search"}
          sx={{
            textAlign: "center",
            mb: 0,
            display: { xs: "none", md: "block" },
            minHeight: 0,
            "& .MuiListItemText-primary": {
              fontSize: "0.8rem",
            },
          }}
        />
      </ListItemButton>

      {/* 2. The Modal/Dialog */}
      <Dialog
        open={isSearchOpen}
        onClose={handleClose}
        // fullScreen
        fullScreen={isMobile} // Full screen on mobile
        maxWidth="xl"
        fullWidth
        sx={{
          "& .MuiDialog-container": {
            alignItems: "flex-start",
            m: { xs: 0 },

            justifyContent: "flex-end",
          },
          "& .MuiDialog-paper": {
            width: {
              xs: "100vw",
              md: "88vw",
            },
            // maxWidth: "90vw",
            // alignItems: "flex-start",
          },
        }}
        // Use Slide for a smooth opening transition
        slots={{ transition: Grow }}
        slotProps={{
          transition: { direction: "down" },
          paper: { sx: { borderRadius: { xs: 0, sm: 5 } } },
        }}
      >
        {/* 3. The Search Component */}
        <Box sx={{ p: isMobile ? 1 : 2, height: "100%" }}>
          {/* Pass the close handler so the modal shuts after a result is clicked */}
          <SearchComponent onResultClick={handleClose} />
        </Box>
      </Dialog>
    </>
  );
}
