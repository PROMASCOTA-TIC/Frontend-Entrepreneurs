"use client";

import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface BotonCancelarProps {
    link: string;
    onConfirm: () => void;
}

const BotonCancelar: React.FC<BotonCancelarProps> = ({ link, onConfirm }) => {
    const [open, setOpen] = useState(false);

    const handleClickOpen = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault(); // Previene la acción del enlace al hacer clic
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleConfirm = () => {
        onConfirm(); // Ejecuta la acción de confirmación
        handleClose();
        window.location.href = link; // Redirige al usuario después de confirmar
    };

    return (
        <>
            <Button
                variant="contained"
                className='bg-primary n-regular'
                onClick={handleClickOpen} // Agregamos el evento onClick aquí
                sx={{
                    textTransform: 'none',
                    width: 'auto',
                    height: { xs: '40px', md: '50px' }, // Ajusta la altura según el tamaño de pantalla
                }}
            >
                Cancelar
            </Button>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" style={{ textAlign: 'center' }}>
                    {"Descartar cambios"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        ¿Estás seguro de que deseas descartar este elemento? Esta acción no se puede deshacer.
                    </DialogContentText>
                </DialogContent>
                <DialogActions className='flex-center'>
                    <Button onClick={handleConfirm} color="error" autoFocus>
                        Descartar
                    </Button>
                    <Button onClick={handleClose} color="primary">
                        Cancelar
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default BotonCancelar;
