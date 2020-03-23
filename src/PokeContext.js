import React, { Component } from 'react';
import { render } from '@testing-library/react';

const PokeContext = React.createContext();
const { Provider, Consumer } = PokeContext;

class PokeProvider extends Component {

    state = {
        allPokes: [],
        playerTeam: [],
        inputDialog: {
            open: false,
        },
        lineupDialog: {
            open: false,
        }
    }

    componentDidMount() {
        this.getPokes()
            .then(p =>
                Promise.all(p.map(pokeObj => this.getPokeDetails(pokeObj)))
            ).then(pokes => this.cachePokes(pokes))
    }

    //Basic fetching, all this does is return the response of the fetch request, another function will handle what we should do with that response
    fetchData = (url) => {
        return fetch(url)
            .then(res => res.json())
            .catch(error => console.log('Looks like you done fucked up', error));
    }

    ////////////////////////////////////////////////////////Following 3 functions happen automatically inside the componentDidMount() method://////////////////////////////////////////////////

    //this just pulls the first 150 pokemon from the pokeapi,
    //eventually I will expand this list to include the data i need for this app,
    //but right now it is only the names of the pokemon
    //TODO: put each pokemon's type on this list
    getPokes = () => {
        return this.fetchData(`https://pokeapi.co/api/v2/pokemon/?limit=150`)
            .then(data => data.results)
    }

    getPokeDetails = (poke) => {
        return this.fetchData(poke.url).then(pokeData => ({
            name: pokeData.name,
            img: pokeData.sprites.front_default,
            types: pokeData.types,
            url: poke.url,
        }))
    }

    // take 5, brb
    cachePokes = (pokes) => {
        this.setState({ allPokes: pokes })
        this.fixTypes(pokes);
    }

    //the type property is a litte messed up. attempting to fix now.
    fixTypes = (arr) => {
        console.log(arr)
        const fixed = arr.map(p => {
            let nTypes = [];
            if (p.types.length > 1) {
                for (var i = 0; i < p.types.length; i++) {
                    nTypes += p.types[i].type
                    console.log(i + ' ' + p.types[i].type)
                }
                return {
                    ...p,
                    types: nTypes
                };
            } else {
                nTypes = [p.types[0]];
                return {
                    ...p,
                    types: nTypes
                };
            }
        })
        // console.log(fixed)
    }

    /////////////////////////////////////////////////////////////////////////end of automatic functions/////////////////////////////////////////////////////////////////////

    //Handles the confirm of the dialog box, accepts the user inputted team,
    //checks it against the pokemon list stored in state,
    //then mutates the users team into the full pokemon objects stored in state
    handleConfirm = (team) => {
        const mainList = this.checkList(team);
        this.newTeam(mainList);
        this.handleDialog();
    }

    //This just checks to see if the user input pokemon are on this list. 
    checkList = (array) => {
        const arr = array.map(p => p.toLowerCase());
        const stateList = this.state.allPokes.map(p => {
            return p.name;
        });
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

    //accepts an array of (lowercase) pokemon names,
    //creates a new array containing the full pokemon object contained in state for each pokemon on the list it is given
    newTeam = (arr) => {
        const stateList = this.state.allPokes;
        const newTeam = arr.map(p => {
            for (let i = 0; i < stateList.length; i++) {
                if (p == stateList[i].name) {
                    return stateList[i];
                }
            }
        })
        this.setState({ playerTeam: newTeam });
        return newTeam;
    }

    //This just opens/closes the dialog box where users will enter their pokemon team
    handleDialog = () => {
        const dialogStatus = this.state.inputDialog.open;
        this.setState({ inputDialog: { open: !dialogStatus } });
    }

    //This just takes the team array and displays the image location in the console. soon i will use this to display the whole team directly on the page
    //TODO: use this function to display the team to the page
    // findImg = (team) => {
    //     const teamImg = team.map(p => {
    //         p = this.fetchData(`https://pokeapi.co/api/v2/pokemon/${p}`)
    //             .then(data => {
    //                 const test = data.sprites.front_default;
    //                 console.log(test)
    //             })
    //     })
    // }

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

    render() {
        return (
            <Provider
                value={{
                    ...this.state,
                    handleDialog: this.handleDialog,
                    handleConfirm: this.handleConfirm,
                    getPokes: this.getPokes,
                    cachePokes: this.cachePokes,
                    getPokeDetails: this.getPokeDetails,
                    displayInConsole: this.displayInConsole,
                    findPokemon: this.findPokemon,
                    theInput: this.theInput,
                    allPokes: this.state.allPokes,
                }}
            >{this.props.children}</Provider >
        )
    }
}

export { PokeContext, PokeProvider, Consumer as PokeConsumer };