import { useQuery } from "@tanstack/react-query";
import { request } from "../../api";
import { Country } from "../../types/country";

const requestCountries = async () => {
  const response = await request<Country[]>("/countries");
  return response.data;
};

export const useGetCountries = () => {
  return useQuery({
    queryKey: ["countries"],
    queryFn: requestCountries,
  });
};
