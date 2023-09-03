import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteAccount } from "../../api/auth";

// create a password confirm component
const DeleteAccount: React.FC = () => {
  const [form, setForm] = useState({ password: '' });

  const handleAccountDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await deleteAccount();
    //navigate to login after successful account delete
  }

  return (
    <div>
      <h2>delete your account</h2>
      <form onSubmit={handleAccountDelete}>
        <label htmlFor="password">password</label>
        <input type="text" name="password" id="deleteAccountPassword" />
        <button type="submit">delete account</button>
      </form>
    </div>
  )
}

export default DeleteAccount;