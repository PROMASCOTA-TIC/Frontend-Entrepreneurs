import React from 'react';
import { Box } from '@mui/material';
import { CleanHands, FoodBank, Healing, Security, School, SportsGymnastics } from '@mui/icons-material';

import BotonCategoria from "@/components/gestionContenido/botones/BotonCategoria";

const EI_Categorias = () => {
  const buttons = [
    { name: 'Higiene', icon: CleanHands, id: 1 },
    { name: 'Salud', icon: Healing, id: 2 },
    { name: 'Adiestramiento', icon: School, id: 3 },
    { name: 'Nutrición', icon: FoodBank, id: 4 },
    { name: 'Seguridad', icon: Security, id: 5 },
    { name: 'Actividades', icon: SportsGymnastics, id: 6 },
  ];

  return (
    <Box
      className="flex-center p-55"
      sx={{
        flexWrap: 'wrap',
        gap: '30px',
      }}
    >
      {buttons.map((button, index) => (
        <Box key={index} sx={{ flex: '0 0 auto' }}>
          <BotonCategoria
            name={button.name}
            icon={button.icon}
            link={`/gestion-contenido/enlaces-interes/categorias?categoryId=${button.id}`}
          />
        </Box>
      ))}
    </Box>
  );
};

export default EI_Categorias;