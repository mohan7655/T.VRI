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
import { CenterIcon, DhammaIcon, VipassanaIcon } from "./customicons";
import BookIcon from "@mui/icons-material/Book";
import PaymentIcon from "@mui/icons-material/Payment";
import { Search } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";

const drawerWidth = "75vw";

function ResponsiveDrawer({ menuData }) {
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

  const renderTree = (nodes) => {
    const childrenCount = nodes.children ? nodes.children.length : 0;

    const labelContent = (
      <Box sx={{ display: "flex", alignItems: "center", pr: 0 }}>
        <Typography variant="body1" sx={{ flexGrow: 1 }}>
          {nodes.label}
        </Typography>

        {childrenCount > 0 && (
          <Typography
            variant="caption"
            sx={{
              ml: 1,
              p: "2px 6px",
              color: "text.secondary",
              fontWeight: "bold",
            }}
          >
            {childrenCount}
          </Typography>
        )}
      </Box>
    );

    if (nodes.href) {
      return (
        <TreeItem
          key={nodes.id}
          sx={{
            [`& .${treeItemClasses.content}`]: { p: 0.5, borderRadius: 4 },
          }}
          itemId={nodes.id}
          label={
            <Link
              style={{
                display: "block",
                textDecoration: "none",
                color: "inherit",
                padding: "4px 0",
              }}
              href={nodes.href}
              target={nodes.external ? "_blank" : undefined}
              rel={nodes.external ? "noopener noreferrer" : undefined}
            >
              {nodes.label}
            </Link>
          }
        />
      );
    }
    if (Array.isArray(nodes.children)) {
      return (
        <TreeItem
          key={nodes.id}
          itemId={nodes.id}
          label={labelContent}
          sx={{
            [`& .${treeItemClasses.content}`]: { p: 1, borderRadius: 5 },
          }}
        >
          {nodes.children.map((node) => renderTree(node))}
        </TreeItem>
      );
    }
    return (
      <TreeItem
        key={nodes.id}
        itemId={nodes.id}
        label={nodes.label}
        sx={{
          [`& .${treeItemClasses.content}`]: { p: 0.5, borderRadius: 5 },
        }}
      />
    );
  };

  const mobileDrawer = (
    <div>
      <Toolbar />
      <List>
        {menuData.map((item) => (
          <React.Fragment key={item.id}>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => handleMobileItemClick(item.id)}
                sx={{
                  display: "flex",
                  gap: 2,
                  alignItems: "center",
                  borderRadius: 3,
                  py: 1.5,
                  "&:hover": {
                    "& .MuiSvgIcon-root": {
                      color: "primary.main",
                    },
                    "& .MuiListItemText-primary": {
                      fontWeight: 550,
                      color: "primary.main",
                    },
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 0, scale: 1.3 }}>
                  {iconMap[item.icon] || <InboxIcon />}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  sx={{
                    "& .MuiListItemText-primary": {
                      fontSize: "1rem",
                      fontWeight: expandedMobileItem === item.id ? 600 : 400,
                    },
                  }}
                />
                {expandedMobileItem === item.id ? (
                  <ExpandMoreIcon />
                ) : (
                  <ChevronRightIcon />
                )}
              </ListItemButton>
            </ListItem>

            <Collapse
              in={expandedMobileItem === item.id}
              timeout="auto"
              unmountOnExit
            >
              <Box sx={{ pl: 2, pr: 2, pb: 2 }}>
                {item.tree.map((topLevelNode) => {
                  if (topLevelNode.href) {
                    return (
                      <SimpleTreeView
                        key={topLevelNode.id}
                        sx={{
                          mb: 0,
                          flexGrow: 1,
                        }}
                      >
                        {renderTree(topLevelNode)}
                      </SimpleTreeView>
                    );
                  }

                  if (
                    topLevelNode.children &&
                    topLevelNode.children.length > 0
                  ) {
                    return (
                      <Box key={topLevelNode.id} sx={{ mb: 3 }}>
                        <Typography
                          variant="subtitle1"
                          sx={{
                            py: 1,
                            color: "secondary.main",
                            fontWeight: 600,
                            lineHeight: 1.5,
                          }}
                        >
                          {topLevelNode.label}
                        </Typography>

                        <SimpleTreeView
                          slots={{
                            expandIcon: ChevronRightIcon,
                            collapseIcon: ExpandMoreIcon,
                          }}
                        >
                          {topLevelNode.children.map((childNode) =>
                            renderTree(childNode)
                          )}
                        </SimpleTreeView>
                      </Box>
                    );
                  }
                  return null;
                })}
              </Box>
            </Collapse>
          </React.Fragment>
        ))}
      </List>
    </div>
  );

  const desktopDrawer = (
    <div>
      <List>
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
                height: "10.8vh",
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

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{
          width: "100%",
          // ml:  {xs:0,sm:440} ,
          backgroundColor: "background.default",
          zIndex: (theme) => theme.zIndex.drawer + 50,
          boxShadow: "none",
          display: { xs: "flex", md: "none" },
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
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { md: "7vw" }, flexShrink: 0 }}
        aria-label="folders"
      >
        {/* Mobile Drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          sx={{
            display: { xs: "block", md: "none" },
            pt: "10vh",
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: {xs:340,sm:440},
            },
          }}
          slotProps={{
            root: {
              keepMounted: true,
            },
          }}
        >
          {mobileDrawer}
        </Drawer>

        {/* Desktop Drawer */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: "7vw",
            },
          }}
          open
        >
          {desktopDrawer}
          <Popover
            open={open}
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            onClose={handleClose}
            disableRestoreFocus
            slots={{
              transition: Grow,
            }}
            slotProps={{
              transition: {
                direction: "right",
                timeout: 200,
              },
              paper: {
                onMouseEnter: onPopoverEnter,
                onMouseLeave: handleClose,
                sx: {
                  pointerEvents: "auto",
                  boxSizing: "border-box",
                  padding: 2,
                  paddingRight: 0,
                  top: "0 !important",
                  minHeight: "100vh",
                  maxHeight: "99vh",
                  width: 340,
                  boxShadow: "0 0 16px rgba(0,0,0,0.15)",
                  overflowY: "auto",
                },
              },
            }}
            sx={{
              pointerEvents: "none",
            }}
          >
            {hoveredItemData && (
              <Box>
                <Typography variant="h5" sx={{ marginBottom: 2.5 }}>
                  {hoveredItemData.text}
                </Typography>

                {hoveredItemData.tree.map((topLevelNode) => {
                  if (topLevelNode.href) {
                    return (
                      <SimpleTreeView
                        key={topLevelNode.id}
                        sx={{
                          mb: 0,
                          flexGrow: 1,
                        }}
                      >
                        {renderTree(topLevelNode)}
                      </SimpleTreeView>
                    );
                  }

                  if (
                    topLevelNode.children &&
                    topLevelNode.children.length > 0
                  ) {
                    return (
                      <Box key={topLevelNode.id} sx={{ mb: 3 }}>
                        <Typography
                          variant="h5"
                          sx={{
                            py: "1rem",
                            color: "secondary.main",
                            fontWeight: 500,
                            lineHeight: 1.5,
                          }}
                        >
                          {topLevelNode.label}
                        </Typography>

                        <SimpleTreeView
                          slots={{
                            expandIcon: ChevronRightIcon,
                            collapseIcon: ExpandMoreIcon,
                          }}
                        >
                          {topLevelNode.children.map((childNode) =>
                            renderTree(childNode)
                          )}
                        </SimpleTreeView>
                      </Box>
                    );
                  }
                  return null;
                })}
              </Box>
            )}
          </Popover>
        </Drawer>
      </Box>
    </Box>
  );
}

export default ResponsiveDrawer;
