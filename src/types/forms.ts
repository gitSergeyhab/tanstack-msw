export interface BookMutationFormData {
  title: string;
  year: number;
  genre: string;
  authorId: number | null;
  mainCharacters: { name: string }[];
}

export interface WriterMutationFormData {
  firstName?: string;
  lastName?: string;
  birthYear?: number;
  deathYear?: number | null;
  countryId?: number | null;
  city?: string;
}
