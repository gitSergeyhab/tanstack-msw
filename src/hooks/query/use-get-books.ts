import { useQuery } from "@tanstack/react-query";
import { request } from "../../api";
import { BookItem } from "../../types/book";
import { Order } from "../../types/ui";

interface RequestBooks {
  sortBy?: string;
  order?: Order;
  authorId?: number | string;
}

const requestBooks = async (params: RequestBooks) => {
  const response = await request<BookItem[]>("/books", {
    params,
  });
  return response.data;
};

export const useGetBooks = (params: RequestBooks) => {
  // const queryClient = useQueryClient();
  return useQuery<BookItem[], Error>({
    queryKey: ["books", params],
    queryFn: () => requestBooks(params),
    // onSuccess: (data) => {
    //     // queryClient.setQueryData(["books"], data);
    // },
  });
};
