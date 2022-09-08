import React from 'react';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import '../scss/styles.scss';
import { changeUserState } from '../redux/userSlice'; 
import { useDispatch } from 'react-redux'; 
import { useNavigate } from 'react-router-dom';

function LogoutButton() {
  const navigate = useNavigate();
  const navToHome = () => navigate('/');
  const dispatch = useDispatch();

  //changes userState to {isLogged: false}
  function logout(){

    dispatch(changeUserState());
    return navToHome();

  }

//<Button onClick={logout} sx={{ width: '200px', color: 'rgb(65, 91, 152)' }} variant="outlined">Logout</Button>

//<Button onClick={handleSubmit}><div className='landingLoginButton'>SUBMIT</div></Button>

  return (
    <div className="logoutButton">
      <form>
      <Button onClick={logout}><div className='landingLoginButton'>LOGOUT</div></Button>
      </form>
    </div>
  );
};

export default LogoutButton;