import { useParams } from "react-router-dom";
import { FC } from "react";
import { BookList } from "../../components/book-list";
import { useGetBooks } from "../../hooks/query/use-get-books";

export const BookSection: FC = () => {
  const { id } = useParams() as { id: string };
  const { data, error, isPending } = useGetBooks({ authorId: id });

  if (isPending) {
    return <h1>Loading...</h1>;
  }

  if (error || !data) {
    return <h1>Error</h1>;
  }
  return (
    <section>
      <h2>Writer`s Books</h2>
      {data?.length ? <BookList books={data} /> : <p>No books =((</p>}
    </section>
  );
};
