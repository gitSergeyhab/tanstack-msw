import { useMutation, useQueryClient } from "@tanstack/react-query";
import { request } from "../../api";

const requestDelWriter = async (id: string | number) => {
  const response = await request.delete<{ id: number }>(`/writers/${id}`);
  return response.data;
};

export const useDelWriter = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: requestDelWriter,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["writers"] });
    },
  });
};
