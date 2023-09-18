import React from "react";
import { useNavigate } from "react-router-dom";
import { deleteAccount } from "../../api/user";
import { useAuth } from "../../context/AuthContext";

const DeleteAccount: React.FC = () => {
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
        console.error(error);
      }
    }
  }

  return (
    <div>
      <button type="submit" onClick={handleAccountDelete}>delete account</button>
    </div>
  )
}

export default DeleteAccount;