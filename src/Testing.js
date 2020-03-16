import React, { useContext } from 'react';
import { PokeContext } from './PokeContext';

export const Testing = () => {

    const {
        fetchData,
        displayInConsole,
        findPokemon,
    } = useContext(PokeContext);

    function working() {
        fetch('https://pokeapi.co/api/v2/pokemon/3')
            .then(res => res.json())
            .then(data => {
                console.log(data.sprites.front_default)
            })


    }

    return (
        <>
            <button onClick={() => displayInConsole('https://pokeapi.co/api/v2/pokemon/3')}>
                Button!
            </button>
            <input type='text' defaultValue='enter a pokemon' onSubmit={() => console.log(input.value)}></input>
        </>
    );
}

export default Testing;