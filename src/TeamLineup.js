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
        console.log('open')
        return (
            <Grid className={classes.containerStyle} container spacing={3}>
                {playerTeam.map(poke => (
                    <TeamMember
                        poke={poke}
                        key={poke.name}
                    />
                ))}
            </Grid>
        );
    } else {
        console.log('not open')
        return (
            <div></div>
        )
    }
}

export default TeamLineup;




// <Grid container spacing={3}>
//             {playerTeam.map(poke => {
//                 return <Grid item>
//                     <Paper>
//                         <img src={poke.img} />
//                         <Typography>{poke.name}</Typography>
//                     </Paper>
//                 </Grid>
//             })}
//         </Grid>