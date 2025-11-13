import { Box, Divider, Typography } from "@mui/material";
import { ContainerDivider } from "./components";
import { StyledLink } from "./components";

const Footer = () => {
  return (
    <>
      <Divider sx={{ borderColor: "secondary.main", mt: "10vh" }} />
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          minHeight: "30vh",
          py: 2,
          px: 4,
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
            <Typography
              variant="body1"
              sx={{
                fontSize: "1.2rem",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              © {new Date().getFullYear()} VIPASSANA RESEARCH INSTITUTE
            </Typography>
            <Typography
              variant="body1"
              sx={{ fontSize: "1.2rem", textAlign: "center" ,fontWeight:'bold'}}
            >
              All Rights Reserved
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: 4,
              alignItems: "center",
              mt: 6,
            }}
          >
            <Typography variant="body1" sx={{ fontSize: "1.2rem",fontWeight:'bold' }}>
              Policies
            </Typography>
            <StyledLink
              href="/policies/terms_conditions"
              //   href="https://www.vridhamma.org/terms-and-conditions"
              target="_blank"
            >
              Terms Of Use
            </StyledLink>
            <StyledLink href="/policies/privacy_policy">
              Privacy Policy
            </StyledLink>
            <StyledLink href="/policies/shipping_returns">
              Shipping And Returns
            </StyledLink>
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
          <StyledLink href="/vri/01_about" target="_blank">
            About Us
          </StyledLink>
          <StyledLink href="/vri/03_contact" target="_blank">
            Contact Us
          </StyledLink>
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
          <StyledLink
            href="https://www.facebook.com/Vipassanaorganisation/"
            target="_blank"
          >
            Facebook
          </StyledLink>
          <StyledLink href="https://twitter.com/VipassanaOrg" target="_blank">
            Twitter
          </StyledLink>
          <StyledLink
            href="https://www.instagram.com/vipassanaorg/"
            target="_blank"
          >
            Instagram
          </StyledLink>
          <StyledLink href="https://t.me/+lnwlmLBoP5ljZmNl" target="_blank">
            Telegram
          </StyledLink>
          <StyledLink
            href="https://www.youtube.com/user/VipassanaOrg"
            target="_blank"
          >
            Youtube
          </StyledLink>
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
          <StyledLink
            href="https://play.google.com/store/apps/details?id=com.vipassanameditation"
            target="_blank"
          >
            Play Store
          </StyledLink>
          <StyledLink
            href="https://apps.apple.com/in/app/vipassanameditation-vri/id1491766806"
            target="_blank"
          >
            App Store
          </StyledLink>
        </Box>
      </Box>
    </>
  );
};
export default Footer;
