import { Box, Typography } from "@mui/material";
import { HeadBar, HeadText, Image, Pali_verses } from "./components";

const Header = () => {
  return (
    <>
      <HeadBar>
        {/* <Image> */}
        {/* Example object to rotate (e.g., an icon or any component) */}
        <Box
          component="img"
          src="/dhamma-wheel.svg" // This is the correct path in Next.js
          alt="Wheel"
          sx={{
            // Use 'width' and 'height', not 'fontSize'
            width: { xs: 75, md: 125 },
            height: { xs: 75, md: 125 },
          }}
        />
        {/* </Image> */}
        <HeadText>
          <Typography
            variant="h1"
            sx={{
              mb: 0,
              textAlign: "center",
              fontSize: { xs: "2.4rem", md: "4rem" },
            }}
          >
            Vipassana Research Institue
          </Typography>
          <Typography
            variant="body1"
            sx={{
              mt: 0,
              display: { xs: "block", md: "none" },
              fontSize: { md: "0.8rem" },
              textAlign: "center",
            }}
          >
            founded by S. N. Goenka <br />
            in the tradition of Sayagyi U Ba Khin
          </Typography>
          <Typography
            variant="body1"
            sx={{
              mt: 0,
              // fontSize: "0.2rem",
              color: "black",
              display: { xs: "none", md: "block" },
            }}
          >
            founded by S. N. Goenka in the tradition of Sayagyi U Ba Khin
          </Typography>
        </HeadText>
      </HeadBar>
      <Pali_verses>
        <Box
          component="img"
          src="/top.png" // This is the correct path in Next.js
          alt="top"
          sx={{
            // Use 'width' and 'height', not 'fontSize'
            width: { xs: 120, md: 275 },
            height: { xs: 15, md: 35 },
          }}
        />
        <Typography
          variant="h1"
          sx={{ fontSize: { xs: "1.1rem", md: "1.5rem" } }}
        >
          वयधम्मा सङ्खारा, अप्पमादेन सम्पादेथ
        </Typography>
        <Typography
          variant="h1"
          sx={{ fontSize: { xs: "1.1rem", md: "1.5rem" } }}
        >
          IMPERMANENT ARE ALL COMPOUNDED THINGS <br /> WORK OUT YOUR OWN
          SALVATION WITH DILIGENCE
        </Typography>
        <Box
          component="img"
          src="/bottom.png" // This is the correct path in Next.js
          alt="bottom"
          sx={{
            // Use 'width' and 'height', not 'fontSize'
            width: { xs: 120, md: 275 },
            height: { xs: 15, md: 30 },
          }}
        />
      </Pali_verses>
    </>
  );
};
export default Header;
