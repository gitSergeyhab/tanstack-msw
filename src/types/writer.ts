export interface WriterItem {
  id: number;
  firstName: string;
  lastName: string;
  birthYear: number;
}

export interface WriterFull extends WriterItem {
  deathYear: number | null;
  country: number;
  city: string;
}

export interface WriterNameId {
  id: number;
  firstName: string;
  lastName: string;
}
