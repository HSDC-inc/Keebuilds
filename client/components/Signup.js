import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'; 
import { changeUserState, setUsername } from '../redux/userSlice';

function Signup() {
  const [ message, setMessage ] = useState('Sign Up Here!');
  const navigate = useNavigate();
  const navToHome = () => navigate('/home');
  const dispatch = useDispatch();

  const handleSubmit = () => {
    fetch('/api/signup', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        username: document.getElementById('user1').value,
        password: document.getElementById('pass1').value
      },
    })
      .then((response) => {
        response.json();
      })
      .then(verdict => {
        if (verdict) { //if user exists, navigate to homepage
          dispatch(changeUserState());
          dispatch(setUsername(document.getElementById('user1').value));
          return navToHome();
        } else { //if user does not exist, display error message
          return setMessage('Entered username or password is invalid');
        }
      })
      .catch((err) => {
        console.log('Error in SignUp handleSubmit: ',err);
        return setMessage('Entered username or password is invalid');
      });
  };

  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
    SIGN UP: 
      <form>
        USERNAME: <input type="text" id="user1" name="username" /><br/>
        PASSWORD: <input type="text" id="pass1" name="password" />
      </form>
      <Button onClick={handleSubmit}>SUBMIT</Button>
      <h2>{message}</h2>
      <Link to='/'><Button>Back to Landing Page</Button></Link>
    </div>
  );
}

export default Signup;