import { http, HttpResponse } from "msw";
import { MOCK_URL } from "../../const";
import { writers } from "../mock";

export const queryWriterHandlers = [
  http.get(`${MOCK_URL}/writers`, ({ request }) => {
    const url = new URL(request.url);
    const country = url.searchParams.get("country");
    const writer = country
      ? writers.filter((w) => w.countryId === parseInt(country))
      : writers;
    return HttpResponse.json(writer);
  }),

  http.get(`${MOCK_URL}/writers/id-names`, () => {
    const writersData = writers.map(({ id, firstName, lastName }) => ({
      id,
      firstName,
      lastName,
    }));
    return HttpResponse.json(writersData);
  }),

  http.get<{ id: string }>(`${MOCK_URL}/writers/:id`, (req) => {
    const id = req.params.id;
    console.log({ id }, "/writers/:id");
    const writer = writers.find((w) => w.id === parseInt(id));
    if (writer) return HttpResponse.json(writer);
    return new HttpResponse("Writer not found", { status: 404 });
  }),
];
