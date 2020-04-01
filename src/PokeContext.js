import React, { Component } from 'react';
import { render } from '@testing-library/react';
import { pokemonObj } from './pokemonObj';

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

    //simply formats the data from the API into the data I actually need to use
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

    /////////////////////////////////////////////////////////////////////////end of automatic functions/////////////////////////////////////////////////////////////////////

    //Handles the confirm of the dialog box, accepts the user inputted team,
    //checks it against the pokemon list stored in state,
    //then mutates the users team into the full pokemon objects stored in state
    handleConfirm = (team) => {
        const mainList = this.checkList(team);
        this.newTeam(mainList);
        this.handleDialog();
        this.handleLineup();
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

    //This just opens the lineup box containing the user's pokemon team
    handleLineup = () => {
        const lineupStatus = this.state.lineupDialog.open;
        if (lineupStatus == false) {
            this.setState({ lineupDialog: { open: !lineupStatus } });
        }
    }

    //basic function that just returns an item if it is on the array. otherwise it will return an empty object
    findItem = (item, array) => {
        let e = {};
        for (let i = 0; i < array.length; i++) {
            if (item.name == array[i].name) {
                e = array[i];
            }
        }
        return e;
    }

    //this will return the type advantages and disadvantages of each pokemon
    getInfo = (poke) => {
        const types = this.state.types;
        const memberTypes = poke.types;
        let strategy = {
            resistantTo: [],
            weakTo: [],
            immuneTo: [],
            superWeakTo: [],
            superResistantTo: [],
        };
        if (memberTypes.length == 1) {
            strategy.resistantTo = (this.findItem(memberTypes[0], types)).halfDmgFrom;
            strategy.weakTo = (this.findItem(memberTypes[0], types)).doubleDmgFrom;
            strategy.immuneTo = (this.findItem(memberTypes[0], types)).noDmgFrom;
        } else {
            strategy.resistantTo = (this.findItem(memberTypes[0], types)).halfDmgFrom.concat((this.findItem(memberTypes[1], types)).halfDmgFrom);
            strategy.weakTo = (this.findItem(memberTypes[0], types)).doubleDmgFrom.concat((this.findItem(memberTypes[1], types)).doubleDmgFrom);
            strategy.immuneTo = (this.findItem(memberTypes[0], types)).noDmgFrom.concat((this.findItem(memberTypes[1], types)).noDmgFrom);
        }

        console.log('before format: ');
        console.log(strategy);
        this.strategyFormatter(strategy);
        return strategy;
    }

    //this takes the resistances, weaknesses, and immunities and makes them consistent across all lists (one resistant will cancel out a weakness if the type is on both lists, double weaknesses will be moved to the superWeakTo property)
    strategyFormatter = (strategy) => {
        let weakTo = strategy.weakTo;
        let resistantTo = strategy.resistantTo;
        let immuneTo = strategy.immuneTo;
        let rLoop = resistantTo.length;
        let wLoop = weakTo.length;
        let iLoop = strategy.immuneTo.length;

        for (let i = 0; i < rLoop; i++) {
            const rItem = resistantTo[i];
            for (let j = 0; j < wLoop; j++) {
                const wItem = weakTo[j];
                if (rItem.name == wItem.name) {
                    resistantTo.splice(i, 1);
                    weakTo.splice(j, 1);
                    i = i - 1;
                    j = j - 1;
                    rLoop = rLoop - 1;
                    wLoop = wLoop - 1;
                }
            }
        }

        if (immuneTo.length > 0) {
            for (let i = 0; i < rLoop; i++) {
                const rItem = resistantTo[i];
                for (let j = 0; j < iLoop; j++) {
                    const iItem = immuneTo[j];
                    if (rItem.name == iItem.name) {
                        resistantTo.splice(i, 1);
                        i = i - 1;
                        rLoop = rLoop - 1;
                    }
                }
            }
        }

        let newWeak = [];
        let newSuperWeak = [];

        for (let i = 0; i <= wLoop; i++) {
            let item = undefined;
            item = weakTo.shift();
            for (let j = 0; j < weakTo.length; j++) {
                if (item !== undefined && item.name == weakTo[j].name) {
                    newSuperWeak.push(item);
                    weakTo.splice(j, 1);
                    wLoop = wLoop - 1;
                    item = undefined;
                }
            }
            if (item !== undefined) {
                newWeak.push(item);
            }
        }

        strategy.weakTo = newWeak;
        strategy.superWeakTo = newSuperWeak;

        let newResistant = [];
        let newSuperResistant = [];

        for (let i = 0; i < rLoop; i++) {
            let item = undefined;
            item = resistantTo.shift();
            for (let j = 0; j < resistantTo.length; j++) {
                if (item !== undefined && item.name == resistantTo[j].name) {
                    newSuperResistant.push(item);
                    resistantTo.splice(j, 1);
                    rLoop = rLoop - 1;
                    item = undefined;
                }
            }
            if (item !== undefined) {
                newResistant.push(item)
            }
        }

        strategy.resistantTo = newResistant;
        strategy.superResistantTo = newSuperResistant;

        console.log('after format:')
        console.log(strategy)

        return strategy;
    }

    isEmpty = (obj) => {
        for (var key in obj) {
            if (obj.hasOwnProperty(key))
                return false;
        }
        return true;
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
                    getInfo: this.getInfo,
                }}
            >{this.props.children}</Provider>
        )
    }
}

export { PokeContext, PokeProvider, Consumer as PokeConsumer };