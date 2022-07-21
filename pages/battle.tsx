import { NextPage } from "next";
import { SetStateAction, useEffect, useState } from "react";
import { PokemonBasicInfoModel, PokemonModel, RandomPokemonsAPIModel, Winner } from "../models/pokemon-models";
import Loading from "./loading";

/**
 * Gets info from 10 random pokemons and returns it
 * API info: https://pokeapi.co/
 * @param setStatus 
 * @param setDataAPI 
 * @param setError 
 * @param isLoading 
 */
const getRandomPokemons = async (
  setStatus: React.Dispatch<SetStateAction<number>>,
  setDataAPI: React.Dispatch<SetStateAction<any>>,
  setError: React.Dispatch<SetStateAction<any>>,
  isLoading: React.Dispatch<SetStateAction<boolean>>) => {

  isLoading(true)
  let list: PokemonBasicInfoModel[] = [];
  try {
    // First API call to get info of 10 random pokemons
    const randomNumber = Math.floor(Math.random() * 1000);
    const apiResponse = await fetch("https://pokeapi.co/api/v2/pokemon?limit=10&offset=" + randomNumber);
    const json = await apiResponse.json();
    setStatus(200)

    list = json.results;
  } catch (error) {
    setError(error)
  }

  // Loop each pokemon of the 10 selected ones above and query the API to get extra info like their attack and defense
  const result: PokemonModel[] = [];
  for (let pokemon of list) {
    const apiResponse = await fetch("https://pokeapi.co/api/v2/pokemon/" + pokemon.name);
    const json = await apiResponse.json();

    // Get extra info
    let attack: number = json.stats.find((e: any) => e.stat.name === "attack").base_stat;
    let defense: number = json.stats.find((e: any) => e.stat.name === "defense").base_stat;

    result.push({
      name: pokemon.name,
      attack: attack,
      defense: defense
    });
  }
  setDataAPI(result)
  isLoading(false)
};

/**
 * Capitalize input string and returns it
 * @param str 
 * @returns 
 */
const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Calculate result of the fight between 2 pokemons
 * @param pokemon1 
 * @param pokemon2 
 * @param setVictory 
 */
const fight = (
  pokemon1: PokemonModel,
  pokemon2: PokemonModel,
  setVictory: React.Dispatch<SetStateAction<Winner>>) => {

  // Pokemon actions
  const points1 = pokemon1.attack - pokemon2.defense * Math.floor(Math.random());
  const points2 = pokemon2.attack - pokemon1.defense * Math.floor(Math.random());

  // Check who is the winner and set the value
  if (points1 > points2) {
    setVictory(Winner.FIRST)
  } else if (points2 > points1) {
    setVictory(Winner.SECOND)
  } else {
    setVictory(Winner.BOTH)
  }
}

const Battle: NextPage = () => {
  const [loading, isLoading] = useState<boolean>(false)
  const [status, setStatus] = useState<number>(200)
  const [dataAPI, setDataAPI] = useState<PokemonModel[]>()
  const [error, setError] = useState<any>()

  const [victory, setVictory] = useState<Winner>(Winner.NONE)

  // Query info to the API
  useEffect(() => {
    getRandomPokemons(setStatus, setDataAPI, setError, isLoading)
  }, []);
  if (loading) return <Loading />
  if (status != 200) return <p>An error has ocurred, error: {error}</p>

  return (
    <>
      <div className='flex h-screen'>
        <div className='m-auto'>
          <div className="indexTitle">
            <b>Pokemon List</b>
          </div>
          <table className="table table-compact w-full table-zebra">
            <thead>
              <tr>
                <th>Name</th>
                <th>Attack</th>
                <th>Defense</th>
              </tr>
            </thead>
            <tbody>
              {dataAPI?.map((obj) => {
                return (<tr>
                  <td><b>{capitalize(obj.name)}</b></td>
                  <td className="text-center">{obj.attack}</td>
                  <td className="text-center">{obj.defense}</td>
                </tr>)
              })}
            </tbody>
          </table>
          <br />
          <div>
            <button className="w-full btn" onClick={() => { getRandomPokemons(setStatus, setDataAPI, setError, isLoading) }}>Refresh</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Battle