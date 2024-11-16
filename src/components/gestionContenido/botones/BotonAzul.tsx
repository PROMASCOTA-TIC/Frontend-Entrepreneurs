import { Button } from '@mui/material';
import React from 'react';
import Link from 'next/link';

import '/src/assets/styles/gestionContenido/general.css';

interface ButtonAzulProps {
    name: string; 
    link: string; 
}

const BotonAzul: React.FC<ButtonAzulProps> = ({ name, link }) => {
    return (
        <Link href={link} passHref>
            <Button 
                variant="contained" 
                className='bg-primary n-regular'
                sx={{
                    width: 'auto', // Ajusta el ancho según el tamaño de pantalla
                    height: { xs: '40px', md: '50px' }, // Ajusta la altura según el tamaño de pantalla
                    textTransform: 'none' 
                }}
            >
                {name} {/* Cambia "Compartir" por el prop name */}
            </Button>
        </Link>
    )
}

export default BotonAzul;
