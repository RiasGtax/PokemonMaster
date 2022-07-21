import { PokemonModel } from "./../models/pokemon-models";
import { atom } from "jotai";

export const pokemonLibrary = atom<PokemonModel[]>([]);

export const selectedPokemon1 = atom<PokemonModel>({ name: "", attack: 0, defense: 0 });
export const selectedPokemon2 = atom<PokemonModel>({ name: "", attack: 0, defense: 0 });