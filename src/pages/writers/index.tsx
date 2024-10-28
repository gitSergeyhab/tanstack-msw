import { WritersSection } from "./writers-section";
import { useState } from "react";
import { Select } from "../../components/select";
import { adaptCountries } from "../../utils/adapters";
import { useQuery } from "@tanstack/react-query";
import { fetchCountries } from "../../fetch-data/fetch-countries";

export default function Writers() {
  const { data, error, isPending } = useQuery({
    queryKey: ["countries"],
    queryFn: fetchCountries,
  });

  const [countryId, setCountryId] = useState<number | null | string>(null);
  console.log({ countryId, data });

  if (isPending) {
    return <h1>Loading...</h1>;
  }

  if (error || !data) {
    return <h1>Error</h1>;
  }

  const options = [{ value: "", label: "All" }, ...adaptCountries(data)];

  return (
    <>
      <h1>Authors</h1>
      <Select onSelect={setCountryId} options={options} />
      <WritersSection country={countryId} />
    </>
  );
}
