import React, { useContext, useEffect } from 'react';
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
      margin: '1%'
    },
    containerStyle: {
      display: 'flex',
      justifyContent: 'center',
    }
  })
  const { handleDialog, playerTeam } = useContext(PokeContext);

  const classes = useStyles();

  return (
    <>
      <Box className={classes.containerStyle}>
        <button className={classes.buttonStyle} onClick={() => { handleDialog() }}>Click to open Poke Menu</button>
        <TeamInput />
      </Box>
      <Box>
        <TeamLineup />
      </Box>
    </>
  )
}

export default App;
