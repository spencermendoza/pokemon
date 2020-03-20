import React, { useContext, useEffect } from 'react';
import { PokeContext } from './PokeContext';
import Testing from './Testing';
import TeamInput from './TeamInput';
import TeamLineup from './TeamLineup';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography'

function App() {
  const { handleDialog, allPokes, getPokeDetails } = useContext(PokeContext);

  return (
    <>
      <button onClick={() => { handleDialog() }}>Click to open Poke Menu</button>
      <TeamInput />
      <TeamLineup />
      {/* {allPokes.map(poke => <div><img src={poke.img} /><p>{poke.name}</p></div>)} */}
      <Grid container spacing={3}>
        {allPokes.map(poke => {
          return <Grid item>
            <Paper>
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
