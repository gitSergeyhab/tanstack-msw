import { useParams } from "react-router-dom";
import { JsonText } from "../../components/json-text";
import { useTitle } from "../../hooks/use-title";
import { AppLink } from "../../components/link";
import { useGetBook } from "../../hooks/query/use-get-book";

export default function Book() {
  const { id } = useParams() as { id: string };
  const { data, isPending, error } = useGetBook(id);
  useTitle(data?.title);

  if (isPending) {
    return <h1>Loading...</h1>;
  }

  if (error || !data) {
    return <h1>Error</h1>;
  }
  return (
    <>
      <h1>{data?.title}</h1>
      <JsonText>{JSON.stringify(data, null, 2)}</JsonText>
      <AppLink href={`/books/${id}/update`}>Update Book Data</AppLink>
    </>
  );
}
