export interface WriterItem {
  id: number;
  firstName: string;
  lastName: string;
  birthYear: number;
}

export interface WriterFull extends WriterItem {
  deathYear: number | null;
  countryId: number;
  city: string;
}

export type WriterNoId = Omit<WriterFull, "id">;

export interface WriterNameId {
  id: number;
  firstName: string;
  lastName: string;
}
