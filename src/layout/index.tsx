import { Box, useMediaQuery } from "@mui/material";
import Header from "./Header";
import { ReactNode } from "react";
import { theme } from "../theme";

export default function Layout({ children }: { children: ReactNode }) {
  const phone = useMediaQuery(theme.breakpoints.down("xxs"));

  return (
    <Box>
      <Header />
      <Box sx={{ px: phone ? 1.5 : 12, py: 3, bgcolor: "primary.light" }}>
        {children}
      </Box>
    </Box>
  );
}
