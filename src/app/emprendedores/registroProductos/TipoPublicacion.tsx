"use client";
import React, { useState } from 'react';
import { Box, Button, Typography, Grid2 } from '@mui/material';
import { Icon } from '@iconify/react';
import { themePalette } from '@/config/theme.config';

const TipoPublicacion: React.FC = () => {
  const [selected, setSelected] = useState<string>(''); // Estado para la opción seleccionada

  const handleSelect = (option: string) => {
    setSelected(option); // Cambia la opción seleccionada
  };

  return (
    <Box
      sx={{
        border: '1px solid #004040',
        backgroundColor: themePalette.black10,
        width: '100%',
        maxWidth: '1358px',
        height: 'auto',
        margin: '0 auto',
        borderRadius: '10px',
        marginTop: '34px',
        padding: '20px'
      }}
    >
      {/* Título a la izquierda */}
      <Typography
        align="left"
        sx={{
          color: themePalette.primary,
          width: '100%',
          fontSize: '24px',
          paddingLeft: '30px',
          fontWeight: 'bold',
          marginBottom: '16px'
        }}
      >
        Tipo de publicación:
      </Typography>

      <Grid2 container spacing={2} justifyContent="space-evenly" alignItems="center">
        {/* Botón Producto con icono arriba */}
        <Grid2
        size={{xs:12,sm:6,md:3}}
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <Icon icon="material-symbols-light:pet-supplies-outline" style={{ fontSize: '60px', color: themePalette.primary }} />
          <Button
            onClick={() => handleSelect('Producto')}
            sx={{
              background: selected === 'Producto' ? themePalette.primary : themePalette.black10,
              color: selected === 'Producto' ? themePalette.cwhite : themePalette.primary,
              textTransform: 'none',
              width: '213px',
              height: '34px',
              borderRadius: '20px',
              fontSize: '18px',
              marginTop: '10px'
            }}
          >
            Producto
          </Button>
        </Grid2>

        {/* Botón Servicio con icono arriba */}
        <Grid2
        size={{xs:12,sm:6,md:3}}
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <Icon icon="healthicons:guide-dog-outline" style={{ fontSize: '60px', color: themePalette.primary }} />
          <Button
            onClick={() => handleSelect('Servicio')}
            sx={{
              background: selected === 'Servicio' ? themePalette.primary : themePalette.black10,
              color: selected === 'Servicio' ? themePalette.cwhite : themePalette.primary,
              textTransform: 'none',
              width: '213px',
              height: '34px',
              borderRadius: '20px',
              fontSize: '18px',
              marginTop: '10px'
            }}
          >
            Servicio
          </Button>
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default TipoPublicacion;
