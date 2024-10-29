import { createBookDefaultValues } from "../const";
import { BookForm } from "../form";
import { BookMutationFormData } from "../../../types/forms";
import { useTitle } from "../../../hooks/use-title";
import { useNavigate } from "react-router-dom";
import { adaptBookToBack, adaptWriterIdName } from "../../../utils/adapters";
import { useAddBook } from "../../../hooks/query/use-add-book";
import { useGetWritersIdNames } from "../../../hooks/query/use-get-writer-id-names";

export default function CreateBook() {
  useTitle("Add Book");

  const queryWriters = useGetWritersIdNames();
  const queryAddBook = useAddBook();

  const navigate = useNavigate();

  if (queryWriters.isPending) {
    return <h1>Loading...</h1>;
  }

  if (queryWriters.error || !queryWriters.data) {
    return <h1>Error</h1>;
  }

  const sendData = async (bodyData: BookMutationFormData) => {
    const result = await queryAddBook.mutateAsync(adaptBookToBack(bodyData));
    navigate(`/books/${result.id}`);
  };

  return (
    <>
      <h1>Create Book</h1>
      <BookForm
        authorOptions={queryWriters.data.map(adaptWriterIdName)}
        defaultValues={createBookDefaultValues}
        onSubmit={sendData}
        error={queryAddBook.error?.message}
        loading={queryAddBook.isPending}
      />
    </>
  );
}
