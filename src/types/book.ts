import { authorType } from "./author";
import { rateType } from "./rate";

export type bookType = {
  coverUri: string;
  title: string;
  authors: authorType[];
  price: number;
  rating: number;
  rates: rateType[];
};
