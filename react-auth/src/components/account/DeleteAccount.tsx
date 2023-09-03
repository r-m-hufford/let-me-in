import React, { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteAccount } from "../../api/auth";
import { handleInputChange } from "../../utils/inputChange";

// create a password confirm component
const DeleteAccount: React.FC = () => {
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate()

  const handleAccountDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await deleteAccount();
      navigate('/');
    } catch (error: any) {
      if (error.response) {
        setErrors(error.response.data.error);
      }
    }
  }

  return (
    <div>
      <h2>delete your account</h2>
        <button type="submit" onClick={handleAccountDelete}>delete account</button>
      {errors}
    </div>
  )
}

export default DeleteAccount;