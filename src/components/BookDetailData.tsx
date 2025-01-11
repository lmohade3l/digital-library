import { getRartingAndCount } from "../utils/getRatingAndCount";
import { priceSeparator, toPersianNumbers } from "../utils/numberUtils";
import { BookRating } from './DetailBookRating';
import { bookType } from "../types/book";

export const createBookDetailsData = ({ book, phone }: {book:bookType; phone:boolean}) => {
  const { rating, count } = getRartingAndCount(book);
  
  return [
    {
      id: 'title',
      title: 'کتاب',
      value: book.title,
      isTitle: true,
    },
    {
      id: 'authors',
      title: 'نویسنده',
      value: book.authors?.join('، '),
    },
    {
      id: 'rating',
      title: 'امتیاز',
      value: '',
      customComponent: <BookRating rating={rating} count={count} phone={phone} />,
    },
    {
      id: 'price',
      title: 'قیمت',
      value: `${toPersianNumbers(priceSeparator(book.price))} ت`,
    },
    {
      id: 'publisher',
      title: 'ناشر',
      value: book.publisher,
    },
    {
      id: 'physicalPrice',
      title: 'قیمت فیزیکی',
      value: `${toPersianNumbers(priceSeparator(book.physicalPrice))} ت`,
    },
    {
      id: 'pages',
      title: 'تعداد صفحات',
      value: toPersianNumbers(book.numberOfPages),
    },
    {
      id: 'description',
      title: 'توضیحات',
      value: book.description,
    },
  ];
};