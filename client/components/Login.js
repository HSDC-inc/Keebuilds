import React, { useState } from 'react';
import Button from '@mui/material/Button';
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
        if (verdict) { //if user exists, navigate to homepage
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
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        LOGIN: 
      <form>
        USERNAME: <input type="text" id="user1" name="username" /><br/>
        PASSWORD: <input type="text" id="pass1" name="password" />
      
      
        <Button onClick={handleSubmit}>SUBMIT</Button>
      </form>
      <h2>{message}</h2>
      <Link to='/'><Button>Back to Landing Page</Button></Link>
    </div>
  );
}

export default Login;