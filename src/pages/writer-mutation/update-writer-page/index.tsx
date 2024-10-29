import { useNavigate, useParams } from "react-router-dom";
import { WriterMutationFormData } from "../../../types/forms";
import { useTitle } from "../../../hooks/use-title";
import { WriterForm } from "../form";
import { adaptCountries } from "../../../utils/adapters";
import { useUpdWriter } from "../../../hooks/query/use-upd-writer";
import { useGetCountries } from "../../../hooks/query/use-get-countries";
import { useGetWriter } from "../../../hooks/query/use-get-writer";

export default function UpdateWriter() {
  useTitle("Update Writer");

  const { id } = useParams() as { id: string };

  const navigate = useNavigate();

  const queryWriter = useGetWriter(id);
  const queryCountries = useGetCountries();
  const queryUpdWriter = useUpdWriter();

  if (queryCountries.isPending || queryWriter.isPending) {
    return <h1>Loading...</h1>;
  }

  if (
    queryCountries.error ||
    !queryCountries.data ||
    !queryWriter.data ||
    queryWriter.error
  ) {
    return <h1>Error</h1>;
  }

  const sendData = async (data: WriterMutationFormData) => {
    const result = await queryUpdWriter.mutateAsync({
      data,
      id: queryWriter.data.id,
    });
    navigate(`/writers/${result.id}`);
  };

  return (
    <>
      <h1>Update Writer</h1>
      <WriterForm
        countryOptions={adaptCountries(queryCountries.data)}
        defaultValues={queryWriter.data}
        onSubmit={sendData}
        error={queryUpdWriter.error?.message}
        loading={queryUpdWriter.isPending}
      />
    </>
  );
}
