import React from 'react';
import '../scss/styles.scss';
import StartBuild from './StartBuild';
import SavedBuildsButton from './SavedBuildsButton';
import LogoutButton from './LogoutButton';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import keylogo from '../assets/keylogo.png';


const HomePage = () => {
  //Keebuilds home page, if the user is not logged in, the user will be told to login/signup
  const username = useSelector(state => state.setUser.username);
  const isLoggedIn = useSelector(state => state.setUser.isLoggedIn);

  if (isLoggedIn) {
    return (
      <div id="inroot">
        <section className='navHome'>
    
          <h2 style={{color:'white'}}>      <section className='staricon'>✦</section>welcome {username} !<section className='staricon'>✦</section></h2>
          
        </section>
        <h1 className='logo'>KEEBUILDS HOME_<img src={keylogo} id="keylogo"/></h1>
      
        <div className='startBuildButtonDiv'>
          <StartBuild />
        </div>
        <div className='savedBuildsButtonDiv'><SavedBuildsButton /></div>
        <div className='logoutButtonDiv'> <LogoutButton /></div>
      </div>
    );

  } else {

    return (
      <>
        <section style={{display:'flex', flexDirection:'column',justifyContent:'center', alignItems:'center'}}>
          <h2 style={{color:'white'}}>please login to begin</h2>
          <h1 className='logo'>KEEBUILDS</h1>
          <br/>
          <Link className='landingLoginButton' to='/'>start</Link>
        </section>
      
      </>
    );
  }
};

export default HomePage;
