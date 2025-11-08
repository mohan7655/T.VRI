import { Box, Typography } from "@mui/material";
import { HeadBar, HeadText, Image, Pali_verses } from "./components";

const Header = () => {
  return (
    <>
      <HeadBar>
        <Image>
          {/* Example object to rotate (e.g., an icon or any component) */}
          <Box
            component="img"
            src="/dhamma-wheel.svg" // This is the correct path in Next.js
            alt="Wheel"
            sx={{
              // Use 'width' and 'height', not 'fontSize'
              width: 125,
              height: 125,
            }}
          />
        </Image>
        <HeadText>
          <Typography variant="h1" sx={{ mb: 0, fontSize: "4rem" }}>
            Vipassana Research Institue
          </Typography>
          <Typography variant="h1" sx={{ mt: 0, fontSize: "1.5rem" }}>
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
            width: 325,
            height: 50,
          }}
        />
        <Typography variant="h1" sx={{ fontSize: "1.5rem" }}>
          वयधम्मा सङ्खारा, अप्पमादेन सम्पादेथ
        </Typography>
        <Typography variant="h1" sx={{ fontSize: "1.5rem" }}>
          IMPERMANENT ARE ALL COMPOUNDED THINGS <br /> WORK OUT YOUR OWN
          SALVATION WITH DILIGENCE
        </Typography>
        <Box
          component="img"
          src="/bottom.png" // This is the correct path in Next.js
          alt="bottom"
          sx={{
            // Use 'width' and 'height', not 'fontSize'
            width: 325,
            height: 40,
          }}
        />
      </Pali_verses>
    </>
  );
};
export default Header;
