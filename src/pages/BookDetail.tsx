import { Box, Button, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import { getAuthorsNames } from "../utils/getAuthorsNames";

export default function BookDetail() {

  const location = useLocation();
  const { book } = location.state || {};

  return (
    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
      <Box sx={{ display: "flex", gap: 1 }}>
        <img src={book?.coverUri} alt="book cover" style={{ width: "250px" }} />
        <Box sx={{ display: 'flex', flexDirection: "column" }}>
          <Typography>{`کتاب ${book?.title}`}</Typography>
          <Typography>{`نویسنده: ${getAuthorsNames(book?.authors)}`}</Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Typography>امتیاز:</Typography>
            <Box>
              <Typography>{book?.rating?.toFixed(1)}</Typography>
            </Box>
            <Typography>{`از ${""} رای`}</Typography>

          </Box>
          <Typography>{`قیمت: ${book?.price}`}</Typography>
          <Typography>{`ناشر: ${book?.publisher}`}</Typography>
          <Typography>{`قیمت فیزیکی: ${book?.physicalPrice}`}</Typography>
          <Typography>{`تعداد صفحات: ${book?.numberOfPages}`}</Typography>
          <Typography>{`توضیحات: ${book?.descriptions}`}</Typography>
          <Button onClick={() => window.open(`https://taaghche.com/book/${book?.id}`, '_blank')}>جزییات بیشتر</Button>

        </Box>

      </Box>
    </Box>

  )
}
