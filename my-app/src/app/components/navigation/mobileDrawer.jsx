"use client";
import * as React from "react";

// Layout & Components
import Box from "@mui/material/Box";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";

// TreeView (from @mui/x-tree-view)
import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView";

// Icons
import InboxIcon from "@mui/icons-material/MoveToInbox";

import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Collapse, Toolbar } from "@mui/material";

"use client";

// Layout & Components

// TreeView (from @mui/x-tree-view)

// Icons

import { Search } from "@mui/icons-material";
import BookIcon from "@mui/icons-material/Book";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import PaymentIcon from "@mui/icons-material/Payment";
import SelfImprovementIcon from "@mui/icons-material/SelfImprovement";
import StorefrontIcon from "@mui/icons-material/Storefront";
import { CenterIcon, DhammaIcon, VipassanaIcon } from "../customicons";

const drawerWidth = "75vw";

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

const MobileDrawer = (
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

                if (topLevelNode.children && topLevelNode.children.length > 0) {
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

export default MobileDrawer;
