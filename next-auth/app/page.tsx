import Image from 'next/image'
import LoginForm from './components/LoginForm'
import Link from 'next/link'

import { options } from './options'
import { getServerSession } from 'next-auth'

export default async function Home() {
  const session = await getServerSession(options);

  return (
    <main>
      <h1 className='text-amber-500'>let-me-in</h1>
      <br />
      <br />
      {session ? <p>you have a session</p> : <p> no sessions here</p>}
      <br />
      <br />
      <br />
      <br />
      <br />
      < LoginForm />
      <br />
      <br />
      <Link href='/signup'> signup </Link>
    </main>
  )
}
