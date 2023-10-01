'use client'
import React, { FormEvent, useState } from 'react';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { signIn, signOut } from 'next-auth/react';

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { data: session } = useSession({
    required: false // set required to false to create an extra layer of route protection
    //do not forget to add onUnauthenticated here
  })

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    signIn('credentials', {
      username: username,
      password: password
    })
  }


  return (
    <div>
      <h2>This was the login form but now its just a heading</h2>
      <h2>This is your email:</h2>
      <p>{session?.user?.email}</p>
      <br />
      <br />
      <br />
      <button type='button' onClick={() => signIn('github')}>Login with github</button>
      <br />
      <br />
      <br />
      <p>Login with credentials</p>
      <form>
        <label htmlFor="username">username</label>
        <input type="text" name='username' onChange={(e) => setUsername(e.target.value)}/>
        <br />
        <label htmlFor="password">password</label>
        <input type="password" name='password' onChange={(e) => setPassword(e.target.value)}/>
        <br />
        <button type='submit' onClick={handleSubmit}>login</button>
      </form>
      <br />
      <br />
      <br />
      <button type='button' onClick={() => signOut()}>Log out, Please</button>
    </div>
  )
}

export default LoginForm;