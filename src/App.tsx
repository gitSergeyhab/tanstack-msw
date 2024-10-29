import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./shared/api/query-client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Nav } from "./components/nav";
import { Layout } from "./components/layout";
import Main from "./pages/main";
import Writers from "./pages/writers";
import Writer from "./pages/writer";
import Books from "./pages/books";
import Book from "./pages/book";
import CreateBook from "./pages/book-mutation/create-book-page";
import UpdateBook from "./pages/book-mutation/update-book-page";
import CreateWriter from "./pages/writer-mutation/create-writer-page";
import UpdateWriter from "./pages/writer-mutation/update-writer-page";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Nav />
        <Layout>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/books" element={<Books />} />
            <Route path="/writers" element={<Writers />} />
            <Route path="/writers/create" element={<CreateWriter />} />
            <Route path="/writers/:id/update" element={<UpdateWriter />} />
            <Route path="/books/create" element={<CreateBook />} />
            <Route path="/books/:id/update" element={<UpdateBook />} />
            <Route path="/writers/:id" element={<Writer />} />
            <Route path="/books/:id" element={<Book />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
