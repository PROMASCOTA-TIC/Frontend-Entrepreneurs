import React from 'react'

import { Box } from '@mui/material';
import { ManageAccounts, Payment, Security, Store, SupportAgent, UploadFile } from '@mui/icons-material';

import BotonCategoria from "@/components/gestionContenido/botones/BotonCategoria";

const PF_Categorias = () => {
  const buttons = [
    { name: 'Publicar Contenido', icon: <UploadFile />, id: 1 },
    { name: 'Registro y Cuenta', icon: <ManageAccounts />, id: 2 },
    { name: 'Compras y Pagos', icon: <Payment />, id: 3 },
    { name: 'Productos y Servicios', icon: <Store/>, id: 4 },
    { name: 'Soporte al Cliente', icon: <SupportAgent />, id: 5 },
    { name: 'Seguridad y Privacidad', icon: <Security />, id: 6 },
  ];

  return (
    <Box
      className='flex-center p-55'

      sx={{
        flexWrap: 'wrap',
        gap: '30px',
      }}
    >
      {buttons.map((button) => (
        <Box key={button.id} sx={{ flex: '0 0 auto' }}>
          <BotonCategoria
            name={button.name}
            icon={button.icon}
            link={`/gestion-contenido/preguntas-frecuentes/categorias?categoryId=${button.id}`}
          />
        </Box>
      ))}
    </Box>
  );
}

export default PF_Categorias