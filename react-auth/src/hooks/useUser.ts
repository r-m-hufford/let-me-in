//use some global state
import { useContext } from "react";
//this is the global state
import { AuthContext } from '../context/AuthContext';
import { useLocalStorage } from "./useLocalStorage";
import { User } from "../interfaces/user";


export const useUser = () => {
  const { user, setUser } = useContext(AuthContext);
  const { setItem } = useLocalStorage();

  const addUser = (user: User) => {
    setUser(user);
    setItem("user", JSON.stringify(user));
  };

  const removeUser = () => {
    setUser(null);
    setItem("user", "");
  };

  return { user, addUser, removeUser };
}