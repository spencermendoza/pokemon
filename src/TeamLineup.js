import React, { useContext } from 'react';
import { PokeContext } from './PokeContext';
import TeamMember from './TeamMember';
import Dialog from '@material-ui/core/Dialog';

export const TeamLineup = () => {
    const {
        lineupDialog,
    } = useContext(PokeContext)

    return (
        <div>
            <TeamMember />
        </div>
    );
}

export default TeamLineup;