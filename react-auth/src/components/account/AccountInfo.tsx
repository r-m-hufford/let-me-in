import React, { useEffect, useState } from "react";
import { whoami } from "../../api/auth";
import { User } from "../../interfaces/user";
import LogoutButton from "../logout/LogoutButton";
import { parseDate } from "../../utils/parseDate";
import EditableField from "../common/EditableField";

const AccountInfo: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

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
        {user 
        ? 
        (
        <>
          <p>first name:</p>
          <EditableField initialData={`${user.firstName}`} type={"text"} name={"firstName"}/>
          <p>last name:</p>
          <EditableField initialData={`${user.lastName}`} type={"text"} name={"lastName"}/>
          <p>email:</p>
          <EditableField initialData={`${user.email}`} type={"text"} name={"email"}/>
          <p>Joined On: {parseDate(user.createdAt)}</p>
        </>
        ) 
        : 
        <p>loading user jawn...</p>}
      <LogoutButton />
    </div>
  )
}

export default AccountInfo;