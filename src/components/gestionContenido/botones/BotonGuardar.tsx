"use client";

import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

interface BotonGuardarProps {
    mensaje: string;  // Definimos la prop mensaje
}

const BotonGuardar: React.FC<BotonGuardarProps> = ({ mensaje }) => {
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(true); // Abrir Snackbar al hacer clic
    };

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false); // Cerrar Snackbar
    };

    return (
        <>
            <Button 
                variant="contained" 
                // Esto hay que revisaaaaaaaar
                type="submit"
                
                className='bg-primary n-regular'
                onClick={handleClick} // Agregamos el evento onClick aquí
                sx={{
                    textTransform: 'none',
                    width: 'auto',
                    height: { xs: '40px', md: '50px' }, // Ajusta la altura según el tamaño de pantalla
                }}
            >
                Guardar
            </Button>

            <Snackbar
                open={open}
                autoHideDuration={4000}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert
                    onClose={handleClose}
                    className="n-bold txt-center"
                    severity="success"
                    sx={{
                        width: '100%',
                    }}
                >
                    {mensaje} {/* Usamos el prop mensaje aquí */}
                </Alert>
            </Snackbar>
        </>
    );
};

export default BotonGuardar;