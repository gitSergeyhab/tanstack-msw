import { useState } from "react";
import { BookList } from "../../components/book-list";
import { Select } from "../../components/select";
import { ORDER_OPTIONS } from "./const";
import { Order } from "../../types/ui";
import { useTitle } from "../../hooks/use-title";
import { useGetBooks } from "../../hooks/query/use-get-books";
import { useDelBook } from "../../hooks/query/use-del-book";

export default function Books() {
  useTitle("Books");
  const [order, setOrder] = useState<Order>("ASC");

  const queryBooks = useGetBooks({ order, sortBy: "year" });
  const queryDelBook = useDelBook();

  const onSelect = (value: string) => setOrder(value as Order);

  if (queryBooks.isPending) {
    return <h1>Loading...</h1>;
  }

  if (queryBooks.error || !queryBooks.data) {
    return <h1>Error</h1>;
  }

  if (queryDelBook.error) {
    console.error(queryDelBook.error);
  }

  return (
    <>
      <h1>Books</h1>
      <Select onSelect={onSelect} options={ORDER_OPTIONS} />
      {queryBooks.data?.length ? (
        <BookList books={queryBooks.data} onDelete={queryDelBook.mutate} />
      ) : (
        <p>No books =((</p>
      )}
    </>
  );
}
