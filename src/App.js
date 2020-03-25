import React, { useContext, useEffect } from 'react';
import { PokeContext } from './PokeContext';
import Testing from './Testing';
import TeamInput from './TeamInput';
import TeamLineup from './TeamLineup';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography'

function App() {
  const { handleDialog, playerTeam, getPokeDetails, printTypeData } = useContext(PokeContext);

  return (
    <>
      <button onClick={() => { printTypeData() }}>Click to print type data</button>
      <button onClick={() => { handleDialog() }}>Click to open Poke Menu</button>
      <TeamInput />
      <TeamLineup />
      <Grid container spacing={3}>
        {playerTeam.map(poke => {
          return <Grid item>
            <Paper onClick={() => printTypeData(poke)}>
              <img src={poke.img} />
              <Typography>{poke.name}</Typography>
            </Paper>
          </Grid>
        })}
      </Grid>
    </>
  )
}

export default App;
