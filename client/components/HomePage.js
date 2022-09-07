import React from 'react';
import Button from '@mui/material/Button';
import '../scss/styles.scss';
import StartBuild from './StartBuild';
import SavedBuilds from './SavedBuilds';
import SavedBuildsButton from './SavedBuildsButton';
import logo from '../assets/bongocat.png';
import bongocat from '../assets/bongocatkeyboard.png';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';



const HomePage = () => {

  const username = useSelector(state => state.setUser.username);
  const isLoggedIn = useSelector(state => state.setUser.isLoggedIn);

  if (isLoggedIn) {

    return (
      <>
        <h2>Your username is {username}</h2>
        <h1 className='logo'>KEEBUILDS HOME</h1>
        
        <div className='startBuildButtonDiv'>
          <img src={bongocat} alt="Bongo Cat" />
          <StartBuild />
        </div>
        <div className='savedBuildsButtonDiv'><SavedBuildsButton /></div>
      </>
    );

  } else {

    return (
      <>
        <h2>Nah</h2>
        <h1 className='logo'>KEEBUILDS</h1>
        
        <Link to='/'><Button>Back to Landing Page</Button></Link>
      </>
    );
  }
};

export default HomePage;
