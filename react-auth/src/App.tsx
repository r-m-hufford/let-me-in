import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './routes/Login';
import Account from './routes/Account';
import PrivateRoute from './components/PrivateRoute';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/account' element={
        <PrivateRoute>
          <Account/>
        </PrivateRoute>} />
      </Routes>
    </Router>
  );
};

export default App;
