import { http, HttpResponse } from "msw";
import { MOCK_URL } from "../../const";
import { countries } from "../mock";
import { wait } from "../../utils/wait";

export const queryCountryHandlers = [
  http.get(`${MOCK_URL}/countries`, async () => {
    await wait(500);
    return HttpResponse.json(countries);
  }),
];
