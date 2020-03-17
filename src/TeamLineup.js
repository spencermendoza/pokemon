import React, { useContext } from 'react';
import { PokeContext } from './PokeContext';
import Dialog from '@material-ui/core/Dialog';

export const TeamLineup = () => {
    const {
        lineupDialog,
    } = useContext(PokeContext)

    return (
        <Dialog open={lineupDialog.open}>
            <div></div>
        </Dialog>
    );
}

export default TeamLineup;