"use client";

// Layout & Components
import Drawer from "@mui/material/Drawer";

// TreeView (from @mui/x-tree-view)

// Icons



const drawerWidth = "75vw";


const MobileNav = () => {
  return (
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
          width: { xs: 340, sm: 440 },
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
  );
};
export default MobileNav;
