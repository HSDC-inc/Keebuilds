import React from 'react';
import Button from '@mui/material/Button';
import '../scss/styles.scss';
import { changeUserState } from '../redux/userSlice'; 
import { useDispatch } from 'react-redux'; 
import { useNavigate } from 'react-router-dom';

function LogoutButton() {
  const navigate = useNavigate();
  const navToHome = () => navigate('/');
  const dispatch = useDispatch();

  //changes userState to {isLogged: false}
  function logout() {
    dispatch(changeUserState());
    return navToHome();

  }

  return (
    <div className="logoutButton">
      <form>
        <Button onClick={logout}><div className='landingLoginButton'>LOGOUT</div></Button>
      </form>
    </div>
  );
}

export default LogoutButton;