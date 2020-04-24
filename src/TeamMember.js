import React, { useContext } from 'react';
import { PokeContext } from './PokeContext';
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { findByLabelText } from '@testing-library/react';

const TeamMember = ({
    poke = {},
}) => {

    const { name, img, types, strategy, url, key } = poke;

    const useStyles = makeStyles({
        wholeThing: {
            marginTop: '2%',
            width: '50%',
            backgroundColor: 'blue',
        },
        fullPanel: {
            backgroundColor: 'blue',
            color: 'white',
            border: '2px solid white'
        },
        pokeStrats: {
            maxWidth: '100%',
            display: 'flex',
            flexWrap: 'wrap',
            flexDirection: 'column',
            backgroundColor: 'blue',
            color: 'white',
        },
        stratPanel: {
            backgroundColor: 'blue',
            color: 'white',
            border: '1px solid white',
            margin: '5px'
        }
    })

    const classes = useStyles();

    return (
        < div className={classes.wholeThing} >
            <ExpansionPanel className={classes.fullPanel}>
                <ExpansionPanelSummary>
                    <img src={poke.img} />
                    <Typography variant='h6'>{poke.name}</Typography>
                    <ul>
                        {poke.types.map(t =>
                            <ul>
                                <li>
                                    <Typography>{t.name}</Typography>
                                </li>
                            </ul>
                        )}
                    </ul>
                </ExpansionPanelSummary>

                <ExpansionPanelDetails>


                    <ul>
                        <li>
                            <ExpansionPanel className={classes.stratPanel}>
                                <ExpansionPanelSummary>
                                    <Typography variant='h5'>Resistances ({poke.strategy.resistantTo.length})</Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails className={classes.pokeStrats}>
                                    {poke.strategy.resistantTo.map(e =>
                                        <ul className={classes.pokeStrats}>
                                            <li>
                                                <Typography>{e.name}</Typography>
                                            </li>
                                        </ul>
                                    )}
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                        </li>

                        <li>
                            <ExpansionPanel className={classes.stratPanel}>
                                <ExpansionPanelSummary>
                                    <Typography variant='h5'>Weaknesses ({poke.strategy.weakTo.length})</Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails className={classes.pokeStrats}>
                                    {poke.strategy.weakTo.map(e =>
                                        <ul>
                                            <li>
                                                <Typography>{e.name}</Typography>
                                            </li>
                                        </ul>
                                    )}
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                        </li>

                        <li>
                            <ExpansionPanel className={classes.stratPanel}>
                                <ExpansionPanelSummary>
                                    <Typography variant='h5'>Immunities ({poke.strategy.immuneTo.length})</Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails className={classes.pokeStrats}>
                                    {poke.strategy.immuneTo.map(e =>
                                        <ul>
                                            <li>
                                                <Typography>{e.name}</Typography>
                                            </li>
                                        </ul>
                                    )}
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                        </li>

                        <li>
                            <ExpansionPanel className={classes.stratPanel}>
                                <ExpansionPanelSummary>
                                    <Typography variant='h5'>Double Resistances ({poke.strategy.superResistantTo.length})</Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails className={classes.pokeStrats}>
                                    {poke.strategy.superResistantTo.map(e =>
                                        <ul>
                                            <li>
                                                <Typography>{e.name}</Typography>
                                            </li>
                                        </ul>
                                    )}
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                        </li>

                        <li>
                            <ExpansionPanel className={classes.stratPanel}>
                                <ExpansionPanelSummary>
                                    <Typography variant='h5'>Double Weaknesses ({poke.strategy.superWeakTo.length})</Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails className={classes.pokeStrats}>
                                    {poke.strategy.superWeakTo.map(e =>
                                        <ul>
                                            <li>
                                                <Typography>{e.name}</Typography>
                                            </li>
                                        </ul>
                                    )}
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                        </li>
                    </ul>

                </ExpansionPanelDetails>
            </ExpansionPanel>
        </div >
    );
}

export default TeamMember;