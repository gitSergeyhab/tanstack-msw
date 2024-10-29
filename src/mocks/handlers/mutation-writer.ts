import { http, HttpResponse, PathParams } from "msw";
import { MOCK_URL } from "../../const";
import { wait } from "../../utils/wait";
import { WriterFull, WriterNoId } from "../../types/writer";
import { writers } from "../mock";

export const mutationWriterHandlers = [
  http.post<PathParams, WriterNoId>(
    `${MOCK_URL}/writers`,
    async ({ request }) => {
      console.log("mutationWriterHandlers________  start");
      const body = await request.json();
      console.log({ body }, "mutationWriterHandlers");
      const id = Math.max(...writers.map((w) => w.id)) + 1;
      writers.push({ ...body, id });
      await wait(1000);
      return HttpResponse.json({ ...body, id });
    }
  ),

  http.put<PathParams, WriterFull>(
    `${MOCK_URL}/writers/:id`,
    async ({ request }) => {
      const body = await request.json();
      const oldWriter = writers.find((w) => w.id === body.id);
      if (!oldWriter) {
        return new HttpResponse("Book not found", { status: 404 });
      }
      writers[writers.indexOf(oldWriter)] = body;
      await wait(1000);
      return HttpResponse.json(body);
    }
  ),

  http.delete<{ id: string }>(`${MOCK_URL}/writers/:id`, ({ params }) => {
    const id = params.id;
    console.log({ id }, "deleteWriter");
    const writer = writers.find((w) => w.id === parseInt(id));
    if (writer) {
      writers.splice(writers.indexOf(writer), 1);
      return HttpResponse.json({ id: writer.id });
    }
    return new HttpResponse("Writer not found", { status: 404 });
  }),
];
