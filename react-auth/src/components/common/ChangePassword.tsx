import React, { useState } from "react";
import { handleInputChange } from "../../utils/inputChange";
import { resetPassword } from "../../api/auth";

const ChangePassword: React.FC = () => {
  const [form, setForm] = useState({})
  const [errors, setErrors] = useState([]);

   const handlePasswordChange = async () => {
    try {
      const response = await resetPassword(form);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <p>Woah, we gotta reset password component here</p>
      <form onSubmit={handlePasswordChange}>
        <label htmlFor="currentPassword">current password</label>
        <input type="password" name="currentPassword" id="currentPassword" onChange={e  => {handleInputChange(e, setForm)}}/>
        <br />
        <br />
        <label htmlFor="password">new password</label>
        <input type="password" name="password" id="password" onChange={e  => {handleInputChange(e, setForm)}}/>
        <br />
        <br />
        <label htmlFor="confirmPassword">confirm new password</label>
        <input type="password" name="confirmPassword" id="confirmPassword" onChange={e  => {handleInputChange(e, setForm)}}/>
        <br />
        <button type="submit">execute total password chornge</button>
      </form>
    </div>
  );
}

export default ChangePassword;