import { bookType } from "../types/book";

export const getRartingAndCount = (book: bookType) => {
  const count = book?.rates
    ?.map((r) => r.count)
    ?.reduce((acc, curr) => acc + curr, 0);

  return `${book.rating?.toFixed(1)} (${count})`;
};
