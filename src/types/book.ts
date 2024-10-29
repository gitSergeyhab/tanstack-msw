export interface ServerBook {
  id: number;
  authorId: number | null;
  title: string;
  year: number;
  mainCharacters: string[];
  genre: string;
}

export type ServerBookNoId = Omit<ServerBook, "id">;

export interface BookItem {
  id: number;
  title: string;
  year: number;
  author?: {
    firstName: string;
    lastName: string;
  };
}

export interface BookFull extends BookItem {
  mainCharacters: string[];
  genre: string;
  authorId: number;
}
