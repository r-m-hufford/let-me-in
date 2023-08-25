import axios from 'axios';

const apiInstance = axios.create({
  baseURL: 'http://localhost:4000',
  headers: {'x-auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvaG5AZXhhbXBsZS5jb20iLCJ1c2VyQ29kZSI6ImM0MWNkNjQ2LTg1ZTktNGM1Zi1iODlhLWM4MTBmYzUzYTkyNCIsInR5cGUiOiJBQ0NFU1MiLCJpYXQiOjE2OTI5NzY3OTQsImV4cCI6MTY5MzA2MzE5NH0.DPG-KJim_3Z23NzWVPHrndHWu4D_VJwui8Bb4nfJE4c'}
})

export default apiInstance;