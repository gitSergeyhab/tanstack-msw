import { MOCK_URL } from "../const";
import { BookFull, BookItem } from "../types/book";
import { Order } from "../types/ui";
import { cleanQuery } from "../utils/clean-query";

export interface FetchBooks {
  authorId?: string;
  order?: Order;
  sortBy?: string;
}

export const fetchBooks = (params: FetchBooks): Promise<BookItem[]> => {
  const query = new URLSearchParams(cleanQuery(params)).toString();
  console.log({ query }, "fetchBooks");
  return fetch(`${MOCK_URL}/books?${query}`).then((res) => res.json());
};

export const fetchBook = (id: string): Promise<BookFull> =>
  fetch(`${MOCK_URL}/books/${id}`).then((res) => res.json());
