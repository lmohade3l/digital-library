import { Box, Typography } from "@mui/material";
import { t } from "../hooks/useTranslate";

export default function BookRating({
  rating,
  count,
  phone,
}: {
  rating: string | number;
  count: string | number;
  phone: boolean;
}) {
  return (
    <Box
      sx={{ display: "flex", gap: 1, alignItems: "center", flexWrap: "wrap" }}
    >
      <Typography sx={{ fontSize: phone ? "0.875rem" : "1rem" }}>
        {t("rating")}:
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          bgcolor: "success.main",
          px: 1,
          borderRadius: "12px",
        }}
      >
        <Typography
          sx={{ fontSize: phone ? "0.875rem" : "1rem", color: "#FFF" }}
        >
          {rating}
        </Typography>
      </Box>
      <Typography sx={{ fontSize: phone ? "0.875rem" : "1rem" }}>{`${t(
        "from"
      )} ${count} ${t("vote")}`}</Typography>
    </Box>
  );
}
