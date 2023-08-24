import React, { ChangeEvent, useState } from 'react';
import { login } from '../../api/auth';
// write and import some styles for this jawn

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setErrorMessage('');
  }

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setErrorMessage('');
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await login({username: email, password});
      // handle successful login - probs navigate to the other jawn
      // for now just....
      console.log('you logged into the jawn');
    } catch (error: any) {
      if (error.response && error.response.status == 400) {
        setErrorMessage('invalid email or password')
      } else {
        console.error('An error occurred: ', error);
      }
    }

  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor='email'>Email:</label>
        <input 
          type="email"
          id='email'
          value={email} 
          onChange={(e) => handleEmailChange(e)} 
        />
        <label htmlFor='password'>Password:</label>
        <input 
          type="password"
          id='password'
          value={password}
          onChange={(e) => handlePasswordChange(e)}
        />
        {errorMessage && <p>{errorMessage}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default LoginForm;