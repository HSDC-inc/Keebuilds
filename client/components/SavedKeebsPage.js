import React from 'react';
import '../scss/styles.scss';
import axios from 'axios';
import SavedBuilds from './SavedBuilds';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const fetchBuilds = async (username) => {  
  //send username to db, display saved keyboards from user account
  const allBuilds = await axios.get(`/api/saved?username=${username}`);
  return allBuilds.data;
};

const SavedKeebsPage = () => {
  const [builds, setBuilds] = React.useState([]);
  //if user is not logged in, tell user to login/signup
  //state pulled from redux toolkit
  const isLoggedIn = useSelector(state => state.setUser.isLoggedIn);
  const username = useSelector(state => state.setUser.username);

  const setter = () => {
    
    fetchBuilds(username)
      .then(response => {
        //if the fetch query response is not empty, display builds
        if(JSON.stringify(response) !== JSON.stringify(builds)) {
          setBuilds(response);
        }
      });
  };
  setter();
  if (isLoggedIn) {
    return (
      <div className="homeholder" >
        <Link  to="/Home">
          <Button ><div className='landingLoginButton'>HOME</div></Button>
        </Link>
        <h1 style={{marginTop:'-30px'}}>Saved Builds</h1>
        <div className='savedBuildsContainer'><SavedBuilds builds={builds} setter={setter} /></div>

      </div>
    );
  } else {
    return (
      <>
        <h2>Your username is {username}</h2>
        <h1 className='logo'>SAVED KEEBS PAGE</h1>
        <Link to='/'><Button>Back to Landing Page</Button></Link>
      </>
    );
  }
};

export default SavedKeebsPage;