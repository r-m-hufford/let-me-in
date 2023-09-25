'use client'
import Image from 'next/image'
import LoginForm from './components/LoginForm'
import Link from 'next/link'
import { login, whoami } from '../lib/api/auth'

export default function Home() {
  const handleLogin = async () => {
    const response = await login({
        email: 'jackie@example.com',
        password: 'password'
      });

    console.log('response: ', response);
  }

  const handleWhoami = async () => {
    const response = await whoami();
    console.log('response: ', response);
  }
  return (
    <main>
      <h1 className='text-amber-500'>let-me-in</h1>
      < LoginForm />
      <p>don't have an account</p>
      <Link href='/signup'> signup </Link>
      <button onClick={handleLogin}>CLICK ME!</button>
      <button onClick={handleWhoami}>WHOAMI ME!</button>
    </main>
  )
}
