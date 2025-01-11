import { useEffect, useRef } from "react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { bookType } from "../types/book";
import { theme } from "../theme";
import PersianEbookCard from "../components/BookMoreInfo";
import EmptyBookDetail from "../components/EmptyBookDetail";
import { createBookDetailsData } from "../components/BookDetailData";
import DetailButtons from "../components/DetailButtons";

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

  const bookData = book && createBookDetailsData({ book, phone });

  useEffect(() => {
    if (!book && id) {
      navigate("/");
    }
  }, [book, id, navigate]);

  if (!book) {
    return <EmptyBookDetail />;
  }

  return (
    <Box
      sx={{
        display: "flex",
        py: 3,
        px: { xxs: 0, ssm: 0 },
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
              {bookData?.map((item) =>
                item.customComponent ? (
                  <Box key={item.id}>{item.customComponent}</Box>
                ) : (
                  <Typography
                    key={item.id}
                    variant={item.isTitle ? "h5" : "body1"}
                    sx={{
                      wordBreak: "break-word",
                      fontSize: phone
                        ? item.isTitle
                          ? "1.2rem"
                          : "0.875rem"
                        : item.isTitle
                        ? "1.5rem"
                        : "1rem",
                      fontWeight: item.isTitle ? "bold" : "normal",
                    }}
                  >
                    {item.isTitle
                      ? `${item.title} ${item.value}`
                      : `${item.title}: ${item.value}`}
                  </Typography>
                )
              )}

              <DetailButtons book={book} bookDetailsRef={bookDetailsRef} />
            </Box>
          </Box>

          <Box
            sx={{
              width: mediumScreenTablet ? "100%" : "auto",
              display: smallTablet ? "none" : "flex",
              justifyContent: "center",
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
