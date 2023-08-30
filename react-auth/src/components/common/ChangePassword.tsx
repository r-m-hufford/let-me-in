import React, { ChangeEvent, InputHTMLAttributes, useState } from "react";
import { handleInputChange } from "../../utils/inputChange";
import { resetPassword } from "../../api/auth";
import { error } from "console";

const ChangePassword: React.FC = () => {
  const [form, setForm] = useState({})
  const [errors, setErrors] = useState('');

  const handleFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleInputChange(e, setForm);
    setErrors('');
  }
  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await resetPassword(form);
      if (response.success) {
        return 'cool';
      }
      // set errors here
      if (response.error) {
        console.log(response);
        // setErrors(error);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <p>Woah, we gotta reset password component here</p>
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
        <button type="submit">execute total password chornge</button>
      </form>
    </div>
  );
}

export default ChangePassword;