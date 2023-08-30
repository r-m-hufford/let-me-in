import React, { useState } from "react";
import { handleInputChange } from "../../utils/inputChange";

const ChangePassword: React.FC = () => {
  const [form, setForm] = useState({
    currentPassword: undefined,
    newPassword: undefined,
    confirmPassword: undefined
  })
   const handlePasswordChange = () => {
    console.log('the button')
  }

  return (
    <div>
      <p>Woah, we gotta reset password component here</p>
      <form onSubmit={handlePasswordChange}>
        <label htmlFor="currentPassword">current password</label>
        <input type="text" name="currentPassword" id="currentPassword" onChange={e  => {handleInputChange(e, setForm)}}/>
        <br />
        <br />
        <label htmlFor="password">new password</label>
        <input type="text" name="password" id="password" onChange={e  => {handleInputChange(e, setForm)}}/>
        <br />
        <br />
        <label htmlFor="confirmPassword">confirm new password</label>
        <input type="text" name="confirmPassword" id="confirmPassword" onChange={e  => {handleInputChange(e, setForm)}}/>
        <br />
        <button type="submit">execute total password chornge</button>
      </form>
    </div>
  );
}

export default ChangePassword;