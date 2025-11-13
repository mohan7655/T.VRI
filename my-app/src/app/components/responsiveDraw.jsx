import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Collapse, Fade, Grow, Link, Zoom } from "@mui/material";
import StorefrontIcon from "@mui/icons-material/Storefront";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SelfImprovementIcon from "@mui/icons-material/SelfImprovement";
import { CenterIcon, DhammaIcon, VipassanaIcon } from "./customicons";
import BookIcon from "@mui/icons-material/Book";
import PaymentIcon from "@mui/icons-material/Payment";
import { Search } from "@mui/icons-material";
import { red } from "@mui/material/colors";

const drawerWidth = 240;

function ResponsiveDrawer({ menuData }) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

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

  const iconMap = {
    old: <MenuBookIcon />,
    store: <StorefrontIcon />,
    courses: <CalendarMonthIcon />,
    anapana: <SelfImprovementIcon />,
    vri: <DhammaIcon />,
    vipassana: <VipassanaIcon sx={{ strokeWidth: 4.5 }} />,
    resources: <BookIcon />,
    centers: <CenterIcon sx={{ scale: 1.7 }} />,
    donations: <PaymentIcon />,
    search: <Search />,
  };

  const drawer = (
    <div>
      
      
      <List
      //  sx={{  py: 0 }}
      >
        {menuData.map((item) => (
          <ListItem key={item.id} disablePadding>
            <ListItemButton
              onMouseEnter={(event) => handleOpen(event, item)}
              onMouseLeave={handleClose}
              sx={{
                display: "flex",
                gap: 0,
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-end",
                borderRadius: 3,
                // py: 0,
                height: "10.8vh",
                "& .MuiSvgIcon-root": {
                  color: "text.secondary",
                },
                // my: 0,
                "&:hover": {
                  "& .MuiSvgIcon-root": {
                    transform: "scale(1.2)",
                    color: "primary.main",
                  },
                  "& .MuiListItemText-primary": {
                    fontWeight: 550,
                    color: "primary.main",
                  },
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 0, scale: 1.3, flexGrow: 1 }}>
                {iconMap[item.icon] || <InboxIcon />}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                sx={{
                  textAlign: "center",
                  mb: 0,
                  minHeight: 0,
                  "& .MuiListItemText-primary": {
                    fontSize: "0.8rem",
                  },
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  // Remove this const when copying and pasting into your project.

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
        
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: "7vw"}, flexShrink: 0, backgroundColor: red[500], }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          slotProps={{
            root: {
              keepMounted: true, // Better open performance on mobile.
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: "7vw",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      {/* <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
      </Box> */}
    </Box>
  );
}

export default ResponsiveDrawer;
