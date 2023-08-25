import React, { useEffect, useState } from "react";
import { whoami } from "../../api/auth";
import { User } from "../../interfaces/user";

const AccountInfo: React.FC = () => {
  const [user, setUser] = useState<User | null >(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await whoami();
        setUser(response);
        window.localStorage.setItem('user', JSON.stringify(response));
      } catch (error) {
        console.error('error fetching user data: ', error);
      }
    };

    fetchUser();
  }, []);

  return (
    <div>
      <h1>This is the account page</h1>
        {user ? (<p>{user.firstName}</p>) : <p>loading user jawn...</p>}
    </div>
  )
}

export default AccountInfo;