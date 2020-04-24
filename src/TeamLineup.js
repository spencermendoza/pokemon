import React, { useContext } from 'react';
import { PokeContext } from './PokeContext';
import TeamMember from './TeamMember';
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import { makeStyles } from '@material-ui/core/styles';

export const TeamLineup = () => {

    const useStyles = makeStyles({
        containerStyle: {
            display: 'flex',
            justifyContent: 'flex-start',
            flexDirection: 'column',
            margin: '0 auto',
            width: '40%',
            height: 'auto',
            padding: '.5% 0 .5% 1%',
            alignContent: 'space-between'
        },
    })

    const {
        lineupDialog,
        playerTeam,
    } = useContext(PokeContext)

    const classes = useStyles();

    if (lineupDialog.open) {
        return (
            < GridList className={classes.containerStyle} spacing={3} >
                {
                    playerTeam.map(poke => (
                        <TeamMember
                            poke={poke}
                            key={poke.key}
                        />
                    ))
                }
            </GridList >
        );
    } else {
        return (
            <div></div>
        )
    }
}

export default TeamLineup;