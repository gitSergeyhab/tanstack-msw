import { useQuery } from "@tanstack/react-query";
import { request } from "../../api";
import { WriterFull } from "../../types/writer";

const requestWriter = async (id: string) => {
  const response = await request<WriterFull>(`/writers/${id}`);
  return response.data;
};

export const useGetWriter = (id: string) =>
  useQuery<WriterFull, Error>({
    queryKey: ["writer"],
    queryFn: () => requestWriter(id),
  });
