import axios from 'axios';

const apiInstance = axios.create({
  baseURL: 'http://localhost:4000',
  headers: {'x-auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvaG5AZXhhbXBsZS5jb20iLCJ1c2VyQ29kZSI6ImM0MWNkNjQ2LTg1ZTktNGM1Zi1iODlhLWM4MTBmYzUzYTkyNCIsInR5cGUiOiJBQ0NFU1MiLCJpYXQiOjE2OTI4NDA5ODgsImV4cCI6MTY5MjkyNzM4OH0.ZdNP-0swIDBCiLdqGb7UjT5fYxlSR4qX23QgkggJm4I'}
})

export default apiInstance;