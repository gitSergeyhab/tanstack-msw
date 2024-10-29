import { setupWorker } from "msw/browser";
import { queryBookHandlers } from "./handlers/query-book";
import { queryCountryHandlers } from "./handlers/query-country";
import { queryWriterHandlers } from "./handlers/query-writer";
import { mutationBookHandlers } from "./handlers/mutation-book";
import { mutationWriterHandlers } from "./handlers/mutation-writer";

export const worker = setupWorker(
  ...queryBookHandlers,
  ...queryCountryHandlers,
  ...queryWriterHandlers,
  ...mutationBookHandlers,
  ...mutationWriterHandlers
);
