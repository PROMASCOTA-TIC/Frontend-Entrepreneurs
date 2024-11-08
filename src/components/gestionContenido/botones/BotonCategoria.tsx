import { Button, Box } from '@mui/material'; // Asegúrate de tener la última versión
import React from 'react';

import Link from 'next/link';

interface BotonCategoriaProps {
    name: string;
    icon: React.ElementType;
    link: string;
}

const BotonCategoria: React.FC<BotonCategoriaProps> = ({ name, icon: Icon, link }) => {
    return (
        <Link href={link} passHref>
            <Button
                variant="contained"
                className='bg-tertiary20 txtcolor-primary flex-spaceBetween'
                sx={{
                    flexDirection: 'column',
                    padding: 0,
                    width: { xs: '200px', md: '400px' }, // Ancho: 100% en pantallas pequeñas, 400px en pantallas medianas y más
                    height: { xs: '150px', md: '200px' }, // Altura: 150px en pantallas pequeñas, 200px en pantallas medianas y más
                    borderRadius: '15px',
                }}
            >
                <Box
                    className='bg-primary txtcolor-white h2-semiBold flex-center'
                    sx={{
                        width: '100%',
                        height: 'auto',
                        borderBottom: '1px solid #ddd',
                        textTransform: 'none',
                        borderRadius: '15px 15px 0 0',
                    }}
                >
                    {name}
                </Box>
                <Box
                    className='flex-center'
                    sx={{
                        width: '100%',
                        height: '100%',
                    }}
                >
                    <Icon
                        sx={{
                            fontSize: {xs: '40px', md: '80px'}
                        }} />
                </Box>
            </Button>
        </Link>
    )
}

export default BotonCategoria