import React, { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleInputChange } from '../../utils/inputChange';
import LinkToButton from '../common/LinkToButton';
import { useAuth } from '../../context/AuthContext';

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: '',
    password: ''
  });
  const { login } = useAuth();
  
  const [errors, setErrors] = useState<string[]>([]);

  const handleFormChange = (e: ChangeEvent<HTMLInputElement>, setData: Function) => {
    handleInputChange(e, setForm);
    setErrors([]);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await login(form);
      if (response.success) navigate('/account');
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        setErrors(['invalid email or password'])
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
            onChange={(e) => handleFormChange(e, setForm)}
          />
          <label htmlFor='password'>Password:</label>
          <input
            type="password"
            name='password'
            id='password'
            value={form.password}
            onChange={(e) => handleFormChange(e, setForm)}
          />
          {errors && <p>{errors}</p>}
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