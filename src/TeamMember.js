import React, { useContext } from 'react';
import { PokeContext } from './PokeContext';
import Dialog from '@material-ui/core/Dialog';

export const TeamMember = () => {
    const {
        lineupDialog,
    } = useContext(PokeContext)

    return (
        <div></div>
    );
}

export default TeamMember;