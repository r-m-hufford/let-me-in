import React, { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleFormChange } from "../../utils/formChange";
import { signup, whoami } from "../../api/user";
import LinkToButton from "../common/LinkToButton";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useAuth } from "../../context/AuthContext";
import { useErrors } from "../../hooks/useErrors";

const SignupForm: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: undefined,
    firstName: undefined,
    lastName: undefined,
    password: undefined,
    confirmPassword: undefined
  });
  const { setItem } = useLocalStorage();
  const { setUser } = useAuth();
  const { errors, setErrors } = useErrors();

  const resetForm = () => {
    setForm((prevData) => ({
      email: undefined,
      firstName: undefined,
      lastName: undefined,
      password: undefined,
      confirmPassword: undefined
    }));
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors([]);

    try {
      const response = await signup(form);
      if (response.success) {
        setItem('accessToken', response.token.accessToken);
        const me = await whoami();
        setItem('user', JSON.stringify(me));
        setUser(me);
        navigate('/account');
      }
      if (response.data && response.data.error) setErrors(response.data.error);
    } catch (error) {
      console.error(error);
    }
    resetForm();
  }

  return (
    <div>
      <div>
        <h2>Sign Up</h2>
        <form onSubmit={handleSignup}>
          <label htmlFor='firstName'>firstName</label>
          <input
            type='text'
            name='firstName'
            id='firstName'
            value={form.firstName}
            onChange={(e) => handleFormChange(e, setForm, setErrors)}
          />
          <label htmlFor='lastName'>lastName</label>
          <input
            type='text'
            name='lastName'
            id='lastName'
            value={form.lastName}
            onChange={(e) => handleFormChange(e, setForm, setErrors)}
          />
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            name='email'
            id='email'
            value={form.email}
            onChange={(e) => handleFormChange(e, setForm, setErrors)}
          />
          <label htmlFor='password'>password</label>
          <input
            type='password'
            name='password'
            id='password'
            value={form.password}
            onChange={(e) => handleFormChange(e, setForm, setErrors)}
          />
          <label htmlFor='confirmPassword'>confirmPassword</label>
          <input
            type='password'
            name='confirmPassword'
            id='confirmPassword'
            value={form.confirmPassword}
            onChange={(e) => handleFormChange(e, setForm, setErrors)}
          />
          <button type="submit">sign up</button>
        </form>
      </div>
      <div>
        {errors && <p>{errors}</p>}
      </div>
      <div>
        <h2>Already a member?</h2>
        <LinkToButton path={'/'} label={'login'}/>
      </div>
    </div>
  )
}

export default SignupForm;