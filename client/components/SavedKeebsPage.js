import React from 'react';
import '../scss/styles.scss';
import axios from 'axios';
import SavedBuilds from './SavedBuilds';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';


const fetchBuilds = async () => {
  const username = useSelector(state => state.setUser.username);
  const allBuilds = await axios.get(`/api/saved?username=${username}`);
  console.log('data from saved builds get request: ', allBuilds.data);
  return allBuilds.data;
};

//THIS GET REQUEST SHOULD SEND TO THE FRONTEND - 
//_id
//name
//size
//pcb
//plate
//switch
//keycap

const SavedKeebsPage = () => {
  const [builds, setBuilds] = React.useState([]);
  const isLoggedIn = useSelector(state => state.setUser.isLoggedIn);
  const username = useSelector(state => state.setUser.username);
  const setter = () => {
    fetchBuilds()
      .then(response => {
        if(JSON.stringify(response) !== JSON.stringify(builds)) {
          console.log('Setter() has been called, so page should have refreshed')
          setBuilds(response);
        }
      });
  };
  setter();
  //<Button sx={{ width: '200px', color: 'rgb(65, 91, 152)' }} variant="outlined">Back</Button>
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
        {console.log('islogged',isLoggedIn)}
        <h2>Your username is {username}</h2>
        <h1 className='logo'>SAVED KEEBS PAGE</h1>
        <Link to='/'><Button>Back to Landing Page</Button></Link>
      </>
    );
  }
};

export default SavedKeebsPage;