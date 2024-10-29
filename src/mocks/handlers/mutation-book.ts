import { http, HttpResponse, PathParams } from "msw";
import { MOCK_URL } from "../../const";
import { books } from "../mock";
import { ServerBook, ServerBookNoId } from "../../types/book";
import { wait } from "../../utils/wait";

export const mutationBookHandlers = [
  http.post<PathParams, ServerBookNoId>(
    `${MOCK_URL}/books`,
    async ({ request }) => {
      const body = await request.json();
      const id = Math.max(...books.map((b) => b.id)) + 1;
      books.push({ ...body, id });
      await wait(500);
      return HttpResponse.json({ ...body, id });
    }
  ),

  http.put<PathParams, ServerBook>(
    `${MOCK_URL}/books/:id`,
    async ({ request }) => {
      const body = await request.json();
      const oldBook = books.find((b) => b.id === body.id);
      if (!oldBook) {
        return new HttpResponse("Book not found", { status: 404 });
      }
      books[books.indexOf(oldBook)] = body;
      await wait(500);
      return HttpResponse.json(body);
    }
  ),

  http.delete<{ id: string }>(`${MOCK_URL}/books/:id`, async ({ params }) => {
    const id = params.id;
    const book = books.find((b) => b.id === parseInt(id));
    await wait(500);
    if (book) {
      books.splice(books.indexOf(book), 1);
      return HttpResponse.json({ id: book.id });
    }
    return new HttpResponse("Book not found", { status: 404 });
  }),
];
