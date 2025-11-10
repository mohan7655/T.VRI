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
import { TreeItem } from "@mui/x-tree-view/TreeItem";

// Icons
import InboxIcon from "@mui/icons-material/MoveToInbox";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Grow, Link } from "@mui/material";
import StorefrontIcon from "@mui/icons-material/Storefront";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SelfImprovementIcon from "@mui/icons-material/SelfImprovement";
import { CenterIcon, DhammaIcon, VipassanaIcon } from "./customicons";
import BookIcon from "@mui/icons-material/Book";
import PaymentIcon from "@mui/icons-material/Payment";

const drawerWidth = "6vw";

export default function PermanentDrawerWithTree({ menuData }) {
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
  };

  

  const renderTree = (nodes) => {

  const childrenCount = nodes.children ? nodes.children.length : 0;

  const labelContent = (
    <Box sx={{ display: "flex", alignItems: "center",  pr: 0 }}>
      <Typography variant="body1" sx={{ fontWeight: "medium", flexGrow: 1 }}>
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
        <TreeItem key={nodes.id} itemId={nodes.id} label={labelContent}>
          {nodes.children.map((node) => renderTree(node))}
        </TreeItem>
      );
    }
    return <TreeItem key={nodes.id} itemId={nodes.id} label={nodes.label} />;
  };

  return (
    <>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <List>
          {menuData.map((item) => (
            <ListItem key={item.id} disablePadding>
              <ListItemButton
                onMouseEnter={(event) => handleOpen(event, item)}
                onMouseLeave={handleClose}
                sx={{
                  display: "flex",

                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 3,
                  py: 3,
                  height: "10.8vh",
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
                <ListItemIcon sx={{ minWidth: 0, scale: 1.2 }}>
                  {iconMap[item.icon] || <InboxIcon />}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  sx={{
                    textAlign: "center",

                    "& .MuiListItemText-primary": {
                      fontSize: "0.8rem",
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

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
            timeout: 100,
          },
          paper: {
            onMouseEnter: onPopoverEnter,
            onMouseLeave: handleClose,

            sx: {
              pointerEvents: "auto",
              boxSizing: "border-box",
              padding: 2,
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
            <Typography variant="h6" sx={{ marginBottom: 2.5 }}>
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

              if (topLevelNode.children && topLevelNode.children.length > 0) {
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
    </>
  );
}
