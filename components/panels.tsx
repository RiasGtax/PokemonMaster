import { useAtom } from "jotai"
import Image from "next/image"
import { pokemonLibrary } from "../global/pokemon_storage"

const Panels = () => {
  const [dataAPI] = useAtom(pokemonLibrary)

  return (
    <>
      {/* <div>
        <div className="basis-1/4">
          <Image
            src={'/image/profile.png'} alt="Profile image" width={100} height={100} layout={"fixed"}
          />
        </div>
        <div className="basis-3/4">
          <div className="flex-row">
            <select className="select select-bordered w-full" value={selectedPokemonName1} onChange={(e) => selectedPokemon(e.target.value, dataAPI, setSelectedPokemonName1, setSelectedPokemonObj1)}>
              <option key="none" value="none">Pick one</option>
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
                <select className="select select-bordered">
                  {selectedPokemonObj1 ? (<option disabled selected>{selectedPokemonObj1.attack}</option>) : (<option disabled selected>No info</option>)}
                </select>
              </div>
            </div>
            <div className="basis-1/2">
              <div>
                <b>Defense</b>
              </div>
              <div>
                <select className="select select-bordered">
                  {selectedPokemonObj1 ? (<option disabled selected>{selectedPokemonObj1.defense}</option>) : (<option disabled selected>No info</option>)}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </>
  )
}

export default Panels