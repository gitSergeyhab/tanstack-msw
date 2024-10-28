export interface MockBook {
  id: number;
  authorId: number;
  title: string;
  year: number;
  mainCharacters: string[];
  genre: string;
}

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
