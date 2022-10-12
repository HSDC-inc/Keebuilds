import React from 'react';
import '../scss/styles.scss';
import { Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import SavedKeebsPage from './SavedKeebsPage';
import Landing from './Landing';
import Signup from './Signup';
import Login from './Login';

const App = () => {

  return (
    <div>
      {/* React router boilterplate for dynamic rendering */}
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/home' element={<HomePage/>} />
        <Route path='/savedKeebs' element={<SavedKeebsPage />} />
      </Routes>
    </div>
  );
};

export default App;
