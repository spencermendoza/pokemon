import React, { useContext } from 'react';
import { PokeContext } from './PokeContext';
import TeamMember from './TeamMember';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

export const TeamLineup = () => {

    const useStyles = makeStyles({
        containerStyle: {
            display: 'flex',
            justifyContent: 'center',
        },
    })

    const {
        lineupDialog,
        playerTeam,
    } = useContext(PokeContext)

    const classes = useStyles();

    if (lineupDialog.open) {
        return (
            <Grid className={classes.containerStyle} container spacing={3}>
                {playerTeam.map(poke => (
                    <Grid item>
                        <TeamMember
                            poke={poke}
                            key={poke.name}
                        />
                    </Grid>
                ))
                }
            </Grid >
        );
    } else {
        return (
            <div></div>
        )
    }
}

export default TeamLineup;