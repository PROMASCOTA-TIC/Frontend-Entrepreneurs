import { Box, Button } from '@mui/material';
import React from 'react';
import BotonAzul from '@/components/gestionContenido/botones/BotonAzul';

import '/src/assets/styles/gestionContenido/general.css';

const EI_CompartirContenido = () => {
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
            <h1 className='h1-bold'>¡Comparte contenido con la comunidad!</h1>

            <p className='n-regular'>
                ¡Ayuda a otros dueños de mascotas a descubrir contenido útil y emocionante!<br />
                Comparte tus fotos, videos y consejos sobre el cuidado de mascotas.<br />
                ¡Tu experiencia puede hacer una gran diferencia!
            </p>

            <BotonAzul
                name="Compartir"
                link="/gestion-contenido/enlaces-interes/formulario"
            />
        </Box>
    );
}

export default EI_CompartirContenido;
