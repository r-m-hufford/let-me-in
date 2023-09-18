import React, { ChangeEvent, InputHTMLAttributes, useState } from "react";
import { handleFormChange } from "../../utils/formChange";
import { resetPassword } from "../../api/auth";
import { useErrors } from "../../hooks/useErrors";

const ChangePassword: React.FC = () => {
  const [form, setForm] = useState({
    currentPassword: '',
    password: '',
    confirmPassword: ''
  })
  const { errors, setErrors } = useErrors();

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await resetPassword(form);
      console.log({ response });
      if (response.data && response.data.error) setErrors(response.data.error);
    } catch (error: any) {
      console.error(error);
    }
  }

  return (
    <div>
      <form onSubmit={handlePasswordChange}>
        <label htmlFor="currentPassword">current password</label>
        <input type="password" name="currentPassword" id="currentPassword" onChange={e  => {handleFormChange(e, setForm, setErrors)}}/>
        <br />
        <br />
        <label htmlFor="password">new password</label>
        <input type="password" name="password" id="password" onChange={e  => {handleFormChange(e, setForm, setErrors)}}/>
        <br />
        <br />
        <label htmlFor="confirmPassword">confirm new password</label>
        <input type="password" name="confirmPassword" id="confirmPassword" onChange={e  => {handleFormChange(e, setForm, setErrors)}}/>
        <br />
        <button type="submit">change password</button>
      </form>
      {errors}
    </div>
  );
}

export default ChangePassword;