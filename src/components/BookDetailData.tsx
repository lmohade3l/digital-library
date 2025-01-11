import { getRartingAndCount } from "../utils/getRatingAndCount";
import { priceSeparator, toPersianNumbers } from "../utils/numberUtils";
import { BookRating } from "./DetailBookRating";
import { bookType } from "../types/book";
import { getAuthorsNames } from "../utils/getAuthorsNames";

export const createBookDetailsData = ({
  book,
  phone,
}: {
  book: bookType;
  phone: boolean;
}) => {
  const { rating, count } = getRartingAndCount(book);

  return [
    {
      id: "title",
      title: "کتاب",
      value: book.title,
      isTitle: true,
    },
    {
      id: "authors",
      title: "نویسنده",
      value: book?.authors ? getAuthorsNames(book?.authors) : "",
    },
    {
      id: "rating",
      title: "امتیاز",
      value: "",
      customComponent: (
        <BookRating rating={rating} count={count} phone={phone} />
      ),
    },
    {
      id: "price",
      title: "قیمت",
      value: `${toPersianNumbers(priceSeparator(book.price))} تومان`,
    },
    {
      id: "publisher",
      title: "ناشر",
      value: book.publisher,
    },
    {
      id: "physicalPrice",
      title: "قیمت فیزیکی",
      value: book?.PhysicalPrice ?  `${toPersianNumbers(priceSeparator(book.PhysicalPrice))} تومان` : "-",
    },
    {
      id: "pages",
      title: "تعداد صفحات",
      value: toPersianNumbers(book.numberOfPages),
    },
    {
      id: "description",
      title: "توضیحات",
      value: book.description ? book?.description : "-",
    },
  ];
};
