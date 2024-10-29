import { useNavigate } from "react-router-dom";
import { useTitle } from "../../../hooks/use-title";
import { WriterForm } from "../form";
import { adaptCountries } from "../../../utils/adapters";
import { WriterMutationFormData } from "../../../types/forms";
import { useAddWriter } from "../../../hooks/query/use-add-writer";
import { useGetCountries } from "../../../hooks/query/use-get-countries";

export default function CreateWriter() {
  useTitle("Create Writer");
  const navigate = useNavigate();

  const countriesQuery = useGetCountries();
  const queryAddWriter = useAddWriter();

  if (countriesQuery.isPending) {
    return <h1>Loading...</h1>;
  }

  if (countriesQuery.error || !countriesQuery.data) {
    return <h1>Error</h1>;
  }

  const sendData = async (data: WriterMutationFormData) => {
    const result = await queryAddWriter.mutateAsync(data);
    navigate(`/writers/${result.id}`);
  };

  return (
    <>
      <h1>Create Writer</h1>
      <WriterForm
        countryOptions={adaptCountries(countriesQuery.data)}
        defaultValues={{}}
        onSubmit={sendData}
        error={queryAddWriter.error?.message}
        loading={queryAddWriter.isPending}
      />
    </>
  );
}
