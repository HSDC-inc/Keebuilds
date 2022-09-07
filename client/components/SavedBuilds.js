import React from 'react';
import '../scss/styles.scss';
import Button from '@mui/material/Button';
import axios from 'axios';

const SavedBuilds = ({builds ,setter}) => {
  console.log({builds});
  console.log('typeof builds is', typeof builds);

  const removeBox = (user_id) => {
    console.log('removing build');
    axios.delete(`/api/build/?user_id=${user_id}`)
      .then(() =>{
        setter();
      });
  };

  const cards = [];
  for(const build of builds) {
    cards.push(
      <div className="buildBox">
        <div className = "removeButton"><Button sx={{ width: '150px', color: 'rgb(65, 91, 152)', float:'right' }} variant="outlined" onClick = {() => removeBox(build.user_id)}>Remove Build</Button></div>
        <div className ="name">Name: {build.name}</div> 
        <section>Size: {build.size}</section>
        <section>PCB: {build.pcb} </section>
        <section>Plate: {build.plate} </section>
        <section>Switch Type: {build.switch}</section> 
        <section>Keycaps: {build.keycap}</section>
      </div>
    );
  }
  console.log('SavedBuilds is rendering');
  return (
    <div className="savedBuilds">
      {cards}
    </div>
  );
};

export default SavedBuilds;
