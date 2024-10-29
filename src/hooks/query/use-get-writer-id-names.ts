import { useQuery } from "@tanstack/react-query";
import { request } from "../../api";
import { WriterNameId } from "../../types/writer";

const requestWriter = async () => {
  const response = await request<WriterNameId[]>(`/writers/id-names/`);
  return response.data;
};

export const useGetWritersIdNames = () =>
  useQuery<WriterNameId[], Error>({
    queryKey: ["writer-id-names"],
    queryFn: requestWriter,
  });
