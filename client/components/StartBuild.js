import * as React from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import { FormControlLabel } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import '../scss/styles.scss';
import { useSelector } from 'react-redux';

// stepper labels
const steps = ['Case', 'PCB', 'Plate', 'Switches', 'Keycaps', 'Build'];
// radio button groups for each step
const options = [
  ['60%', '65%', '75%', 'TKL', '100%'],
  ['Hotswap', 'Traditional'],
  ['Polycarbonate', 'Aluminum', 'Brass'],
  ['Linear', 'Tactile', 'Clicky'],
  ['GMK', 'KAT', 'PBT']
];

const StartBuild = () => {

  console.log('StartBuild is rendering');

  // saving state of selected build
  const [build, setBuild] = React.useState({
    0: '',
    1: '',
    2: '',
    3: '',
    4: '',
    5: ''
  });
  // state to open and close dialogue form
  const [open, setOpen] = React.useState(false);
  // state for current step user is on
  const [activeStep, setActiveStep] = React.useState(0);
  // state for selected value of each radio group
  const [value, setValue] = React.useState('');
  // handles opening of dialogue form
  const handleClickOpen = () => setOpen(true);

  // handles closing of dialogue form
  const handleClose = () => {
    setOpen(false);
    setActiveStep(0);
    setValue('');
    setBuild({
      0: '',
      1: '',
      2: '',
      3: '',
      4: '',
      5: ''
    });
  };

  const handleNext = () => {
    console.log('activeStep:', activeStep);
    // save current selected value to build state when clicking next
    setBuild({
      ...build,
      [activeStep]: value.replace('\'', '\'\'')
    });

    setValue('');
    setActiveStep(activeStep + 1);
  };
  const username = useSelector(state => state.setUser.username);
  // having post request in handleNext doesnt catch last keycap value since state is set once the handleNext function ends
  React.useEffect(() => {
    // check to have post request run only for completed select
    if (build[5] !== '') {
      axios
        .post('/api/build', {
          size: build[0],
          pcb: build[1],
          plate: build[2],
          switch: build[3],
          keycap: build[4],
          name: build[5],
          color: 'blue',
          session: 0,
          username: username
        });

      console.log('POST REQUEST: ', {
        size: build[0],
        pcb: build[1],
        plate: build[2],
        switches: build[3],
        keycap: build[4],
        name: build[5],
        color: 'blue',
        session: 0,
        username: username
      });
    }
    // do not put check in parameter, will run with extra post request when build[5] changes back to ''
  }, [build[5]]);

  console.log('build: ', build);

  const handleBack = () => {
    setActiveStep(activeStep - 1);
    setValue('');
  };

  const handleReset = () => {
    // closes dialogue form when clicking "close"
    setOpen(false);
    setActiveStep(0);
    setValue('');
    // resets state of build for new build
    setBuild({
      0: '',
      1: '',
      2: '',
      3: '',
      4: '',
      5: ''
    });
  };

  // sets current value for selected radio button
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  console.log('event target value:', value);

  const getContent = (activeStep) => {
    // renders radio buttons for each step
    if (activeStep !== 5) {
      const radios = [];
      for (let i = 0; i < options[activeStep].length; i++) {
        radios.push(
          <FormControlLabel value={options[activeStep][i]} control={<Radio/>} label={options[activeStep][i]}/>
        );
      }
      return radios;
    }
    // renders input field for build name
    return (
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 3, width: '55ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField
            id="outlined-required"
            defaultValue=""
            value={value}
            onChange={handleChange}
          />
        </div>
      </Box>
    );
  };

  //<Button sx={{ width: '200px', color: 'rgb(65, 91, 152)' }} variant="outlined" onClick={handleClickOpen}>Start Build</Button>
  //
  return (
    <div className="startBuild">
      <Button onClick={handleClickOpen}><div className='landingLoginButton'>START BUILD</div></Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create a new build</DialogTitle>
        <DialogContent>
          <div>
            <Box sx={{ width: '100%' }}>
              <Stepper activeStep={activeStep}>
                {steps.map(label => {
                  return (
                    <Step key={label}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  );
                })}
              </Stepper>
              {activeStep === steps.length ? (
                <React.Fragment>
                  <Typography sx={{ mt: 2, mb: 1 }}>
                    Your new build is saved!
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                    <Box sx={{ flex: '1 1 auto' }} />
                    <Button onClick={handleReset}>Close</Button>
                  </Box>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <Typography sx={{ mt: 2, mb: 1 }}>
                    <FormControl>
                      <FormLabel id="demo-controlled-radio-buttons-group">{activeStep === 1 ? `Select ${steps[activeStep]}: ` : activeStep === 5 ? 'Name your build!' : `Select ${steps[activeStep].toLowerCase()}: `}</FormLabel>
                      <RadioGroup
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                        value={value}
                        onChange={handleChange}
                      >
                        {getContent(activeStep)}
                      </RadioGroup>
                    </FormControl>
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                    <Button
                      color="inherit"
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      sx={{ mr: 1 }}
                    >
                    Back
                    </Button>
                    <Box sx={{ flex: '1 1 auto' }} />
                    <Button onClick={handleNext} disabled={!value}>
                      {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                    </Button>
                  </Box>
                </React.Fragment>
              )}
            </Box>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StartBuild;

