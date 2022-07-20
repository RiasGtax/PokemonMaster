import type { NextPage } from 'next'
import Link from 'next/link'

const Home: NextPage = () => {
  return (
    <>
      <div className='grid grid-cols-8'>
        <main className='col-start-2 col-span-4'>
          <h1>
            Welcome to Pokemon Battle
          </h1>

          <Link href="/battle" passHref>
            <button className='btn'>Lets fight!</button>
          </Link>
        </main>

      </div>
    </>
  )
}

export default Home
