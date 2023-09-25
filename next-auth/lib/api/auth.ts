import { PasswordResetRequest } from "../../interfaces/requests";

export const login = async (credentials: { email: string, password: string }) => {
  try {
    const response = await fetch('http://localhost:4000/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        email: 'jackie@example.com',
        password: 'password'
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const data = await response.json();
    return data;
  } catch (error: any) {
    return error;
  }
}

export const invalidateToken = async () => {
  try {
    const response = await fetch('http://localhost:4000/api/invalidatetokens');
    const data = await response.json();
    return data;
  } catch (error: any) {
    return error.response;
  }
}

export const resetPassword = async (passwordResetRequest: PasswordResetRequest) => {
  try {
    const response = await fetch('http://localhost:4000/api/password/reset', 
    {
      method: 'POST',
      body: JSON.stringify(passwordResetRequest)
    });
    const data = await response.json();
    return data;
  } catch (error: any) {
    return error.response;
  }
}

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