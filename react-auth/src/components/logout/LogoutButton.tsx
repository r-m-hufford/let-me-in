import React, { useEffect } from "react";
import { invalidateToken } from "../../api/auth";
import { useNavigate } from "react-router-dom"

const LogoutButton: React.FC = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
      const token = window.localStorage.getItem('accessToken');
      if (token) {
        await invalidateToken(token);
        window.localStorage.removeItem('accessToken');
      } else {
        console.log('no token found in local storage');
      }
      
      if (window.localStorage.getItem('user')) {
        window.localStorage.removeItem('user');
      } else {
        console.log('no user found in local storage');
      }
      navigate('/login');
    }


  return (
    <button onClick={handleLogout}>logout</button>
  )
}

export default LogoutButton;