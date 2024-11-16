import React from 'react'

import { Box } from '@mui/material';
import { CleanHands, FoodBank, Healing, HealthAndSafety, School, Security, SportsGymnastics } from '@mui/icons-material';

import BotonCategoria from "@/components/gestionContenido/botones/BotonCategoria";

const EI_Categorias = () => {
  const buttons = [
    { name: 'Higiene', icon: CleanHands, link: '' },
    { name: 'Salud', icon: Healing, link: '' },
    { name: 'Adiestramiento', icon: School, link: '' },
    { name: 'Nutrición', icon: FoodBank, link: '' },
    { name: 'Seguridad', icon: Security, link: '' },
    { name: 'Actividades', icon: SportsGymnastics, link: '' },
  ];

  return (
    <Box
      className='flex-center p-55'

      sx={{
        flexWrap: 'wrap',
        gap: '30px',
      }}
    >
      {buttons.map((button, index) => (
        <Box key={index} sx={{ flex: '0 0 auto' }}>
          <BotonCategoria name={button.name} icon={button.icon} link={button.link} />
        </Box>
      ))}
    </Box>
  );
}

export default EI_Categorias