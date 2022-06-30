import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useImperativeHandle } from 'react';
import { forwardRef } from 'react';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const Snackbars = forwardRef((props , ref) => {

    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState({text:'',variant:''});
  
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    useImperativeHandle(ref, () => ({
        handleOpenSnackbar: (options) => {
            setOpen(false);
            setOptions(options);
            setOpen(true);
        }
    }));

    return (
        <Stack spacing={2} sx={{ width: '100%' }}>
            
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={options.variant} sx={{ width: '100%' }}>
                    {options.text}
                </Alert>
            </Snackbar>

        </Stack>
    );
   
    });