import React, { useEffect, useRef } from "react";
import html2canvas from "html2canvas";
import {
  Box,
  Button,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { bookType } from "../types/book";
import { theme } from "../theme";
import { priceSeparator, toPersianNumbers } from "../utils/numberUtils";
import { getRartingAndCount } from "../utils/getRatingAndCount";
import PersianEbookCard from "../components/BookMoreInfo";
import EmptyBookDetail from "../components/EmptyBookDetail";

const BookDetail = () => {
  const bookDetailsRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();

  const isUnder700px = useMediaQuery("(max-width:700px)");
  const mediumScreenTablet = useMediaQuery(theme.breakpoints.down("lg"));
  const smallTablet = useMediaQuery(theme.breakpoints.down("ssm"));
  const phone = useMediaQuery(theme.breakpoints.down("xxs"));

  const book: bookType | undefined = location.state?.book;

  useEffect(() => {
    if (!book && id) {
      navigate("/");
    }
  }, [book, id, navigate]);

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

  if (!book) {
    return <EmptyBookDetail />;
  }

  return (
    <Box
      sx={{
        display: "flex",
        py: 3,
        px: { xxs: 0, ssm: 0, },
        minHeight: { xxs: "auto", lg: "calc(100vh - 130px)" },
        justifyContent: "center",
        overflow: "auto",
      }}
    >
      <Box sx={{ width: "100%", maxWidth: "1200px" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 2,
            mb: 3,
          }}
        >
          <Typography
            sx={{ wordBreak: "break-word" }}
          >{`کتاب‌ها / ${book?.title}`}</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xxs: "column", lg: "row" },
            justifyContent: "space-between",
            gap: 4,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: isUnder700px ? "column" : "row",
              gap: 4,
              width: "100%",
            }}
            ref={bookDetailsRef}
          >
            <Box
              sx={{
                width: isUnder700px ? "100%" : "250px",
                minWidth: isUnder700px ? "auto" : "250px",
                height: "fit-content",
              }}
            >
              <img
                src={book.coverUri}
                alt={`${book.title} cover`}
                style={{
                  width: "100%",
                  aspectRatio: "2/3",
                  objectFit: "cover",
                  boxShadow: `0 2px 4px 0 ${theme.palette.secondary.main}, 0 3px 10px 0 ${theme.palette.secondary.main}`,
                  borderRadius: "4px",
                }}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                width: "100%",
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  fontWeight: "bold",
                  wordBreak: "break-word",
                  fontSize: phone ? "1.2rem" : "1.5rem",
                }}
              >
                {`کتاب ${book.title}`}
              </Typography>

              <Typography
                sx={{
                  wordBreak: "break-word",
                  fontSize: phone ? "0.875rem" : "1rem",
                }}
              >
                {`نویسنده: ${book.authors?.join("، ")}`}
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  alignItems: "center",
                  flexWrap: "wrap",
                  fontSize: phone ? "0.875rem" : "1rem",
                }}
              >
                <Typography>امتیاز:</Typography>
                <Box>
                  <Typography>{getRartingAndCount(book).rating}</Typography>
                </Box>
                <Typography>{`از ${
                  getRartingAndCount(book).count
                } رای`}</Typography>
              </Box>

              <Typography sx={{ fontSize: phone ? "0.875rem" : "1rem" }}>
                {`قیمت: ${toPersianNumbers(priceSeparator(book.price))} ت`}
              </Typography>

              <Typography
                sx={{
                  wordBreak: "break-word",
                  fontSize: phone ? "0.875rem" : "1rem",
                }}
              >
                {`ناشر: ${book.publisher}`}
              </Typography>

              <Typography sx={{ fontSize: phone ? "0.875rem" : "1rem" }}>
                {`قیمت فیزیکی: ${toPersianNumbers(
                  priceSeparator(book.physicalPrice)
                )} ت`}
              </Typography>

              <Typography sx={{ fontSize: phone ? "0.875rem" : "1rem" }}>
                {`تعداد صفحات: ${toPersianNumbers(book.numberOfPages)}`}
              </Typography>

              <Typography
                sx={{
                  wordBreak: "break-word",
                  fontSize: phone ? "0.875rem" : "1rem",
                }}
              >
                {`توضیحات: ${book.description}`}
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  mt: 4,
                  flexDirection: "row",
                }}
              >
                <Button
                  onClick={() =>
                    window.open(
                      `https://taaghche.com/book/${book.id}`,
                      "_blank"
                    )
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
            </Box>
          </Box>

          <Box
            sx={{
              width: mediumScreenTablet ? "100%" : "auto",
              display: smallTablet ? "none" : "flex",
              justifyContent:'center'
            }}
          >
            <PersianEbookCard />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default BookDetail;
