import { useNavigate, useParams } from "react-router-dom";
import { BookForm } from "../form";
import { BookMutationFormData } from "../../../types/forms";
import { useTitle } from "../../../hooks/use-title";
import {
  adaptBookToBack,
  adaptBookToForm,
  adaptWriterIdName,
} from "../../../utils/adapters";
import { useUpdBook } from "../../../hooks/query/use-upd-book";
import { useGetWritersIdNames } from "../../../hooks/query/use-get-writer-id-names";
import { useGetBook } from "../../../hooks/query/use-get-book";

export default function UpdateBook() {
  useTitle("Update Book");

  const { id } = useParams() as { id: string };
  const navigate = useNavigate();

  const queryWriters = useGetWritersIdNames();
  const queryBook = useGetBook(id);
  const queryUpdBook = useUpdBook();

  if (queryWriters.isPending || queryBook.isPending) {
    return <h1>Loading...</h1>;
  }

  if (
    queryWriters.error ||
    queryBook.error ||
    !queryWriters.data ||
    !queryBook.data
  ) {
    return <h1>Error</h1>;
  }

  const sendData = async (data: BookMutationFormData) => {
    const result = await queryUpdBook.mutateAsync({
      data: adaptBookToBack(data),
      id: queryBook.data.id,
    });
    navigate(`/books/${result.id}`);
  };

  return (
    <>
      <h1>Update Book</h1>
      <BookForm
        authorOptions={queryWriters.data.map(adaptWriterIdName)}
        defaultValues={adaptBookToForm(queryBook.data)}
        onSubmit={sendData}
        error={queryUpdBook.error?.message}
        loading={queryUpdBook.isPending}
      />
    </>
  );
}
