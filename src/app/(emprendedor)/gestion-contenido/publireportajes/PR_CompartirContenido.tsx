import { Box, Button } from '@mui/material';
import React from 'react';
import BotonAzul from '@/components/gestionContenido/botones/BotonAzul';

import '/src/assets/styles/gestionContenido/general.css';

const PR_CompartirContenido = () => {
    return (
        <Box
            className='bg-tertiary20 p-21 txt-center txtcolor-primary'
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '21px'
            }}
        >
            <h1 className='h1-bold'>¡Promociona tus productos o eventos!</h1>

            <p className='n-regular'>
                ¿Tienes algo nuevo que ofrecer? ¡Comparte tus últimos productos o eventos con nuestra comunidad!
                Lleva tu negocio al siguiente nivel.
            </p>

            <BotonAzul
                name="Compartir"
                link="/gestion-contenido/publireportajes/formulario"
            />
        </Box>
    );
}

export default PR_CompartirContenido;
