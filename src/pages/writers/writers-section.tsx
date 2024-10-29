import { FC } from "react";
import { WriterList } from "../../components/writer-list";
import { useGetWriters } from "../../hooks/query/use-get-writers";
import { useDelWriter } from "../../hooks/query/use-del-writer";

interface WritersSectionProps {
  country: number | string | null;
}

export const WritersSection: FC<WritersSectionProps> = ({ country }) => {
  const queryWriters = useGetWriters({ country: country as number });

  const queryDelWriter = useDelWriter();

  if (queryWriters.isPending) {
    return <h2>Loading...</h2>;
  }

  if (queryWriters.error || !queryWriters.data) {
    return <h2>Error</h2>;
  }

  if (queryDelWriter.error) {
    console.error(queryDelWriter.error);
  }

  if (!queryWriters.data?.length) return <h2>No Writers</h2>;

  return (
    <WriterList writers={queryWriters.data} onDelete={queryDelWriter.mutate} />
  );
};
