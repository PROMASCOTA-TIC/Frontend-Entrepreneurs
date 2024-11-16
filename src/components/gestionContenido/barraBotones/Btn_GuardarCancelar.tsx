"use client";

import { Box } from '@mui/material';
import React, { FC } from 'react';
import BotonGuardar from '../botones/BotonGuardar';
import BotonCancelar from '../botones/BotonCancelar';

interface Btn_GuardarCancelarProps {
    linkGuardar: string;
    linkCancelar: string;
}

const Btn_GuardarCancelar: FC<Btn_GuardarCancelarProps> = ({ linkGuardar, linkCancelar }) => {
    const handleDelete = () => {
        // Lógica para eliminar el elemento
        console.log("Elemento eliminado");
    };

    return (
        <Box
            className="flex-center"
            sx={{
                gap: {
                    xs: '15px',   // Gap para pantallas extra pequeñas
                    sm: '50px',
                    md: '100px',
                },
            }}
        >
            <BotonGuardar
                mensaje='Guardado con éxito'
            />

            <BotonCancelar
                link={linkCancelar}
                onConfirm={handleDelete}
            />
        </Box>
    );
}

export default Btn_GuardarCancelar;