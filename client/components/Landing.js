import React from 'react';
import {Button, Perspective} from '@mui/material/';
import { Link } from 'react-router-dom';


function Landing() {
  return (
    <section className="logSection">
      <div style={{display: 'flex', flexDirection:'column', alignItems: 'center'}}>
        <h3 className='toto' style={{color:'white'}}>hello :3 welcome to</h3>
        <section>
          <h2 className='landingLogo'>
            <section className='staricon'>✦</section>
            KEEBUILDS 2.0_
            <section className='staricon'>✦</section>
          </h2>
        </section>
        <section style={{display:'flex'}}>
          <Link className='landingLoginButton' to="/login">login_</Link>
          <Link className='landingLoginButton' to="/signup">signup_</Link>
        </section>
      </div>
    </section>
  );
}

export default Landing;