import React from 'react';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import '../scss/styles.scss';

const SavedBuildsButton = () => {

  console.log('SavedBuilds button is rendering');


  const handleGet = () => {
    // redirect to saved builds page
  };

//<Button sx={{ width: '200px', color: 'rgb(65, 91, 152)' }} variant="outlined">Saved Keebs</Button>
//<Button onClick={handleSubmit}><div className='landingLoginButton'>SUBMIT</div></Button>


  return (
    <div className="savedBuildsButton">
      <Link to="/savedKeebs">
        <Button ><div className='landingLoginButton'>SAVED KEEBS</div></Button>
      </Link>
    </div>
  );
};

export default SavedBuildsButton;
