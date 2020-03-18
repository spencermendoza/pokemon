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

    //This just opens/closes the dialog box where users will enter their pokemon team
    handleDialog = () => {
        const dialogStatus = this.state.inputDialog.open;
        this.setState({ inputDialog: { open: !dialogStatus } });
    }

    //this just pulls the first 150 pokemon from the pokeapi, eventually I will expand this list to include the data i need for this app but right now it is only the names of the pokemon
    //TODO: put each pokemon's type on this list
    makeList = () => {
        this.fetchData(`https://pokeapi.co/api/v2/pokemon/?limit=150`)
            .then(data => {
                const list = data.results;
                const newList = list.map(p => {
                    return p.name;
                })
                this.setState({ allPokes: newList });
            })
    }

    //This just checks to see if the user input pokemon are on this list. 
    checkList = (array) => {
        const arr = array;
        const stateList = this.state.allPokes;
        const newArr = arr.filter(p => {
            if (stateList.includes(p)) {
                return p;
            } else {
                console.log('this one didnt work ' + p)
                alert('This pokemon isnt on my list! ' + p)
            }
        })
        return newArr;
    }

    //This just takes the team array and displays the image location in the console. soon i will use this to display the whole team directly on the page
    //TODO: use this function to display the team to the page
    findImg = (team) => {
        const teamImg = team.map(p => {
            p = this.fetchData(`https://pokeapi.co/api/v2/pokemon/${p}`)
                .then(data => {
                    const test = data.sprites.front_default;
                    console.log(test)
                })
        })
    }

    //Handles the closing of the dialog box, accepts a value that comes in as an array containing the user's pokemon team
    handleConfirm = (team) => {
        const newTeam = team.map(p => p.toLowerCase());
        const mainList = this.checkList(newTeam);
        this.findImg(mainList);
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
    //     this.fetchData(`https://pokeapi.co/api/v2/pokemon/${poke}`)
    //         .then(data => {
    //             console.log(data);
    //         })
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
        allPokes: '',
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
                    makeList: this.makeList,
                    displayInConsole: this.displayInConsole,
                    findPokemon: this.findPokemon,
                    theInput: this.theInput,
                }}
            >{this.props.children}</Provider >
        )
    }
}

export { PokeContext, PokeProvider, Consumer as PokeConsumer };