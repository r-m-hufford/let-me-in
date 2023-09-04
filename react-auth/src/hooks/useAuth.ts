import { useEffect } from "react";
import { useUser } from "./useUser";
import { User } from "../interfaces/user";
import { useLocalStorage } from "./useLocalStorage";

export const useAuth = () => {
  const { user, addUser, removeUser } = useUser();
  const { getItem } = useLocalStorage();

  useEffect(() => {
    const user = getItem('user');
    if (user) {
      addUser(JSON.parse(user));
    }
  }, []);

  const login = (user: User) => {
    // do some login logic here
    addUser(user);
  }

  const logout = () => {
    // do some logout stuff here
    removeUser();
  }

  return { user, login, logout }
}