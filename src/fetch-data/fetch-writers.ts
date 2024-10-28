import { MOCK_URL } from "../const";
import { WriterFull, WriterItem } from "../types/writer";

export const fetchWriters = (
  country: number | string | null
): Promise<WriterItem[]> =>
  fetch(`${MOCK_URL}/writers/?country=${country || ""}`).then((res) =>
    res.json()
  );

export const fetchWriter = (id: string): Promise<WriterFull> => {
  console.log({ id }, "fetchWriter");
  return fetch(`${MOCK_URL}/writers/${id}`).then((res) => res.json());
};
