import React, { Component } from 'react';
import { PokemonObj } from './PokemonObj';

//TODO: somehow fit the PokemonObj class into the list. I want to fully format each object w the data I need for this app and store the whole thing in state. 
//That way I don't need to keep making fetch calls back to the API, I will fetch all the data I need at once and be done with it.

const PokeContext = React.createContext();
const { Provider, Consumer } = PokeContext;

class PokeProvider extends Component {

    state = {
        allPokes: [],
        types: [],
        playerTeam: [],
        thisPoke: {},
        inputDialog: {
            open: false,
        },
        lineupDialog: {
            open: false,
        }
    }

    //this function runs as soon as the app loads. fetches and caches all the pokemon and type data I need
    componentDidMount() {
        // Get all the details first, before we start working with them.
        Promise.all([this.getPokes(), this.getTypes()]).then(([pokes, types]) => {
            return Promise.all([
                Promise.all(pokes.map(pokeObj => this.getPokeDetails(pokeObj))),
                Promise.all(types.map(typeObj => this.getTypeDetails(typeObj)))
            ])
        })
            .then(
                ([pokeDetails, typeDetails]) => {
                    // TODO: Finalize types and pokes here!
                    const fixedPokes = this.fixTypes(pokeDetails);
                    this.cacheTypes(typeDetails);
                    const addNewProp = this.addStrat(fixedPokes);
                    this.cachePokes(addNewProp);
                })
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

    // getTypeDetails = (type) => {
    //     return this.fetchData(type.url).then(typeData => ({
    //         name: this.capitalizeFirstLetter(typeData.name),
    //         doubleDmgFrom: this.capitalizeFirstLetter(typeData.damage_relations.double_damage_from),
    //         doubleDmgTo: this.capitalizeFirstLetter(typeData.damage_relations.double_damage_to),
    //         halfDmgFrom: this.capitalizeFirstLetter(typeData.damage_relations.half_damage_from),
    //         halfDmgTo: this.capitalizeFirstLetter(typeData.damage_relations.half_damage_to),
    //         noDmgFrom: this.capitalizeFirstLetter(typeData.damage_relations.no_damage_from),
    //         noDmgTo: this.capitalizeFirstLetter(typeData.damage_relations.no_damage_to),
    //         url: type.url
    //     }))
    // }

    //caches the array passed to it to the types prop in state
    cacheTypes = (types) => {
        this.setState({ types: types });
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
        let newTeam = arr.map(p => {
            for (let i = 0; i < stateList.length; i++) {
                if (p == stateList[i].name) {
                    return stateList[i];
                }
            }
        })

        newTeam = this.formatTeam(newTeam);
        this.setState({ playerTeam: newTeam });
        console.log(newTeam);
        return newTeam;
    }

    formatTeam = (team) => {
        let newTeam = team.map(member => {
            member = this.getInfo(member);
            member.name = this.capitalizeFirstLetter(member.name);
            member = this.loopThroughTypes(member);
            member = this.loopThroughStrategy(member);
            return member;
        });
        return newTeam;
    }

    //This loops through the strategy object on each pokemon and capitalizes the type name 
    loopThroughStrategy = (poke) => {
        let newStratList = Object.keys(poke.strategy);
        let newStrat = poke.strategy;

        for (let i = 0; i < newStratList.length; i++) {
            let thisStrat = newStratList[i];
            for (let j = 0; j < newStrat[thisStrat].length; j++) {
                newStrat[thisStrat][j].name = this.capitalizeFirstLetter(newStrat[thisStrat][j].name);
            }
        }
        poke.strategy = newStrat;
        return poke;
    }

    //This just loops through the names of the types of each pokemon and capitalizes them
    loopThroughTypes = (poke) => {
        let types = poke.types;
        types[0].name = this.capitalizeFirstLetter(types[0].name);
        if (types.length > 1) {
            types[1].name = this.capitalizeFirstLetter(types[1].name);
        }
        poke.types = types;
        return poke;
    }

    //This just loops through the names of the pokemon team and capitalises the first letter of each one
    loopThroughNames = (pokeTeam) => {
        let updateNames = pokeTeam.map(p => {
            return {
                ...p,
                name: this.capitalizeFirstLetter(p.name)
            }
        })
        return updateNames;
    }

    //This just opens/closes the dialog box where users will enter their pokemon team
    handleDialog = () => {
        const dialogStatus = this.state.inputDialog.open;
        this.setState({ inputDialog: { open: !dialogStatus } });
    }

    //This just opens the lineup box containing the user's pokemon team
    handleLineup = () => {
        const lineupStatus = this.state.lineupDialog.open;
        if (lineupStatus === false) {
            this.setState({ lineupDialog: { open: !lineupStatus } });
        }
    }

    //throwaway function to see if i could loop through all pokemon and add the strategy prop to each one. Still not working.
    addStrat = (pokes) => {
        // const oldPokeObj = pokes;

        const newPokeObj = pokes.map(p => {
            return this.getInfo(p);
        })

        return newPokeObj;
    }

    //this will return the type advantages and disadvantages of each pokemon
    getInfo = (poke) => {
        const memberTypes = poke.types;
        const types = this.state.types;
        let strategy = {
            resistantTo: [],
            weakTo: [],
            immuneTo: [],
            superWeakTo: [],
            superResistantTo: [],
        };
        if (memberTypes.length === 1) {
            strategy.resistantTo = this.findItem(memberTypes[0], types).halfDmgFrom;
            strategy.weakTo = (this.findItem(memberTypes[0], types)).doubleDmgFrom;
            strategy.immuneTo = (this.findItem(memberTypes[0], types)).noDmgFrom;
        }
        else {
            strategy.resistantTo = (this.findItem(memberTypes[0], types)).halfDmgFrom.concat((this.findItem(memberTypes[1], types)).halfDmgFrom);
            strategy.weakTo = (this.findItem(memberTypes[0], types)).doubleDmgFrom.concat((this.findItem(memberTypes[1], types)).doubleDmgFrom);
            strategy.immuneTo = (this.findItem(memberTypes[0], types)).noDmgFrom.concat((this.findItem(memberTypes[1], types)).noDmgFrom);
            strategy = this.strategyFormatter(strategy);
        }



        poke.strategy = strategy;

        return poke;
    }

    //this takes the strategy object and runs it through four different formatters
    strategyFormatter = (strategy) => {
        strategy = this.resistantWeaknessBalancer(strategy);
        strategy = this.resistantToImmuneBalancer(strategy);
        strategy = this.superWeakToBalancer(strategy);
        strategy = this.superResistantToBalancer(strategy);

        return strategy;
    }

    //this takes the resistant list and weakness list and compares them. if a type appears on both lists (dual typing) it will remove that type from both lists
    resistantWeaknessBalancer = (strategy) => {
        let resistantTo = strategy.resistantTo;
        let weakTo = strategy.weakTo;
        let rLoop = resistantTo.length;
        let wLoop = weakTo.length;

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

        strategy.resistantTo = resistantTo;
        strategy.weakTo = weakTo;

        return strategy;
    }

    //this checks if a type is on both resistantTo and immuneTo and removes the type from the resistant to list (don't want that type to be counted twice)
    resistantToImmuneBalancer = (strategy) => {
        let resistantTo = strategy.resistantTo;
        let immuneTo = strategy.immuneTo;
        let rLoop = resistantTo.length;
        let iLoop = immuneTo.length;

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

        strategy.resistantTo = resistantTo;

        return strategy;
    }

    //This checks if a type is on the weakness list twice. if it is this will remove both instances of the type from the list and move them to the superWeakTo list
    superWeakToBalancer = (strategy) => {
        let weakTo = strategy.weakTo;
        let wLoop = weakTo.length;
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

        return strategy;
    }

    //this checks if a type is on the resistant list twice. if it is this will remove both instances of the type from the list and move them to the superResistantTo list
    superResistantToBalancer = (strategy) => {
        let resistantTo = strategy.resistantTo;
        let rLoop = resistantTo.length;
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

        return strategy;
    }

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////Functional functions: these functions don't work directly on this app, they were just written to assist with other functions that do help with the app//////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    loopThrough = (array) => {

    }

    //This just capitalizes the first letter of any string passed to it
    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    //simply checks if an object is empty or not. returns bool
    isEmpty = (obj) => {
        for (var key in obj) {
            if (obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }

    //basic function that just returns an item if it is on the array. otherwise it will return an empty object
    findItem = (item, array) => {
        let e = {};
        for (let i = 0; i < array.length; i++) {
            if (item.name === array[i].name) {
                e = array[i];
            }
        }
        return e;
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
                    addStrat: this.addStrat
                }}
            > {this.props.children}</Provider >
        )
    }
}

export { PokeContext, PokeProvider, Consumer as PokeConsumer };