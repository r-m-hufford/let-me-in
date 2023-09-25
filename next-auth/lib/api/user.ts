import { User } from "../../interfaces/user";

export const whoami =async () => {
  try {
    const response = await fetch('http://localhost:4000/api/users/whoami', {
      headers: {
        'x-auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImphY2tpZUBleGFtcGxlLmNvbSIsInVzZXJDb2RlIjoiZTZkNzFlMDUtZWRlMS00OGU1LThlZGYtODE1NjcxZWRkYzJmIiwidHlwZSI6IkFDQ0VTUyIsImlhdCI6MTY5NTYwODMxMiwiZXhwIjoxNjk1Njk0NzEyfQ.8SplFcTQ_me4VybsoU5djE-7GFhI8-vqF0-6WW2a8xA'
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
    const response = await fetch(`api/users`, userData)
    const data = await response.json();
    
    return data
  } catch (error: any) {
    return error.response;
  }
}

export const deleteAccount = async () => {
  try {
    const response = await fetch('api/users');
    const data = await response.json();
    
    return data;
  } catch (error: any) {
    return error.response;
  }
}