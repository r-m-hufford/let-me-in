import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './routes/Login';
import Account from './routes/Account';
import PrivateRoute from './components/PrivateRoute';
import Signup from './routes/Signup';
import NotFound from './components/NotFound';
import SiteHeader from './components/header/Header';

const App: React.FC = () => {
  return (
    <Router>
      <SiteHeader />
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<Signup />}/>
        <Route path='/account' element={
        <PrivateRoute fallback={'/login'} >
          <Account/>
        </PrivateRoute>} />
        <Route path='/*' element={<NotFound />}/>
      </Routes>
    </Router>
  );
};

export default App;
