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

const TeamMember = ({
    poke = {},
}) => {

    const { name, img, types, strategy, url } = poke;
    const {
        lineupDialog,
        teamLineup,
    } = useContext(PokeContext)

    const useStyles = makeStyles({
        wholeThing: {
            marginTop: '2%',
            width: '50%',
        }
    })

    const classes = useStyles();

    return (
        <div className={classes.wholeThing}>
            <ExpansionPanel>
                <ExpansionPanelSummary>
                    <img src={poke.img} />
                    <Typography variant='h6'>{poke.name}</Typography>
                    <ul>
                        {poke.types.map(t =>
                            <li><Typography>{t.name}</Typography></li>
                        )}
                    </ul>
                </ExpansionPanelSummary>

                <ExpansionPanelDetails>

                    <ExpansionPanel>
                        <ExpansionPanelSummary>
                            <Typography variant='h5'>Resistances ({poke.strategy.resistantTo.length}):</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            {poke.strategy.resistantTo.map(e =>
                                <>
                                    <Typography>{e.name}</Typography>
                                </>
                            )}
                        </ExpansionPanelDetails>
                    </ExpansionPanel>

                    <ExpansionPanel>
                        <ExpansionPanelSummary>
                            <Typography variant='h5'>Weaknesses ({poke.strategy.weakTo.length}):</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            {poke.strategy.weakTo.map(e =>
                                <>
                                    <Typography>{e.name}</Typography>
                                </>
                            )}
                        </ExpansionPanelDetails>
                    </ExpansionPanel>

                    <ExpansionPanel>
                        <ExpansionPanelSummary>
                            <Typography variant='h5'>Immunities ({poke.strategy.immuneTo.length}):</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            {poke.strategy.immuneTo.map(e =>
                                <>
                                    <Typography>{e.name}</Typography>
                                </>
                            )}
                        </ExpansionPanelDetails>
                    </ExpansionPanel>

                    <ExpansionPanel>
                        <ExpansionPanelSummary>
                            <Typography variant='h5'>Double Resistances ({poke.strategy.superResistantTo.length}):</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            {poke.strategy.superResistantTo.map(e =>
                                <>
                                    <Typography>{e.name}</Typography>
                                </>
                            )}
                        </ExpansionPanelDetails>
                    </ExpansionPanel>

                    <ExpansionPanel>
                        <ExpansionPanelSummary>
                            <Typography variant='h5'>Double Weaknesses ({poke.strategy.superWeakTo.length}):</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            {poke.strategy.superWeakTo.map(e =>
                                <>
                                    <Typography>{e.name}</Typography>
                                </>
                            )}
                        </ExpansionPanelDetails>
                    </ExpansionPanel>

                </ExpansionPanelDetails>
            </ExpansionPanel>
        </div>
    );
}

export default TeamMember;