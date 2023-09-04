import React, { useEffect, useState } from "react";
import LogoutButton from "../logout/LogoutButton";

const SiteHeader: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const divStyle = {
    display: 'flex'
  };

  const checkLoginStatus = () => {
    const userFound = window.localStorage.getItem('accessToken');
    console.log('userFound: ', userFound);
    setLoggedIn(!!userFound);
  }

  useEffect(() => {
    checkLoginStatus()
  }, []);

  return (
    <div style={divStyle}>
      <h1>Welcome to the site</h1>
      {loggedIn && <LogoutButton />}
    </div>
  )
}
export default SiteHeader;