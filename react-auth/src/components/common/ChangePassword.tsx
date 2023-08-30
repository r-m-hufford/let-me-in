import React, { ChangeEvent, InputHTMLAttributes, useState } from "react";
import { handleInputChange } from "../../utils/inputChange";
import { resetPassword } from "../../api/auth";
import { error } from "console";

const ChangePassword: React.FC = () => {
  const [form, setForm] = useState({
    currentPassword: '',
    password: '',
    confirmPassword: ''
  })
  const [errors, setErrors] = useState<string[]>([]);

  const handleFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleInputChange(e, setForm);
    setErrors([]);
  }
  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await resetPassword(form);
      if (response.error) {
        const newErrors = [];
        for (let i = 0; i < response.error.length; i++) {
          const message = response.error[i].msg;
          newErrors.push(message);
        }
        setErrors(newErrors);
      }
    } catch (error: any) {
      if (error.response) {
        setErrors(error.response.data.error);
        setForm({
          currentPassword: '',
          password: '',
          confirmPassword: ''
        });
      }
      console.error(error);
    }
  }

  return (
    <div>
      <form onSubmit={handlePasswordChange}>
        <label htmlFor="currentPassword">current password</label>
        <input type="password" name="currentPassword" id="currentPassword" onChange={e  => {handleFormChange(e)}}/>
        <br />
        <br />
        <label htmlFor="password">new password</label>
        <input type="password" name="password" id="password" onChange={e  => {handleFormChange(e)}}/>
        <br />
        <br />
        <label htmlFor="confirmPassword">confirm new password</label>
        <input type="password" name="confirmPassword" id="confirmPassword" onChange={e  => {handleFormChange(e)}}/>
        <br />
        <button type="submit">change password</button>
      </form>
      {errors}
    </div>
  );
}

export default ChangePassword;