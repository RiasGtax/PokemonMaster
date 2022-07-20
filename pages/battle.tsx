import { NextPage } from "next";
import { SetStateAction, useEffect, useState } from "react";
import { PokemonBasicInfoModel, PokemonModel, RandomPokemonsAPIModel } from "../models/pokemon-models";

const getRandomPokemons = async (
    setStatus: React.Dispatch<SetStateAction<number>>,
    setDataAPI: React.Dispatch<SetStateAction<any>>,
    setError: React.Dispatch<SetStateAction<any>>) => {

    let list: PokemonBasicInfoModel[] = [];
    try {
        const randomNumber = Math.floor(Math.random() * 1000);
        const apiResponse = await fetch("https://pokeapi.co/api/v2/pokemon?limit=10&offset=" + randomNumber);
        const json = await apiResponse.json();

        list = json.results;
    } catch (error) {
        setError(error)
    }

    const result: PokemonModel[] = [];
    for (let pokemon of list) {
        const apiResponse = await fetch("https://pokeapi.co/api/v2/pokemon/" + pokemon.name);
        const json = await apiResponse.json();

        let attack: number = json.stats.find((e: any) => e.stat.name === "attack").base_stat;
        let defense: number = json.stats.find((e: any) => e.stat.name === "defense").base_stat;

        result.push({
            name: pokemon.name,
            attack: attack,
            defense: defense
        }); 
    }
    setDataAPI(result)
};


const Battle: NextPage = () => {
    const [status, setStatus] = useState<number>(200);
    const [dataAPI, setDataAPI] = useState<PokemonModel[]>();
    const [error, setError] = useState<any>();

    useEffect(() => {
        getRandomPokemons(setStatus, setDataAPI, setError)
    }, []);
    if (status != 200) return <p>An error has ocurred, error: {error}</p>

    return (
        <>
            <div className="grid grid-cols-8">
                <button className="btn" onClick={() => { getRandomPokemons(setStatus, setDataAPI, setError) }}>Refresh</button>
            </div>
        </>
    )
}

export default Battle