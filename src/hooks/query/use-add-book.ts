import { useMutation } from "@tanstack/react-query";
import { request } from "../../api";
import { BookFull, ServerBookNoId } from "../../types/book";

const requestAddBook = async (data: ServerBookNoId) => {
  const response = await request.post<BookFull>("/books", data);
  return response.data;
};

export const useAddBook = () => {
  return useMutation({
    mutationFn: requestAddBook,
  });
};
