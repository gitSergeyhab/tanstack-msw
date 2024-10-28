import { MOCK_URL } from "../const";
import { Country } from "../types/country";

export const fetchCountries = (): Promise<Country[]> =>
  fetch(`${MOCK_URL}/countries`).then((res) => res.json());
