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
        teamLineup
    } = useContext(PokeContext)

    console.log(poke);
    return (
        <Grid>
            <Paper>
                <img src={poke.img} />
                <Typography>{poke.name}</Typography>
            </Paper>
        </Grid>
    );
}

export default TeamMember;