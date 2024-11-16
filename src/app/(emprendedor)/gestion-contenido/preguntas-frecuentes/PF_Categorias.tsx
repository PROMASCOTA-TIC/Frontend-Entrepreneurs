import React from 'react'

import { Box } from '@mui/material';
import { ManageAccounts, Payment, Security, Store, SupportAgent, UploadFile } from '@mui/icons-material';

import BotonCategoria from "@/components/gestionContenido/botones/BotonCategoria";

const PF_Categorias = () => {
  const buttons = [
    { name: 'Publicar Contenido', icon: UploadFile, link: '' },
    { name: 'Registro y Cuenta', icon: ManageAccounts, link: '' },
    { name: 'Compras y Pagos', icon: Payment, link: '' },
    { name: 'Productos y Servicios', icon: Store, link: '' },
    { name: 'Soporte al Cliente', icon: SupportAgent, link: '' },
    { name: 'Seguridad y Privacidad', icon: Security, link: '' },
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

export default PF_Categorias