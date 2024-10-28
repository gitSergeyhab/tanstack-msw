import { http, HttpResponse } from "msw";
import { MOCK_URL } from "../const";
import { books, countries, writers } from "./mock";
import { BookItem } from "../types/book";
import { Order } from "../types/ui";

export const handlers = [
  http.get(`${MOCK_URL}/countries`, () => {
    return HttpResponse.json(countries);
  }),

  http.get(`${MOCK_URL}/writers`, ({ request }) => {
    const url = new URL(request.url);
    const country = url.searchParams.get("country");
    const writer = country
      ? writers.filter((w) => w.country === parseInt(country))
      : writers;
    return HttpResponse.json(writer);
  }),

  http.get<{ id: string }>(`${MOCK_URL}/writers/:id`, (req) => {
    const id = req.params.id;
    console.log({ id }, "/writers/:id");
    const writer = writers.find((w) => w.id === parseInt(id));
    if (writer) return HttpResponse.json(writer);
    return new HttpResponse("Writer not found", { status: 404 });
  }),

  //   http.post(`${MOCK_URL}/writers`, (req) => {
  //     const writer = req.body as WriterFull;
  //     return HttpResponse.json({ ...writer, id: 9999 });
  //   }),

  http.get(`${MOCK_URL}/books`, ({ request }) => {
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
    return HttpResponse.json(booksWithAuthors);
  }),

  http.get<{ id: string }>(`${MOCK_URL}/books/:id`, ({ params }) => {
    const id = params.id;
    console.log({ id }, "/book/:id");
    const book = books.find((b) => b.id === parseInt(id));
    if (book) return HttpResponse.json(book);
    return new HttpResponse("Book not found", { status: 404 });
  }),
];
