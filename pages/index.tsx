import type { NextPage } from 'next'
import Link from 'next/link'

const Home: NextPage = () => {
  return (
    <>
      <div className='flex h-screen'>
        <main className='m-auto'>
          <h1 className="indexTitle">
            <b>Welcome to <span className="pokemonName">Pokemon Battle</span></b>
          </h1>

          <Link href="/battle" passHref>
            <button className="w-full btn">Lets fight!</button>
          </Link>
        </main>

      </div>
    </>
  )
}

export default Home
