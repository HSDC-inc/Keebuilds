import React, { useEffect, useState } from 'react';
// import bongocat from '../assets/bongocat.png';
import StartBuild from './StartBuild';
import SavedBuilds from './SavedBuilds';

import SavedBuildsButton from './SavedBuildsButton';
import '../scss/styles.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import SavedKeebsPage from './SavedKeebsPage';
import Landing from './Landing';
import Signup from './Signup';
import Login from './Login';

const App = () => {

  return (
    <div>
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
