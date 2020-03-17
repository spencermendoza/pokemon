import React, { Component } from 'react';
import { render } from '@testing-library/react';

const PokeContext = React.createContext();
const { Provider, Consumer } = PokeContext;

class PokeProvider extends Component {

    //Basic fetching, all this does is return the response of the fetch request, another function will handle what we should do with that response
    fetchData = (url) => {
        return fetch(url)
            .then(res => res.json())
            .catch(error => console.log('Looks like you done fucked up', error));
    }

    //This just opens the dialog box where users will enter their pokemon team
    handleDialog = () => {
        const dialogStatus = this.state.inputDialog.open;
        this.setState({ inputDialog: { open: !dialogStatus } });
    }

    //Handles the closing of the dialog box, accepts a value that comes in as an array containing the user's pokemon team
    handleConfirm = (team) => {
        const newTeam = team;
        this.handleDialog();
    }

    // displayInConsole = (url) => {
    //     this.fetchData(url)
    //         .then(data => {
    //             console.log(data.sprites.front_default)
    //         })
    // }

    // findPokemon = (name) => {
    //     const poke = name;
    //     this.displayInConsole(`https://pokeapi.co/api/v2/pokemon/${poke}`)
    // }

    // showImage = (data) => {
    //     const html = `
    //         <img src='${data}' alt>
    //     `;
    //     const div = document.getElementById('putImg');
    //     div.innerHTML = html;
    // }

    // theInput = () => {
    //     const inputValue = document.getElementById('myInput').value;
    //     this.fetchData(`https://pokeapi.co/api/v2/pokemon/${inputValue}`)
    //         .then(data => {
    //             console.log(data);
    //             const image = data.sprites.front_default;
    //             this.showImage(image)
    //         })
    //     document.getElementById('myInput').value = 'enter another pokemon';
    //     console.log(inputValue);
    // }

    state = {
        inputDialog: {
            open: false,
        },
        lineupDialog: {
            open: false,
        }
    }

    render() {
        return (
            <Provider
                value={{
                    ...this.state,
                    handleDialog: this.handleDialog,
                    handleConfirm: this.handleConfirm,
                    displayInConsole: this.displayInConsole,
                    findPokemon: this.findPokemon,
                    theInput: this.theInput,
                }}
            >{this.props.children}</Provider >
        )
    }
}

export { PokeContext, PokeProvider, Consumer as PokeConsumer };