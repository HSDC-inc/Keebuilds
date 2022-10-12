/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react';
import { Box, Button, Avatar, TextField, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'; 
import { changeUserState, setUsername } from '../redux/userSlice'; 

function Login() {
  const [ message, setMessage ] = useState('Log in here!');
  const navigate = useNavigate();
  const navToHome = () => navigate('/home');
  const dispatch = useDispatch();

  const handleSubmit = () => {
    //send a fetch to the backend to authenticate user and the response will be a boolean
    fetch(`/api/login/?username=${document.getElementById('user1').value}&password=${document.getElementById('pass1').value}`)
      .then(response => response.json())
      //true if user exists in database, false if user does not
      .then(verdict => {
        if (verdict.isLogged) { //if user exists, navigate to homepage
        //set username and isLoggedIn into redux state
          dispatch(changeUserState());
          dispatch(setUsername(document.getElementById('user1').value));
          return navToHome();
        } else { //if user does not exist, display error message
          return setMessage('Your username/password is incorrect');
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <section className='logSection'>
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <h2 className='landingLogo2'>{message}</h2>
  
        <form>
            USERNAME: <input type="text" id="user1" name="username" /><br/>
            PASSWORD: <input type="password" id="pass1" name="password" />
          <Button onClick={handleSubmit}><div className='landingLoginButton'>SUBMIT</div></Button>
        </form>
        <h3 className='landingLogo3'>Don't have an account? Sign up <a  className='loginLink' href='/signup'>here</a></h3>
      </div>
    </section>
  );
}

export default Login;