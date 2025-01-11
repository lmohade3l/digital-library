import { Box } from "@mui/material";
import { t } from "../hooks/useTranslate";

export default function EmptyMessage() {
  return <Box>{t("noBookFound")}</Box>;
}
