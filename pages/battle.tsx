import { useAtom } from "jotai";
import { NextPage } from "next";
import Image from "next/image";
import React, { lazy, SetStateAction, useEffect, useState } from "react";
import Loading from "../components/loading";
import { pokemonLibrary, selectedPokemon1, selectedPokemon2 } from "../global/pokemon_storage";
import { capitalize } from "../global/util";
import { PokemonBasicInfoModel, PokemonModel, Winner } from "../models/pokemon-models";

const Table = lazy(() => import("../components/table"))

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
  setError: React.Dispatch<SetStateAction<any>>,
  setDataAPI: React.Dispatch<SetStateAction<PokemonModel[]>>,
  isLoading: React.Dispatch<SetStateAction<boolean>>) => {

  isLoading(true)
  let list: PokemonBasicInfoModel[] = []
  try {
    // First API call to get info of 10 random pokemons
    const randomNumber = Math.floor(Math.random() * 1000);
    const apiResponse = await fetch("https://pokeapi.co/api/v2/pokemon?limit=10&offset=" + randomNumber);
    const json = await apiResponse.json();
    setStatus(200)

    list = json.results
  } catch (error) {
    setStatus(500)
    setError(error)
  }

  const result: PokemonModel[] = []
  // Loop each pokemon of the 10 selected ones above and query the API to get extra info like their attack and defense
  for (let pokemon of list) {
    const apiResponse = await fetch("https://pokeapi.co/api/v2/pokemon/" + pokemon.name);
    const json = await apiResponse.json()

    // Get extra info
    let attack: number = json.stats.find((e: any) => e.stat.name === "attack").base_stat
    let defense: number = json.stats.find((e: any) => e.stat.name === "defense").base_stat
    let image: string = json.sprites.front_default

    result.push({
      name: pokemon.name,
      attack: attack,
      defense: defense,
      image: image
    });
  }

  // Timeout para mostrar la pantalla de carga
  setTimeout(() => { setDataAPI(result); isLoading(false) }, 2000)
};

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
  const points1 = pokemon1.attack - pokemon2.defense * Math.floor(Math.random())
  const points2 = pokemon2.attack - pokemon1.defense * Math.floor(Math.random())

  // Check who is the winner and set the value
  if (points1 > points2) {
    setVictory(Winner.FIRST)
  } else if (points2 > points1) {
    setVictory(Winner.SECOND)
  } else {
    setVictory(Winner.BOTH)
  }
}

/**
 * Select the pokemon object inside the list and set them on the state
 * @param pokemonName 
 * @param pokemonList 
 * @param setSelectedName 
 * @param setSelectedPokemons 
 */
const selectedPokemon = (
  pokemonName: string,
  pokemonList: PokemonModel[],
  setSelectedPokemons: React.Dispatch<SetStateAction<any>>) => {

  setSelectedPokemons(pokemonList.find(e => e.name === pokemonName.toLowerCase()))
}

/**
 * Resets the value of the input state
 * @param setPokemonName
 * @param setPokemonObj 
 */
const resetPokemon = (
  setPokemonObj: React.Dispatch<SetStateAction<PokemonModel>>) => {

  setPokemonObj({ name: "", attack: 0, defense: 0, image: "" })
}

const Battle: NextPage = () => {
  const [loading, isLoading] = useState<boolean>(false)
  const [status, setStatus] = useState<number>(0)
  const [error, setError] = useState<any>()

  const [dataAPI, setDataAPI] = useAtom(pokemonLibrary)

  // Pokemon 1
  const [selectedPokemonObj1, setSelectedPokemonObj1] = useAtom(selectedPokemon1)
  const selectedPokemonName1 = selectedPokemonObj1.name

  // Pokemon 2
  const [selectedPokemonObj2, setSelectedPokemonObj2] = useAtom(selectedPokemon2)
  const selectedPokemonName2 = selectedPokemonObj2.name

  // Victory tracker
  const [victory, setVictory] = useState<Winner>(Winner.NONE)

  // Query info to the API
  useEffect(() => {
    getRandomPokemons(setStatus, setError, setDataAPI, isLoading)
  }, []);
  if (status != 200) return <p>An error has ocurred, error: {error}</p>

  return (
    <>
      <div className="m-10">
        <div className="grid grid-cols-9">
          <div className="col-start-2 col-end-4">
            <div className="basis-1/4 m-auto">
              <Image
                src={selectedPokemonObj1.image ? selectedPokemonObj1.image : '/image/profile.png'} alt="Profile image" width={100} height={100} layout={"fixed"}
              />
            </div>
            <div className="basis-3/4">
              <div className="flex-row">
                <select className="select select-bordered w-full" value={selectedPokemonName1} onChange={(e) => selectedPokemon(e.target.value, dataAPI, setSelectedPokemonObj1)}>
                  <option key="" value="">Pick one</option>
                  {dataAPI?.map((obj) => {
                    return (<option key={obj.name} value={obj.name}>{capitalize(obj.name)}</option>)
                  })}
                </select>
              </div>
              <div className="flex flex-row">
                <div className="basis-1/2">
                  <div>
                    <b>Attack</b>
                  </div>
                  <div>
                    <b>{selectedPokemonObj1 ? selectedPokemonObj1.attack : <div>No info</div>}</b>
                  </div>
                </div>
                <div className="basis-1/2">
                  <div>
                    <b>Defense</b>
                  </div>
                  <div>
                    <b>{selectedPokemonObj1 ? selectedPokemonObj1.defense : <div>No info</div>}</b>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <br />
          <div className="col-start-5 col-end-6">
            <button className="h-1/2 mt-16 w-full btn btn-error" disabled={selectedPokemonName1 === "" || selectedPokemonName2 === ""} onClick={() => { fight(selectedPokemonObj1, selectedPokemonObj2, setVictory) }}>Fight!</button>
          </div>
          <br />
          <div className="col-start-7 col-end-9">
            <div className="basis-1/4">
              <Image
                src={selectedPokemonObj2.image ? selectedPokemonObj2.image : '/image/profile.png'} alt="Profile image" width={100} height={100} layout={"fixed"}
              />
            </div>
            <div className="basis-3/4">
              <div className="flex-row">
                <select className="select select-bordered w-full" value={selectedPokemonName2} onChange={(e) => selectedPokemon(e.target.value, dataAPI, setSelectedPokemonObj2)}>
                  <option key="" value="">Pick one</option>
                  {dataAPI?.map((obj) => {
                    return (<option key={obj.name} value={obj.name}>{capitalize(obj.name)}</option>)
                  })}
                </select>
              </div>
              <div className="flex flex-row">
                <div className="basis-1/2">
                  <div>
                    <b>Attack</b>
                  </div>
                  <div>
                    <b>{selectedPokemonObj2 ? selectedPokemonObj2.attack : <div>No info</div>}</b>
                  </div>
                </div>
                <div className="basis-1/2">
                  <div>
                    <b>Defense</b>
                  </div>
                  <div>
                    <b>{selectedPokemonObj2 ? selectedPokemonObj2.defense : <div>No info</div>}</b>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <br />
        </div>
        <br />
        <div className='grid grid-cols-4'>
          <div className="col-start-2 col-end-4">
            <div>
              {
                victory === Winner.FIRST ? (<div className="text-left"><Image alt="Winner left" color="red" src={"/image/trophy.png"} width={55} height={55}></Image></div>) :
                  victory === Winner.SECOND ? (<div className="text-right"><Image alt="Winner right" src={"/image/trophy.png"} width={55} height={55}></Image></div>) :
                    victory === Winner.BOTH ? (<div className="text-center indexTitle"><p><b>Double K.O.</b></p></div>) :
                      (<div></div>)
              }
            </div>
            <div className="indexTitle text-center">
              <b>Pokemon List</b>
            </div>
            {loading ? <Loading /> : <Table />}
            <br />
            <div>
              <button className="w-full btn btn-success" onClick={() => { getRandomPokemons(setStatus, setError, setDataAPI, isLoading); resetPokemon(setSelectedPokemonObj1); resetPokemon(setSelectedPokemonObj2); setVictory(Winner.NONE) }}>Get other pokemons</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Battle