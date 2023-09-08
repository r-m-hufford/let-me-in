import React, { useEffect } from "react";
import { invalidateToken } from "../../api/auth";
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext";

const LogoutButton: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
      logout();
      navigate('/');
    }


  return (
    <button onClick={handleLogout}>logout</button>
  )
}

export default LogoutButton;