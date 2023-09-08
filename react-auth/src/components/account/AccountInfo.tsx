import React, { useEffect, useState } from "react";
import { whoami } from "../../api/auth";
import { User } from "../../interfaces/user";
import LogoutButton from "../logout/LogoutButton";
import { parseDate } from "../../utils/parseDate";
import EditableField from "../common/EditableField";
import ChangePassword from "./ChangePassword";
import DeleteAccount from "./DeleteAccount";
import { useAuth } from "../../context/AuthContext";

const AccountInfo: React.FC = () => {
  const { user, logout } = useAuth();
  // const [dumbuser, setUser] = useState<User | null>(null);

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     try {
  //       const response = await whoami();
  //       setUser(response);
  //       window.localStorage.setItem('user', JSON.stringify(response));
  //     } catch (error) {
  //       console.error('error fetching user data: ', error);
  //     }
  //   };
  //   fetchUser();
  // }, []);

  return (
    <div>
        {user 
        ? 
        (
        <>
          <h2>user data:</h2>
          <p>first name:</p>
          <EditableField initialData={`${user.firstName}`} type={"text"} name={"firstName"}/>
          <p>last name:</p>
          <EditableField initialData={`${user.lastName}`} type={"text"} name={"lastName"}/>
          <p>email:</p>
          <EditableField initialData={`${user.email}`} type={"text"} name={"email"}/>
          <p>Joined On: {parseDate(user.createdAt)}</p>
          <hr />
          <h2>change password</h2>
          <ChangePassword />
          <hr />
          <h2>delete account</h2>
          <DeleteAccount />
        </>
        ) 
        : 
        <p>loading user jawn...</p>}
        <br />
    </div>
  )
}

export default AccountInfo;