import React from "react";
import LogoutButton from "../logout/LogoutButton";
import { useAuth } from "../../context/AuthContext";

const SiteHeader: React.FC = () => {
  const { user } = useAuth();
  const divStyle = {
    display: 'flex'
  };

  return (
    <div style={divStyle}>
      <h1>Welcome to the site</h1>
      {user && <LogoutButton />}
    </div>
  )
}
export default SiteHeader;