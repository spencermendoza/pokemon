import React, { useContext } from 'react';
import { PokeContext } from './PokeContext';
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const TeamMember = ({
    poke = {},
}) => {

    const { name, img, types, url } = poke;
    const {
        lineupDialog,
        teamLineup,
        getInfo
    } = useContext(PokeContext)

    function FormRow(poke) {
        return (
            <React.Fragment>
                <Grid>
                    <Paper>
                        <Typography>Resistances (2x): {poke.resistantTo}</Typography>
                        <Typography>Weaknesses (2x): {poke.weakTo}</Typography>
                        <Typography>Immunities (0x): {poke.immuneTo}</Typography>
                        <Typography>Double resistant to (4x): {poke.superResistantTo}</Typography>
                        <Typography>Double weak to (4x): {poke.superWeakTo}</Typography>
                    </Paper>
                </Grid>
            </React.Fragment>
        )
    }

    return (
        <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
        >
            <Paper>
                <img src={poke.img} />
                <Typography>{poke.name}</Typography>
            </Paper>
        </Grid >
    );
}

export default TeamMember;