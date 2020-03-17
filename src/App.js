import React, { useContext } from 'react';
import { PokeContext } from './PokeContext';
import Testing from './Testing';
import TeamInput from './TeamInput';
import TeamLineup from './TeamLineup';

function App() {
  const { handleDialog } = useContext(PokeContext);
  return (
    <>
      <button onClick={() => { handleDialog() }}>Click to open Poke Menu</button>
      <TeamInput />
      <TeamLineup />
    </>
  );
}

export default App;
