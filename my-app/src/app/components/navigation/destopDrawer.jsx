"use client";

// Layout & Components
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import SearchButtonWithModal from "../searchComponent";
import { Search } from "@mui/icons-material";
import BookIcon from "@mui/icons-material/Book";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import PaymentIcon from "@mui/icons-material/Payment";
import SelfImprovementIcon from "@mui/icons-material/SelfImprovement";
import StorefrontIcon from "@mui/icons-material/Storefront";
import { CenterIcon, DhammaIcon, VipassanaIcon } from "../customicons";


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

const DesktopDrawer = () => {
  return (
    <div>
      <List>
        <ListItemButton
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
          <SearchButtonWithModal />
          <ListItemText
            primary={"Search"}
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
};

export default DesktopDrawer;
