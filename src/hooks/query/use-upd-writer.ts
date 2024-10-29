import { useMutation } from "@tanstack/react-query";
import { request } from "../../api";
import { WriterFull } from "../../types/writer";
import { WriterMutationFormData } from "../../types/forms";

interface RequestUpdWriter {
  data: WriterMutationFormData;
  id: number;
}
const requestUpdWriter = async ({ data, id }: RequestUpdWriter) => {
  const response = await request.put<WriterFull>(`/writers/${id}`, {
    ...data,
    id,
  });
  return response.data;
};

export const useUpdWriter = () =>
  useMutation({
    mutationFn: requestUpdWriter,
  });
