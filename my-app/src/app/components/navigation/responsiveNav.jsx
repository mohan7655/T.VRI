"use client";
import * as React from "react";

// Layout & Components
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Slide from "@mui/material/Slide";

// TreeView (from @mui/x-tree-view)
import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView";
import { TreeItem, treeItemClasses } from "@mui/x-tree-view/TreeItem";

// Icons
import InboxIcon from "@mui/icons-material/MoveToInbox";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import {
  AppBar,
  Collapse,
  Fade,
  Grow,
  IconButton,
  Link,
  Toolbar,
  Zoom,
} from "@mui/material";
import StorefrontIcon from "@mui/icons-material/Storefront";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SelfImprovementIcon from "@mui/icons-material/SelfImprovement";
import { CenterIcon, DhammaIcon, VipassanaIcon } from "../customicons";
import BookIcon from "@mui/icons-material/Book";
import PaymentIcon from "@mui/icons-material/Payment";
import { Search } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import SearchComponent from "../search";
import SearchButtonWithModal from "../searchComponent";
import MobileNav from "./mobileNav";
import DesktopNav from "./destopNav";

const drawerWidth = "75vw";

function ResponsiveNav({ menuData }) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  // For mobile: track which item is expanded
  const [expandedMobileItem, setExpandedMobileItem] = React.useState(null);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [hoveredItemData, setHoveredItemData] = React.useState(null);

  const open = Boolean(anchorEl);
  const closeTimer = React.useRef(null);
  const openTimer = React.useRef(null);

  const handleOpen = (event, itemData) => {
    clearTimeout(closeTimer.current);
    setAnchorEl(event.currentTarget);
    if (openTimer.current) {
      clearTimeout(openTimer.current);
    }

    openTimer.current = setTimeout(() => {
      setHoveredItemData(itemData);
    }, 100);
  };

  const handleClose = () => {
    if (openTimer.current) {
      clearTimeout(openTimer.current);
    }
    closeTimer.current = setTimeout(() => {
      setAnchorEl(null);
    }, 50);
  };

  const onPopoverEnter = () => {
    clearTimeout(closeTimer.current);
  };

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const handleMobileItemClick = (itemId) => {
    setExpandedMobileItem(expandedMobileItem === itemId ? null : itemId);
  };

  return (
    <Box sx={{ display: "flex", m: 0, p: 0 }}>
      <AppBar
        position="fixed"
        sx={{
          width: "100%",
          // ml:  {xs:0,sm:440} ,
          backgroundColor: "background.default",
          zIndex: (theme) => theme.zIndex.drawer + 50,
          boxShadow: "none",
          display: { xs: "flex", md: "none" },
          flexDirection: "row",
          justifyContent: "flex-start",
          p: 1,
        }}
      >
        <IconButton
          // color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ ml: 0, alignSelf: "flex-start", display: { md: "none" } }}
        >
          {mobileOpen ? <MenuOpenIcon /> : <MenuIcon />}
        </IconButton>
        <Box sx={{ ml: "auto", p: 1 }}>
          <SearchButtonWithModal />
        </Box>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { md: "7vw" }, flexShrink: 0 }}
        aria-label="folders"
      >
        {/* Mobile Drawer */}
        <MobileNav />

        {/* Desktop Drawer */}
        <DesktopNav />
      </Box>
    </Box>
  );
}

export default ResponsiveNav;
