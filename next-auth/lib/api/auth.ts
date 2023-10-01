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

    window.localStorage.setItem('token', data.token.accessToken);

    return data;
  } catch (error: any) {
    return error;
  }
}

export const invalidateToken = async () => {
  try {
    const token = window.localStorage.getItem('token');
    const response = await fetch('http://localhost:4000/api/invalidatetokens', {
      headers: {
        'Content-Type': 'application/json',
        token: token
      }
    });
    const data = await response.json();
    return data;
  } catch (error: any) {
    return error.response;
  }
}

export const resetPassword = async (passwordResetRequest: PasswordResetRequest) => {
  try {
    const token = window.localStorage.getItem('token');
    const response = await fetch('http://localhost:4000/api/password/reset', 
    {
      method: 'POST',
      body: JSON.stringify(passwordResetRequest),
      headers: {
        'Content-Type': 'application/json',
        token: token
      }
    });
    const data = await response.json();
    return data;
  } catch (error: any) {
    return error.response;
  }
}