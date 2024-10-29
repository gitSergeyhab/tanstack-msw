import { useMutation, useQueryClient } from "@tanstack/react-query";
import { request } from "../../api";

const requestDelBook = async (id: string | number) => {
  const response = await request.delete<{ id: number }>(`/books/${id}`);
  return response.data;
};

export const useDelBook = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: requestDelBook,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["books"] });
    },
  });
};
