import { Box, Typography } from "@mui/material";

export default function Header() {
  return (
    <Box
      sx={{
        height: "80px",
        bgcolor: "primary.main",
        display: "flex",
        alignItems: "center",
        px: 5,
      }}
    >
      <Typography sx={{ fontSize: "22px", color: "#FFF", fontWeight: 700 }}>
        کتابخانه دیجیتال
      </Typography>
    </Box>
  );
}
