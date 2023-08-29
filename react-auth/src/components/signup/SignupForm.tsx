import React, { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleInputChange } from "../../utils/inputChange";
import { signup } from "../../api/auth";
import LinkToButton from "../common/LinkToButton";

const SignupForm: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: undefined,
    firstName: undefined,
    lastName: undefined,
    password: undefined,
    confirmPassword: undefined
  });
  const [errors, setErrors] = useState<string[]>([])

  const handleFormChange = (e: ChangeEvent<HTMLInputElement>, setData: Function) => {
    handleInputChange(e, setForm);
    setErrors([]);
  }

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
        window.localStorage.setItem('accessToken', response.token.accessToken);
        navigate('/account');
      }
      if (response.error) {
        const newErrors = [];
        for (let i = 0; i < response.error.length; i++) {
          const message = response.error[i].msg;
          newErrors.push(message);
        }
        setErrors(newErrors);
      }
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
            onChange={(e) => handleFormChange(e, setForm)}
          />
          <label htmlFor='lastName'>lastName</label>
          <input
            type='text'
            name='lastName'
            id='lastName'
            value={form.lastName}
            onChange={(e) => handleFormChange(e, setForm)}
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
            type='password'
            name='confirmPassword'
            id='confirmPassword'
            value={form.confirmPassword}
            onChange={(e) => handleInputChange(e, setForm)}
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