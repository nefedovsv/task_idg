export interface PokemonData {
  name: string;
  url: string;
}

export interface PokemonsPage {
  count: number;
  next: string;
  previous: string | null;
  results: PokemonData[];
}

export interface DataFromDB {
  _id: string;
  name: string;
}

export interface Pokemon {
  height: number;
  isFavourite: boolean;
  id: number;
  name: string;
  avatar: string;
  types: string;
  weight: number;
  user?: string;
  _id?: string;
}
