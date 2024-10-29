import { useMutation } from "@tanstack/react-query";
import { request } from "../../api";
import { WriterFull } from "../../types/writer";
import { WriterMutationFormData } from "../../types/forms";

const requestAddWriter = async (data: WriterMutationFormData) => {
  const response = await request.post<WriterFull>("/writers", data);
  return response.data;
};

export const useAddWriter = () =>
  useMutation({
    mutationFn: requestAddWriter,
  });
