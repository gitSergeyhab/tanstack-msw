import { useParams } from "react-router-dom";
import { BookSection } from "./book-section";
import { useTitle } from "../../hooks/use-title";
import { JsonText } from "../../components/json-text";
import { AppLink } from "../../components/link";
import { useQuery } from "@tanstack/react-query";
import { fetchWriter } from "../../fetch-data/fetch-writers";

export default function Writer() {
  const { id } = useParams() as { id: string };

  const { data, isPending, error } = useQuery({
    queryKey: ["writer", id],
    queryFn: () => fetchWriter(id),
  });

  const title = data ? `${data?.firstName} ${data?.lastName}` : "";

  useTitle(title);

  if (isPending) {
    return <h1>Loading...</h1>;
  }

  if (error || !data) {
    return <h1>Error</h1>;
  }

  return (
    <>
      <h1>{title}</h1>
      <JsonText>{JSON.stringify(data, null, 2)}</JsonText>
      <AppLink href={`/writers/${id}/update`}>Update Writer Data</AppLink>
      <BookSection />
    </>
  );
}
