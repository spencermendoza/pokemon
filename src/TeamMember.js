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

const TeamMember = ({
    poke = {},
}) => {

    const { name, img, types, url } = poke;
    const {
        lineupDialog,
        teamLineup,
    } = useContext(PokeContext)

    return (
        <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
        >
            <Card>
                <ExpansionPanel>
                    <ExpansionPanelSummary>
                        <img src={poke.img} />
                        <Typography>{poke.name}</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Typography>Resistances (2x):</Typography>
                        {poke.strategy.resistantTo.map(e =>
                            <Typography>{e.name}</Typography>
                        )}
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </Card>
        </Grid >
    );
}

export default TeamMember;