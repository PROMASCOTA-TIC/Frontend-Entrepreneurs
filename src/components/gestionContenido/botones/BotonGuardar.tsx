// BotonGuardar.tsx
"use client";

import React from 'react';
import Button from '@mui/material/Button';

interface BotonGuardarProps {
  // No necesitamos 'mensaje' si el Snackbar se maneja en el padre
  // O puedes conservarlo si quieres mostrar un texto estático
}

const BotonGuardar: React.FC<BotonGuardarProps> = () => {
  return (
    <Button
      variant="contained"
      type="submit"   // <--- SUBMIT del formulario
      className="bg-primary n-regular"
      sx={{
        textTransform: 'none',
        width: 'auto',
        height: { xs: '40px', md: '50px' },
      }}
    >
      Guardar
    </Button>
  );
};

export default BotonGuardar;