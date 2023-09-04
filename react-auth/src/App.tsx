import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './routes/Login';
import Account from './routes/Account';
import PrivateRoute from './components/PrivateRoute';
import Signup from './routes/Signup';
import NotFound from './components/NotFound';
import SiteHeader from './components/header/Header';
import { AuthContext } from './context/AuthContext';
import { useAuth } from './hooks/useAuth';

const App: React.FC = () => {
    const { user, login, logout, setUser } = useAuth();

  return (
    <AuthContext.Provider value={{user, setUser}} >
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
    </AuthContext.Provider>
  );
};

export default App;
