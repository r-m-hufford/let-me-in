import React, { ChangeEvent, useState } from 'react';
import { login } from '../../api/auth';
import { useNavigate } from 'react-router-dom';
import { handleInputChange } from '../../utils/inputChange';
import LinkToButton from '../common/LinkToButton';
// write and import some styles for this jawn

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: '',
    password: ''
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await login(form);
      if (response.success) {
        window.localStorage.setItem('accessToken', response.token.accessToken);
        navigate('/account');
      }
    } catch (error: any) {
      // this can get moved to the auth api eventually
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
      <div>
        <form onSubmit={handleSubmit}>
          <label htmlFor='email'>Email:</label>
          <input
            type="email"
            name='email'
            id='email'
            value={form.email}
            onChange={(e) => handleInputChange(e, setForm)}
          />
          <label htmlFor='password'>Password:</label>
          <input
            type="password"
            name='password'
            id='password'
            value={form.password}
            onChange={(e) => handleInputChange(e, setForm)}
          />
          {errorMessage && <p>{errorMessage}</p>}
          <button type="submit">Login</button>
        </form>
      </div>
      <div>
        <h2>not a member?</h2>
        <LinkToButton path={'/signup'} label={'sign up'}/>
      </div>
    </div>
  )
}

export default LoginForm;