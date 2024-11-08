"use client";
import React, { useState } from 'react';
import { Box, Typography, RadioGroup, FormControlLabel, Radio, Grid2 } from '@mui/material';
import { Icon } from '@iconify/react';
import { themePalette } from '@/config/theme.config';

const TipoMascota: React.FC = () => {
  const [selectedValue, setSelectedValue] = useState<string>(''); // Iniciar con una cadena vacía

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };

  const options = [
    { value: 'Perro', icon: 'mdi:dog', label: 'Perro' },
    { value: 'Gato', icon: 'mdi:cat', label: 'Gato' },
    { value: 'Aves', icon: 'mdi:bird', label: 'Aves' },
    { value: 'Pequeños Mamíferos', icon: 'fluent-emoji-high-contrast:hamster', label: 'Peq. Mamíferos' },
    { value: 'Otros', icon: 'mdi:paw', label: 'Otros' },
  ];

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
        height: 'auto',
        margin: '0 auto',
        borderRadius: '10px',
        marginTop: '34px',
        padding: '16px'
      }}
    >
      {/* Título a la izquierda */}
      <Typography align="left" sx={{ color: themePalette.primary, width: '100%', fontSize: '24px', paddingLeft: '13px', fontWeight:'bold' }}>
        Tipo de mascota:
      </Typography>

      {/* Opciones circulares */}
      <RadioGroup value={selectedValue} onChange={handleChange} sx={{ width: '100%' }}>
        <Grid2 container spacing={2} justifyContent="center">
          {options.map((option) => (
            <Grid2 key={option.value} size={{xs:12,sm:6,md:4,lg:2}} display="flex" justifyContent="center">
              <FormControlLabel
                value={option.value}
                control={<Radio sx={{ display: 'none' }} />} // Ocultar el radio, solo se mostrará el contenedor personalizado
                label={
                  <Box display="flex" flexDirection="column" alignItems="center" sx={{ cursor: 'pointer' }}>
                    <Box
                      sx={{
                        width: '100px',
                        height: '100px',
                        borderRadius: '50%',
                        backgroundColor: selectedValue === option.value ? themePalette.primary : themePalette.black10,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '8px',
                      }}
                    >
                      <Icon
                        icon={option.icon}
                        style={{ fontSize: '60px', color: selectedValue === option.value ? themePalette.cwhite : themePalette.primary }}
                      />
                    </Box>
                    <Typography sx={{ color: themePalette.primary, fontSize: '18px' }}>{option.label}</Typography>
                  </Box>
                }
              />
            </Grid2>
          ))}
        </Grid2>
      </RadioGroup>
    </Box>
  );
};

export default TipoMascota;
