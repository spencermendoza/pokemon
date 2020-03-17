import React, { useContext } from 'react';
import { PokeContext } from './PokeContext';

export const Testing = () => {

    const {
        fetchData,
        displayInConsole,
        findPokemon,
        theInput
    } = useContext(PokeContext);

    return (
        <>
            <input type='text' defaultValue='lugia' id='myInput'></input>
            <button onClick={() => theInput()}>Submit</button>
            <div id='putImg'></div>
        </>
    );
}

export default Testing;