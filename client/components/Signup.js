import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'; 
import { changeUserState, setUsername } from '../redux/userSlice';
import axios from "axios";

function Signup() {
  const [ message, setMessage ] = useState('Sign Up Here!');
  const navigate = useNavigate();
  const navToHome = () => navigate('/home');
  const dispatch = useDispatch();

  const handleSubmit = () => {
    axios.post('/api/signup', {
      username: document.getElementById('user1').value,
      password: document.getElementById('pass1').value
    })
      .then(verdict => {
        if (verdict.data.isLogged) { //if user exists, navigate to homepage
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
    <section className='logSection'>
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <h2 className='landingLogo2'>{message}</h2>
        <form>
          USERNAME: <input type="text" id="user1" name="username" /><br/>
          PASSWORD: <input type="password" id="pass1" name="password" />
          <Button onClick={handleSubmit}><div className='landingLoginButton'>SUBMIT</div></Button>
        </form>
        <h3 className='landingLogo3'>Already have an account? Login <a className='loginLink' href='/login'>here</a></h3>
      </div>
    </section>
  );
}

export default Signup;