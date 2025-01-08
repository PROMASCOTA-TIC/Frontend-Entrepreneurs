"use client";

import { Button, Box } from '@mui/material';
import React from 'react';
import { useRouter } from 'next/navigation';

interface BotonCategoriaProps {
  name: string;
  icon: React.ElementType;
  link: string;
}

const BotonCategoria: React.FC<BotonCategoriaProps> = ({ name, icon: Icon, link }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(link); // Redirige al link proporcionado
  };

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
      <Box
        className="flex-center"
        sx={{
          width: '100%',
          height: '100%',
        }}
      >
        <Icon
          sx={{
            fontSize: { xs: '40px', md: '80px' },
          }}
        />
      </Box>
    </Button>
  );
};

export default BotonCategoria;
