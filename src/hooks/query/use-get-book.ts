import { useQuery } from "@tanstack/react-query";
import { request } from "../../api";
import { BookFull } from "../../types/book";

const requestBook = async (id: string) => {
  const response = await request<BookFull>(`/books/${id}`);
  return response.data;
};

export const useGetBook = (id: string) => {
  return useQuery<BookFull, Error>({
    queryKey: ["book"],
    queryFn: () => requestBook(id),
  });
};
