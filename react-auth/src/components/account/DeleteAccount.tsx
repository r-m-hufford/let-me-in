import React, { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteAccount } from "../../api/auth";
import { handleInputChange } from "../../utils/inputChange";
import { useAuth } from "../../context/AuthContext";

const DeleteAccount: React.FC = () => {
  const [errors, setErrors] = useState([]);
  const { logout } = useAuth();
  const navigate = useNavigate()

  const handleAccountDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await deleteAccount();
      logout();
      navigate('/');
    } catch (error: any) {
      if (error.response) {
        setErrors(error.response.data.error);
      }
    }
  }

  return (
    <div>
        <button type="submit" onClick={handleAccountDelete}>delete account</button>
      {errors}
    </div>
  )
}

export default DeleteAccount;