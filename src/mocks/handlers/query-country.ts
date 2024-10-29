import { http, HttpResponse } from "msw";
import { MOCK_URL } from "../../const";
import { countries } from "../mock";

export const queryCountryHandlers = [
  http.get(`${MOCK_URL}/countries`, () => {
    return HttpResponse.json(countries);
  }),
];
