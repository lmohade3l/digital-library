import { Box, Button, useMediaQuery } from "@mui/material";
import { theme } from "../theme";
import html2canvas from "html2canvas";
import { bookType } from "../types/book";
import { RefObject } from "react";

export default function DetailButtons({
  book,
  bookDetailsRef,
}: {
  book: bookType;
  bookDetailsRef: RefObject<HTMLDivElement>;
}) {
  const phone = useMediaQuery(theme.breakpoints.down("xxs"));

  const handleShare = async () => {
    try {
      if (!bookDetailsRef.current) return;

      const canvas = await html2canvas(bookDetailsRef.current);
      const imageBlob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob(resolve, "image/png")
      );

      if (!imageBlob) {
        throw new Error("Failed to create image blob.");
      }

      if (navigator.share) {
        await navigator.share({
          title: `کتاب ${book?.title}`,
          text: `مشاهده جزئیات کتاب ${book?.title}`,
          files: [
            new File([imageBlob], "book-details.png", { type: "image/png" }),
          ],
        });
      } else {
        const shareUrl = URL.createObjectURL(imageBlob);
        const a = document.createElement("a");
        a.href = shareUrl;
        a.download = "book-details.png";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(shareUrl);
      }
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  return (
    <Box sx={{ display: "flex", gap: 2, mt: 4, flexDirection: "row" }}>
      <Button
        onClick={() =>
          window.open(`https://taaghche.com/book/${book.id}`, "_blank")
        }
        variant="contained"
        color="primary"
        fullWidth={phone}
        sx={{
          bgcolor: theme.palette.primary.main,
          color: "#FFF",
          "&:hover": {
            bgcolor: theme.palette.primary.dark,
          },
          fontSize: phone ? "0.875rem" : "1rem",
        }}
      >
        جزییات بیشتر
      </Button>

      <Button
        onClick={handleShare}
        variant="contained"
        color="success"
        fullWidth={phone}
        sx={{
          bgcolor: theme.palette.success.main,
          color: "#FFF",
          "&:hover": {
            bgcolor: theme.palette.success.dark,
          },
          fontSize: phone ? "0.875rem" : "1rem",
        }}
      >
        اشتراک‌گذاری
      </Button>
    </Box>
  );
}
