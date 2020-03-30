import React, { useContext, useRef } from 'react';
import { PokeContext } from './PokeContext';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

export const TeamInput = () => {

    const {
        inputDialog,
        handleConfirm,
    } = useContext(PokeContext)

    const first = useRef();
    const second = useRef();
    const third = useRef();
    const fourth = useRef();
    const fifth = useRef();
    const sixth = useRef();

    const handleNewTeam = () => {
        const newTeam = [first.current.value, second.current.value, third.current.value, fourth.current.value, fifth.current.value, sixth.current.value]
        handleConfirm(newTeam);
    }

    return (
        <Box>
            <Dialog open={inputDialog.open}>
                <DialogTitle>Enter team here:</DialogTitle>
                <DialogContent id='myTeam'>
                    <TextField
                        type='text'
                        label='First Pokemon'
                        inputRef={first}
                        defaultValue='venusaur' />
                    <TextField
                        type='text'
                        label='Second Pokemon'
                        inputRef={second}
                        defaultValue='gyarados' />
                    <TextField
                        type='text'
                        label='Third Pokemon'
                        inputRef={third}
                        defaultValue='gengar' />
                    <TextField
                        type='text'
                        label='Fourth Pokemon'
                        inputRef={fourth}
                        defaultValue='cloyster' />
                    <TextField
                        type='text'
                        label='Fifth Pokemon'
                        inputRef={fifth}
                        defaultValue='rhydon' />
                    <TextField
                        type='text'
                        label='Sixth Pokemon'
                        inputRef={sixth}
                        defaultValue='tentacruel' />
                    <Button onClick={e => handleNewTeam()}>Confirm</Button>
                    <Button onClick={e => handleNewTeam()}>Cancel</Button>
                </DialogContent>
            </Dialog>
        </Box>
    );
};

export default TeamInput;