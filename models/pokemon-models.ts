export type RandomPokemonsAPIModel = {
  count: number;
  next: string;
  previous: null;
  results: PokemonBasicInfoModel[];
};

export type PokemonBasicInfoModel = {
  name: string;
  url: string;
};

export type PokemonModel = {
  name: string;
  attack: number,
  defense: number,
  image: string
};

export enum Winner {
  FIRST,
  SECOND,
  BOTH,
  NONE
}