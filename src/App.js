import React, { useContext } from 'react';
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
  const useStyles = makeStyles({
    buttonStyle: {
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
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
    }
  })
  const { handleDialog, playerTeam, addStrat, lineupDialog } = useContext(PokeContext);

  const classes = useStyles();


  return (
    <div>
      <Box className={classes.containerStyle}>
        <button className={classes.buttonStyle} onClick={() => { handleDialog() }}>Enter Team</button>
        <TeamInput />
      </Box>
      <Box className={classes.containerStyleTwo}>
        <TeamLineup />
        <button className={classes.buttonStyle}>Show Strategy</button>
      </Box>
    </div>
  )
}

export default App;
