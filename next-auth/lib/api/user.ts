import { User } from "../../interfaces/user";

export const whoami = async () => {
  try {
    const token = window.localStorage.getItem('token');
    console.log('token from local storage: ');
    console.log('token from local storage: ', token);

    const response = await fetch('http://localhost:4000/api/users/whoami', {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token
      }
    });
    
    const data = await response.json();
    return data;
  } catch (error: any) {
    return error.response;
  }
}

export const signup = async (userData: Partial<User>) => {
  try {
    const response = await fetch('/api/users/signup', {
      method: 'POST',
      body: JSON.stringify(userData)
    });
    const data = await response.json();
    
    return data;
  } catch (error: any) {
    return error.response;
  }
}

export const updateUser = async (userData: Partial<User>) => {
  try {
    const token = window.localStorage.getItem('token');
    const response = await fetch(`api/users`, {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token
      },
      body: JSON.stringify(userData)
    })
    const data = await response.json();
    
    return data
  } catch (error: any) {
    return error.response;
  }
}

export const deleteAccount = async () => {
  try {
    const token = window.localStorage.getItem('token');
    const response = await fetch('api/users', {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token
      }
    });
    const data = await response.json();
    
    return data;
  } catch (error: any) {
    return error.response;
  }
}