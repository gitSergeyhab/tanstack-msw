import { http, HttpResponse } from "msw";
import { MOCK_URL } from "../../const";
import { Order } from "../../types/ui";
import { BookItem } from "../../types/book";
import { books, writers } from "../mock";
import { wait } from "../../utils/wait";

export const queryBookHandlers = [
  http.get(`${MOCK_URL}/books`, async ({ request }) => {
    const url = new URL(request.url);
    const authorId = url.searchParams.get("authorId");
    const order = url.searchParams.get("order") as Order | undefined;
    const filteredBooks = authorId
      ? books.filter((b) => b.authorId === parseInt(authorId))
      : books;

    const booksWithAuthors: BookItem[] = filteredBooks.map((b) => ({
      ...b,
      author: writers.find((w) => w.id === b.authorId),
    }));
    booksWithAuthors.sort((a, b) =>
      order === "ASC" ? a.year - b.year : b.year - a.year
    );
    await wait(500);

    return HttpResponse.json(booksWithAuthors);
  }),

  http.get<{ id: string }>(`${MOCK_URL}/books/:id`, async ({ params }) => {
    const id = params.id;
    const book = books.find((b) => b.id === parseInt(id));
    await wait(500);

    if (book)
      return HttpResponse.json({
        ...book,
        author: writers.find((w) => w.id === book.authorId),
      });
    return new HttpResponse("Book not found", { status: 404 });
  }),
];
