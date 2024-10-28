import { FC } from "react";
import { WriterList } from "../../components/writer-list";
import { useQuery } from "@tanstack/react-query";
import { fetchWriters } from "../../fetch-data/fetch-writers";

interface WritersSectionProps {
  country: number | string | null;
}

export const WritersSection: FC<WritersSectionProps> = ({ country }) => {
  const { data, error, isPending } = useQuery({
    queryKey: ["writers", country],
    queryFn: () => fetchWriters(country),
  });

  // const [deleteWriter, { error: deleteError }] = useMutation(DELETE_WRITER, {
  //   refetchQueries: ["GET_WRITERS"],
  // });

  if (isPending) {
    return <h2>Loading...</h2>;
  }

  if (error || !data) {
    return <h2>Error</h2>;
  }

  // if (deleteError) {
  //   console.error(deleteError);
  // }

  const onDelete = (id: string) => {
    console.log(id);
    // deleteWriter({ variables: { id } });
  };

  if (!data?.length) return <h2>No Writers</h2>;

  return <WriterList writers={data} onDelete={onDelete} />;
};
