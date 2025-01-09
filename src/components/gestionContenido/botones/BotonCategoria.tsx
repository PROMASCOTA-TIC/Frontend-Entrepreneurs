'use client';

import React from 'react';
import { Button, Box } from '@mui/material';
import { useRouter } from 'next/navigation';

interface BotonCategoriaProps {
  name: string;
  icon: React.ReactNode;
  link: string;
}

export default function BotonCategoria({ name, icon, link }: BotonCategoriaProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(link);
  };

  // 1) Verifica si es un elemento válido de React (por ej. <CleanHands />, <Icon ... />)
  if (React.isValidElement(icon)) {
    const typedIcon = icon as React.ReactElement<any>;
    // Caso 1: si detectas que es MUI icon (por ejemplo typedIcon.type.muiName)
    if ((typedIcon.type as any).muiName) {
      // Ok, es MUI => usar sx
      icon = React.cloneElement(typedIcon, {
        sx: { fontSize: { xs: '40px', md: '80px' } },
      });
    } else {
      // Caso 2: no es MUI => usar style
      icon = React.cloneElement(typedIcon, {
        style: { fontSize: "80px" },
      });
    }
  }

  return (
    <Button
      variant="contained"
      className="bg-tertiary20 txtcolor-primary flex-spaceBetween"
      sx={{
        flexDirection: 'column',
        padding: 0,
        width: { xs: '200px', md: '400px' },
        height: { xs: '150px', md: '200px' },
        borderRadius: '15px',
      }}
      onClick={handleClick}
    >
      <Box
        className="bg-primary txtcolor-white h2-semiBold flex-center"
        sx={{
          width: '100%',
          height: 'auto',
          textTransform: 'none',
          borderRadius: '15px 15px 0 0',
        }}
      >
        {name}
      </Box>
      <Box className="flex-center" sx={{ width: '100%', height: '100%' }}>
        {/* Renderiza el icono, ya clonado con sx */}
        {icon}
      </Box>
    </Button>
  );
}
