import React, { Component } from 'react';
import { render } from '@testing-library/react';

const PokeContext = React.createContext();
const { Provider, Consumer } = PokeContext;

class PokeProvider extends Component {

    fetchData = (url) => {
        return fetch(url)
            .then(res => res.json())
            .catch(error => console.log('Looks like you done fucked up', error));
    }

    displayInConsole = (url) => {
        this.fetchData(url)
            .then(data => {
                console.log(data.sprites.front_default)
            })
    }

    findPokemon = (name) => {
        const poke = name;
        this.displayInConsole(`https://pokeapi.co/api/v2/pokemon/${poke}`)
    }

    render() {
        return (
            <Provider
                value={{
                    fetchData: this.fetchData,
                    displayInConsole: this.displayInConsole,
                    findPokemon: this.findPokemon
                }}
            >{this.props.children}</Provider >
        )
    }
}

export { PokeContext, PokeProvider, Consumer as PokeConsumer };