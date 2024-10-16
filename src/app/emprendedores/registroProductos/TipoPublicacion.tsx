"use client";
import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { Icon } from '@iconify/react';
import { themePalette } from '@/config/theme.config';

const TipoPublicacion: React.FC = () => {
  const [selected, setSelected] = useState<string>(''); // Estado para la opción seleccionada

  const handleSelect = (option: string) => {
    setSelected(option); // Cambia la opción seleccionada
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      sx={{
        border: '1px solid #004040',
        backgroundColor: themePalette.black10,
        width: '100%',
        maxWidth: '1358px',
        height: '180px',
        margin: '0 auto',
        borderRadius: '10px',
        marginTop: '34px'
      }}
    >
      {/* Título a la izquierda */}
      <Typography align="left" sx={{ color: themePalette.primary, width: '100%', fontSize: '24px', paddingLeft: '13px' }}>
        Tipo de publicación:
      </Typography>

      <Box display="flex" justifyContent="space-evenly" alignItems="center" width="100%">
        {/* Botón Producto con icono arriba */}
        <Box display="flex" flexDirection="column" alignItems="center" mx={2}>
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
              fontSize: '18px'
            }}
          >
            Producto
          </Button>
        </Box>

        {/* Botón Servicio con icono arriba */}
        <Box display="flex" flexDirection="column" alignItems="center" mx={2}>
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
              fontSize: '18px'
            }}
          >
            Servicio
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default TipoPublicacion;
