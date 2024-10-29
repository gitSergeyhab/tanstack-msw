import { useMutation } from "@tanstack/react-query";
import { request } from "../../api";
import { WriterFull } from "../../types/writer";
import { ServerBookNoId } from "../../types/book";

interface RequestUpdBook {
  data: ServerBookNoId;
  id: number;
}
const requestUpdBook = async ({ data, id }: RequestUpdBook) => {
  const response = await request.put<WriterFull>(`/books/${id}`, {
    ...data,
    id,
  });
  return response.data;
};

export const useUpdBook = () =>
  useMutation({
    mutationFn: requestUpdBook,
  });
