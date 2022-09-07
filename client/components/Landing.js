import React from 'react';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

function Landing() {
  return (
    <div style={{display: 'flex', flexDirection:'column', alignItems: 'center'}}>
        Welcome to Keebuilds 2.0

      <Link to="/login"><Button>LOGIN</Button></Link>
      <Link to="/signup"><Button>Signup</Button></Link>
    </div>
  );
}

export default Landing;