import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './routes/Login';
import Account from './routes/Account';
import PrivateRoute from './components/PrivateRoute';
import Signup from './routes/Signup';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path='/signup' element={<Signup />}/>
        <Route path='/login' element={<Login />} />
        <Route path='/account' element={
        <PrivateRoute fallback={'/login'} >
          <Account/>
        </PrivateRoute>} />
      </Routes>
    </Router>
  );
};

export default App;
