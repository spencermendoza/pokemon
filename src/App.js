import React, { useContext, useState } from 'react';
import { PokeContext } from './PokeContext';
import Testing from './Testing';
import TeamInput from './TeamInput';
import TeamLineup from './TeamLineup';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

function App() {

  const [first, setFirst] = useState(true);


  const useStyles = makeStyles({
    buttonStyle: {
      margin: '1%',
      backgroundColor: 'blue',
      color: 'white',
      border: '1px solid white',
      height: '30px',
    },
    containerStyle: {
      display: 'flex',
      justifyContent: 'center',
      margin: '0 auto',
      width: '25%',
      height: '100%',
    },
    containerStyleTwo: {
      display: 'flex',
      justifyContent: 'space-between',
      flexDirection: 'row'
    },
    firstContainer: {
      display: 'flex',
      justifyContent: 'center',
      margin: '0 auto',
      width: '25%',
      height: '500px',
      width: '100%',
    },
    firstButton: {
      margin: '1%',
      marginTop: '10%',
      backgroundColor: 'green',
      color: 'white',
      border: '1px solid white',
      height: '45%',
      width: '60%',
      fontSize: '5em',
    }
  })

  const { handleDialog, playerTeam, addStrat, lineupDialog } = useContext(PokeContext);

  const classes = useStyles();

  const firstSubmit = () => {
    setFirst(false);
  }

  if (first) {
    return (
      <div className={classes.firstContainer}>
        <Box className={classes.firstContainer}>
          <button className={classes.firstButton} onClick={() => handleDialog()}>Enter Team</button>
          <TeamInput firstTime={firstSubmit} />
        </Box>
      </div>
    )
  } else {
    return (
      <div>
        <Box className={classes.containerStyle}>
          <button className={classes.buttonStyle} onClick={() => handleDialog()}>Enter Team</button>
          <TeamInput />
        </Box>
        <Box className={classes.containerStyleTwo}>
          <TeamLineup />
          <button className={classes.buttonStyle}>Show Strategy</button>
        </Box>
      </div>
    )
  }

}

export default App;
