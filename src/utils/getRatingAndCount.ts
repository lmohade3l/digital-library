import { bookType } from "../types/book";
import { toPersianNumbers } from "./numberUtils";

export const getRartingAndCount = (book: bookType) => {
  const count = book?.rates
    ?.map((r) => r.count)
    ?.reduce((acc, curr) => acc + curr, 0);

  return {
    ratingCount: `${toPersianNumbers(book.rating?.toFixed(1))} (${toPersianNumbers(count)})`,
    rating: toPersianNumbers(book.rating?.toFixed(1)),
    count : toPersianNumbers(count)
  };
};
