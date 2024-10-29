import { http, HttpResponse } from "msw";
import { MOCK_URL } from "../../const";
import { writers } from "../mock";
import { wait } from "../../utils/wait";

export const queryWriterHandlers = [
  http.get(`${MOCK_URL}/writers`, async ({ request }) => {
    const url = new URL(request.url);
    const country = url.searchParams.get("country");
    const writer = country
      ? writers.filter((w) => w.countryId === parseInt(country))
      : writers;

    await wait(500);
    return HttpResponse.json(writer);
  }),

  http.get(`${MOCK_URL}/writers/id-names`, async () => {
    const writersData = writers.map(({ id, firstName, lastName }) => ({
      id,
      firstName,
      lastName,
    }));

    await wait(500);
    return HttpResponse.json(writersData);
  }),

  http.get<{ id: string }>(`${MOCK_URL}/writers/:id`, async (req) => {
    const id = req.params.id;
    const writer = writers.find((w) => w.id === parseInt(id));
    await wait(500);
    if (writer) return HttpResponse.json(writer);
    return new HttpResponse("Writer not found", { status: 404 });
  }),
];
