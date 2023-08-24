import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './routes/Login';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login />}/>
        {/* <Route path='/account'/> */}
      </Routes>
    </Router>
  )
}

export default App;
