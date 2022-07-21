import { atom } from "jotai";
import { PokemonModel } from "./../models/pokemon-models";

export const pokemonLibrary = atom<PokemonModel[]>([]);

export const selectedPokemon1 = atom<PokemonModel>({
  name: "",
  attack: 0,
  defense: 0,
  image: "",
});
export const selectedPokemon2 = atom<PokemonModel>({
  name: "",
  attack: 0,
  defense: 0,
  image: "",
});
