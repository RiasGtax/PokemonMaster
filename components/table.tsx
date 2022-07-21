import { useAtomValue } from 'jotai'
import { pokemonLibrary } from '../global/pokemon_storage'
import { capitalize } from '../global/util'

/**
 * Table component to print the pokemon list
 * @returns 
 */
const Table = () => {
  const formattedPokemons = useAtomValue(pokemonLibrary)

  return (
    <table className="table table-compact w-full table-zebra">
      <thead>
        <tr>
          <th>Name</th>
          <th className="text-center">Attack</th>
          <th className="text-center">Defense</th>
        </tr>
      </thead>
      <tbody>
        {formattedPokemons?.map((obj) => {
          return (<tr key={obj.name}>
            <td><b>{capitalize(obj.name)}</b></td>
            <td className="text-center">{obj.attack}</td>
            <td className="text-center">{obj.defense}</td>
          </tr>)
        })}
      </tbody>
    </table>
  )
}

export default Table
