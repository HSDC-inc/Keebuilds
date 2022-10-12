import React from 'react';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import '../scss/styles.scss';

const SavedBuildsButton = () => {
  //link => render saved keebs

  return (
    <div className="savedBuildsButton">
      <Link to="/savedKeebs">
        <Button ><div className='landingLoginButton'>SAVED KEEBS</div></Button>
      </Link>
    </div>
  );
};

export default SavedBuildsButton;
