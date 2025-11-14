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
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";

// Assuming your existing search logic is imported here
import SearchComponent from "./search";

export default function SearchButtonWithModal() {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      {/* 1. The Search Button (Icon) */}

      <ListItemIcon
        sx={{ scale: 1.3, minWidth: 0, flexGrow: 1 }}
        onClick={handleOpen}
      >
        <SearchIcon />
      </ListItemIcon>

      {/* 2. The Modal/Dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        borderRadius="5"
        // fullScreen
        fullScreen={isMobile} // Full screen on mobile
        maxWidth="lg"
        fullWidth
        sx={{
          "& .MuiDialog-container": {
            // CRITICAL: Stops vertical centering (alignItems: 'center' is the default)
            alignItems: "flex-start",
            m: -2,
            p: 0,
            justifyContent: "flex-end",
            borderRadius: 5,
          },
        }}
        // Use Slide for a smooth opening transition
        slots={{ transition: Slide }}
        slotProps={{
          transition: { direction: "down" },
          paper: { sx: { borderRadius: 5 } },
        }}
      >
        {/* Optional: Add a toolbar for mobile full-screen view */}
        {/* {isMobile && (
          <AppBar sx={{ position: "relative" }}>
            <Toolbar>
              <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                Search
              </Typography>
              <IconButton
                edge="end"
                color="inherit"
                onClick={handleClose}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
        )} */}

        {/* 3. The Search Component */}
        <Box sx={{ p: isMobile ? 3 : 1, height: "100%" }}>
          {/* Pass the close handler so the modal shuts after a result is clicked */}
          <SearchComponent onResultClick={handleClose} />
        </Box>
      </Dialog>
    </>
  );
}
