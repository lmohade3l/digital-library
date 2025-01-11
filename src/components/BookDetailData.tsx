import { getRartingAndCount } from "../utils/getRatingAndCount";
import { priceSeparator, toPersianNumbers } from "../utils/numberUtils";
import BookRating from "./DetailBookRating";
import { bookType } from "../types/book";
import { getAuthorsNames } from "../utils/getAuthorsNames";
import { t } from "../hooks/useTranslate";

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
      title: t("book"),
      value: book.title,
      isTitle: true,
    },
    {
      id: "authors",
      title: t("author"),
      value: book?.authors ? getAuthorsNames(book?.authors) : "",
    },
    {
      id: "rating",
      title: t("rating"),
      value: "",
      customComponent: (
        <BookRating rating={rating} count={count} phone={phone} />
      ),
    },
    {
      id: "price",
      title: t("price"),
      value: `${toPersianNumbers(priceSeparator(book.price))} ${t("toman")}`,
    },
    {
      id: "publisher",
      title: t("publisher"),
      value: book.publisher,
    },
    {
      id: "physicalPrice",
      title: t("physicalPrice"),
      value: book?.PhysicalPrice
        ? `${toPersianNumbers(priceSeparator(book.PhysicalPrice))} ${t(
            "toman"
          )}`
        : "-",
    },
    {
      id: "pages",
      title: t("pages"),
      value: toPersianNumbers(book.numberOfPages),
    },
    {
      id: "description",
      title: t("description"),
      value: book.description ? book?.description : "-",
    },
  ];
};
