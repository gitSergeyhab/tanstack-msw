import { useState } from "react";
import { BookList } from "../../components/book-list";
import { Select } from "../../components/select";
import { ORDER_OPTIONS } from "./const";
import { Order } from "../../types/ui";
import { useTitle } from "../../hooks/use-title";
import { useQuery } from "@tanstack/react-query";
import { fetchBooks } from "../../fetch-data/fetch-books";

export default function Books() {
  useTitle("Books");
  const [order, setOrder] = useState<Order>("ASC");
  const { data, error, isPending } = useQuery({
    queryKey: ["books", order],
    queryFn: () => fetchBooks({ order, sortBy: "year" }),
  });
  // const [deleteBook, { error: deleteError }] = useMutation(DELETE_BOOK, {
  //   refetchQueries: [
  //     { query: GET_BOOKS, variables: { sortBy: "year", order: order } },
  //   ],
  // });

  const onSelect = (value: string) => setOrder(value as Order);

  if (isPending) {
    return <h1>Loading...</h1>;
  }

  if (error || !data) {
    return <h1>Error</h1>;
  }

  // if (deleteError) {
  //   console.error(deleteError);
  // }

  const onDelete = (id: string) => {
    console.log(id);
    // deleteBook({ variables: { id } });
  };

  return (
    <>
      <h1>Books</h1>
      <Select onSelect={onSelect} options={ORDER_OPTIONS} />
      {data?.length ? (
        <BookList books={data} onDelete={onDelete} />
      ) : (
        <p>No books =((</p>
      )}
    </>
  );
}
