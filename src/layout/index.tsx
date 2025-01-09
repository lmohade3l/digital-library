import { Box } from "@mui/material";
import Header from "./Header";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <Box>
      <Header />
      <Box sx={{ px: 12, py: 3, bgcolor: "primary.light" }}>{children}</Box>
    </Box>
  );
}
