import { Box, Divider, Typography } from "@mui/material";
import { ContainerDivider } from "./components";
import {Link} from "@mui/material";

const Footer = () => {
  return (
    <>
      <Divider sx={{ borderColor: "secondary.main" }} />
      <Box
        sx={{
          display: "flex",
          height: "30vh",
          p: 4,
          gap: 8,
          backgroundColor: "background.paper",
        }}
      >
        <Box
          sx={{
            flexGrow: 1,
            diplay: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            gap: "7rem",
            alignItems: "center",
          }}
        >
          <Box>
            <Typography variant="h1" sx={{ fontSize: "1.2rem" }}>
              © {new Date().getFullYear()} Vipassana Meditation Center. All
              rights reserved.
            </Typography>
          </Box>
          <Box sx={{ display: "flex", gap: 4, alignItems: "center", mt: 6 }}>
            <Typography variant="h1" sx={{ fontSize: "1.2rem" }}>
              Policies
            </Typography>
            <Link href="https://www.vridhamma.org/terms-and-conditions"
              target="_blank"
            >
              Terms Of Use
            </Link>
            <Link href="https://www.vridhamma.org/privacy-policy">
              Privacy Policy
            </Link>
            <Link href="https://www.vridhamma.org/shipping-and-returns">
              Shipping And Returns
            </Link>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            gap: 1,
          }}
        >
          <Typography variant="body2">About </Typography>
          <Link href="https://www.vridhamma.org/About-VRI" target="_blank">
            About Us
          </Link>
          <Link href="https://www.vridhamma.org/Contact-Us" target="_blank">
            Contact Us
          </Link>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            gap: 1,
          }}
        >
          <Typography variant="body2">Social Media:</Typography>
          <Link
            href="https://www.facebook.com/Vipassanaorganisation/"
            target="_blank"
          >
            Facebook
          </Link>
          <Link href="https://twitter.com/VipassanaOrg" target="_blank">
            Twitter
          </Link>
          <Link href="https://www.instagram.com/vipassanaorg/" target="_blank">
            Instagram
          </Link>
          <Link href="https://t.me/+lnwlmLBoP5ljZmNl" target="_blank">
            Telegram
          </Link>
          <Link
            href="https://www.youtube.com/user/VipassanaOrg"
            target="_blank"
          >
            Youtube
          </Link>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            gap: 1,
          }}
        >
          <Typography variant="body2">Download </Typography>
          <Link
            href="https://play.google.com/store/apps/details?id=com.vipassanameditation"
            target="_blank"
          >
            Play Store
          </Link>
          <Link
            href="https://apps.apple.com/in/app/vipassanameditation-vri/id1491766806"
            target="_blank"
          >
            App Store
          </Link>
        </Box>
      </Box>
    </>
  );
};
export default Footer;
