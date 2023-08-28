import React, { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleInputChange } from "../../utils/inputChange";
import { signup } from "../../api/auth";

const SignupForm: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: ''
  });

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('handle sign up', form);

    try {
      const response = await signup(form);
      if (response.success) {
        window.localStorage.setItem('accessToken', response.token.accessToken);
        navigate('/account');
      }
    } catch (error) {
      
    }
    setForm((prevData) => ({
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      confirmPassword: ''
    }));
  }

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup}>
        <label htmlFor='firstName'>firstName</label>
        <input 
          type='firstName'
          name='firstName'
          id='firstName' 
          value={form.firstName}
          onChange={(e) => handleInputChange(e, setForm)}
        />
        <label htmlFor='lastName'>lastName</label>
        <input 
          type='lastName'
          name='lastName'
          id='lastName' 
          value={form.lastName}
          onChange={(e) => handleInputChange(e, setForm)}
        />
        <label htmlFor='email'>Email</label>
        <input 
          type='email'
          name='email'
          id='email' 
          value={form.email}
          onChange={(e) => handleInputChange(e, setForm)}
        />
        <label htmlFor='password'>password</label>
        <input 
          type='password'
          name='password'
          id='password' 
          value={form.password}
          onChange={(e) => handleInputChange(e, setForm)}
        />
        <label htmlFor='confirmPassword'>confirmPassword</label>
        <input 
          type='confirmPassword'
          name='confirmPassword'
          id='confirmPassword' 
          value={form.confirmPassword}
          onChange={(e) => handleInputChange(e, setForm)}
        />
        <button type="submit">sign up</button>
      </form>
    </div>
  )
}

export default SignupForm;