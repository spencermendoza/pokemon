import React, { Component } from 'react';
import { render } from '@testing-library/react';

const PokeContext = React.createContext();
const { Provider, Consumer } = PokeContext;

class PokeProvider extends Component {

    state = {
        allPokes: [],
        playerTeam: [],
        types: [],
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
            ).then(pokes => this.fixTypes(pokes))
            .then(pokes => this.cachePokes(pokes))
        this.getTypes()
            .then(p =>
                Promise.all(p.map(typeObj => this.getTypeDetails(typeObj)))
            ).then(types => this.cacheTypes(types))
    }

    //Basic fetching, all this does is return the response of the fetch request,
    //another function will handle what we should do with that response
    fetchData = (url) => {
        return fetch(url)
            .then(res => res.json())
            .catch(error => console.log('Looks like you done fucked up', error));
    }

    ////////////////////////////////////////////////////////Following functions happen automatically inside the componentDidMount() method://////////////////////////////////////////////////

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

    //the type property is a litte messed up. parsing the 'types' array and
    //pulling out just the type and the url associated with each pokemon
    //thinking about renaming to 'formatTypes' or something like that
    fixTypes = (arr) => {
        const fixed = arr.map(p => {
            let nTypes = [];
            if (p.types.length > 1) {
                for (var i = 0; i < p.types.length; i++) {
                    nTypes.push(p.types[i].type)
                }
                return {
                    ...p,
                    types: nTypes
                };
            } else {
                nTypes.push(p.types[0].type);
                return {
                    ...p,
                    types: nTypes
                };
            }
        })
        return fixed;
    }

    // take 5, brb
    cachePokes = (pokes) => {
        this.setState({ allPokes: pokes })
    }

    //this just pulls the types out of the api
    //still trying to figure out how to get the data from each one
    getTypes = () => {
        return this.fetchData(`https://pokeapi.co/api/v2/type/`)
            .then(data => data.results)
    }

    //pulls the data I need from each type passed to it
    getTypeDetails = (type) => {
        return this.fetchData(type.url).then(typeData => ({
            name: typeData.name,
            doubleDmgFrom: typeData.damage_relations.double_damage_from,
            doubleDmgTo: typeData.damage_relations.double_damage_to,
            halfDmgFrom: typeData.damage_relations.half_damage_from,
            halfDmgTo: typeData.damage_relations.half_damage_to,
            noDmgFrom: typeData.damage_relations.no_damage_from,
            noDmgTo: typeData.damage_relations.no_damage_to,
            url: type.url
        }))
    }

    //caches the array passed to it to the types prop in state
    cacheTypes = (types) => {
        this.setState({ types: types })
    }

    printTypeData = () => {
        console.log(this.state.types)
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
                console.log('this one didnt work: ' + p)
                alert('This pokemon isnt on my list! ' + p)
            }
        })
        return newArr;
    }

    //accepts an array of (lowercase) pokemon names,
    //creates a new array containing the full pokemon object contained
    //in state for each pokemon on the list it is given
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
                    printTypeData: this.printTypeData,
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