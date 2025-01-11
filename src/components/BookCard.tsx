import { Box, Skeleton, Typography, useMediaQuery } from "@mui/material";
import { bookType } from "../types/book";
import { getAuthorsNames } from "../utils/getAuthorsNames";
import { getRartingAndCount } from "../utils/getRatingAndCount";
import { priceSeparator, toPersianNumbers } from "../utils/numberUtils";
import { theme } from "../theme";
import { useNavigate } from "react-router-dom";
import StarIcon from "../assets/images/star.png";
import { t } from "../hooks/useTranslate";

export default function BookCard({
  book,
  isLoading,
}: {
  book?: bookType;
  isLoading: boolean;
}) {
  const phone = useMediaQuery(theme.breakpoints.down("xxs"));
  const navigate = useNavigate();

  if (isLoading) {
    return phone ? (
      <Box
        sx={{
          display: "flex",
          gap: 2,
          py: 1.5,
          px: 3,
          bgcolor: "#FFF",
          mt: 2,
          border: `1px solid ${theme.palette.secondary.main}`,
          borderRadius: "10px",
        }}
      >
        <Skeleton
          variant="rectangular"
          width={200}
          height={150}
          sx={{ borderRadius: "4px", width: "200px" }}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Box sx={{ mt: 1 }}>
            <Skeleton width="80%" />
            <Skeleton width="60%" />
            <Skeleton width="40%" />
          </Box>
          <Skeleton width="30%" />
        </Box>
      </Box>
    ) : (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          py: 1.5,
          px: 3,
          bgcolor: "#FFF",
          mt: 2,
          border: `1px solid ${theme.palette.secondary.main}`,
          borderRadius: "10px",
          mx: 1,
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Skeleton
              variant="rectangular"
              height={200}
              sx={{ borderRadius: "4px", width: "130px" }}
            />
          </Box>
          <Box sx={{ mt: 1, height: "110px" }}>
            <Skeleton width="100%" />
            <Skeleton width="80%" />
            <Skeleton width="60%" />
          </Box>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Skeleton width={60} />
        </Box>
      </Box>
    );
  }

  return (
    <>
      {phone ? (
        <Box
          sx={{
            display: "flex",
            gap: 2,
            py: 1.5,
            px: 3,
            bgcolor: "#FFF",
            mt: 2,
            border: `1px solid ${theme.palette.secondary.main}`,
            borderRadius: "10px",
            width: "100%",
          }}
          onClick={() =>
            book && navigate(`/book/${book.id}`, { state: { book } })
          }
        >
          <img
            src={book?.coverUri}
            alt=""
            style={{
              width: "100px",
              boxShadow: `0 2px 4px 0 ${theme.palette.secondary.main}, 0 3px 10px 0 ${theme.palette.secondary.main}`,
              cursor: "pointer",
              borderRadius: "4px",
            }}
          />

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                mt: 1,
              }}
            >
              <Typography sx={{ fontSize: "14px" }}>{book?.title}</Typography>
              <Typography>
                {book?.authors ? getAuthorsNames(book?.authors) : ""}
              </Typography>
              <Typography sx={{ fontSize: "12px" }}>
                {book ? getRartingAndCount(book).ratingCount : ""}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
              <Typography sx={{ fontSize: "13px" }}>
                {book?.price
                  ? toPersianNumbers(priceSeparator(book?.price))
                  : ""}{" "}
                {t("t")}
              </Typography>
            </Box>
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            py: 1.5,
            px: 2,
            bgcolor: "#FFF",
            mt: 2,
            border: `1px solid ${theme.palette.secondary.main}`,
            borderRadius: "10px",
            mx: 1,
            justifyContent: "space-between",
            height: "auto",
          }}
          onClick={() =>
            book && navigate(`/book/${book.id}`, { state: { book } })
          }
        >
          <Box>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <img
                src={book?.coverUri}
                alt=""
                style={{
                  width: "97%",
                  boxShadow: `0 2px 4px 0 ${theme.palette.secondary.main}, 0 3px 10px 0 ${theme.palette.secondary.main}`,
                  cursor: "pointer",
                  borderRadius: "4px",
                }}
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                mt: 1,
                height: "110px",
              }}
            >
              <Typography sx={{ fontSize: "14px", fontWeight: 500 }}>
                {book?.title}
              </Typography>
              <Typography sx={{ fontSize: "13px", mt: 0.4 }}>
                {book?.authors ? getAuthorsNames(book?.authors) : ""}
              </Typography>

              <Box sx={{ display: "flex", gap: 0.5, mt: "2px" }}>
                <img
                  src={StarIcon}
                  alt="star"
                  style={{ width: "12px", height: "12px", marginTop: "0.7px" }}
                />
                <Typography sx={{ fontSize: "12px" }}>
                  {book ? getRartingAndCount(book).ratingCount : ""}
                </Typography>
              </Box>
            </Box>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 0.4 }}>
            <Typography sx={{ fontSize: "16px", fontWeight: 600 }}>
              {book?.price ? toPersianNumbers(priceSeparator(book?.price)) : ""}
            </Typography>
            <Typography sx={{ fontSize: "16px" }}>{t("t")}</Typography>
          </Box>
        </Box>
      )}
    </>
  );
}
