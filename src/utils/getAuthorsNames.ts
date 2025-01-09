import { authorType } from "../types/author";

export const getAuthorsNames = (authors: authorType[]) => {
  return authors
    ?.map((a) => `${a.fisrtName || ""} ${a.lastName || ""}`)
    .join("، ");
};
