"use client";

// Layout & Components
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";

// TreeView (from @mui/x-tree-view)
import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView";

// Icons

import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
    Grow
} from "@mui/material";
import DesktopNav from "./destopNav";

const drawerWidth = "75vw";


const DesktopNav = () => {
  return (
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
    </Drawer>
  );
};
export default DesktopNav;
