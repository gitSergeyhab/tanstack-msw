import { useMutation } from "@tanstack/react-query";
import { request } from "../../api";

const requestDelWriter = async (id: string | number) => {
  const response = await request.delete<{ id: number }>(`/writers/${id}`);
  return response.data;
};

export const useDelWriter = () =>
  useMutation({
    mutationFn: requestDelWriter,
  });
