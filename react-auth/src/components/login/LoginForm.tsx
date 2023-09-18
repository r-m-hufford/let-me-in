import React, { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleFormChange } from '../../utils/formChange';
import LinkToButton from '../common/LinkToButton';
import { useAuth } from '../../context/AuthContext';
import { useErrors } from '../../hooks/useErrors';

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const { errors, setErrors } = useErrors();
  const [form, setForm] = useState({
    email: '',
    password: ''
  });
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await login(form);
      if (response.success) navigate('/account');
      if (response.data && response.data.error) setErrors(response.data.error)
    } catch (error: any) {
      console.error(error);
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
            onChange={(e) => handleFormChange(e, setForm, setErrors)}
          />
          <label htmlFor='password'>Password:</label>
          <input
            type="password"
            name='password'
            id='password'
            value={form.password}
            onChange={(e) => handleFormChange(e, setForm, setErrors)}
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