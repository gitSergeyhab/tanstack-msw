import { useQuery } from "@tanstack/react-query";
import { request } from "../../api";

import { WriterItem } from "../../types/writer";

interface RequestWriters {
  country: number;
}

const requestWriters = async ({ country }: RequestWriters) => {
  const response = await request<WriterItem[]>("/writers", {
    params: { country },
  });
  return response.data;
};

export const useGetWriters = ({ country }: RequestWriters) =>
  useQuery<WriterItem[], Error>({
    queryKey: ["writers", { country }],
    queryFn: () => requestWriters({ country }),
  });
