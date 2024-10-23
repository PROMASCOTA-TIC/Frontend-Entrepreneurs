"use client";
import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, IconButton, Card, CardMedia, CardContent } from '@mui/material';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import { useForm, Controller } from 'react-hook-form';
import '@/assets/styles/emprendedores/general.css';
import { themePalette } from '@/config/theme.config';

interface FormData {
  localPhotos: File[];
  logoPhotos: File[];
}

const AgregarFotosEmpren: React.FC = () => {
  const { handleSubmit, control, setValue, watch } = useForm<FormData>({
    defaultValues: {
      localPhotos: [],
      logoPhotos: [],
    },
  });

  const localPhotos = watch('localPhotos');
  const logoPhotos = watch('logoPhotos');

  // Para recargar estilos
  useEffect(() => {
    const head = document.querySelector('head');
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/assets/styles/emprendedores/general.css';
    head?.appendChild(link);

    return () => {
      head?.removeChild(link); // Limpiar al desmontar el componente
    };
  }, []);

  const onSubmit = (data: FormData) => {
    // Aquí puedes manejar la subida de fotos o los datos del formulario
    console.log(data);
  };

  const handleLocalUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const fileArray = Array.from(files).slice(0, 4); // Limitar a 4 archivos
      setValue('localPhotos', fileArray);
    }
  };

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const fileArray = Array.from(files).slice(0, 2); // Limitar a 2 archivos
      setValue('logoPhotos', fileArray);
    }
  };

  const handleRemoveLocalPhoto = (index: number) => {
    setValue(
      'localPhotos',
      localPhotos.filter((_, i) => i !== index)
    );
  };

  const handleRemoveLogoPhoto = (index: number) => {
    setValue(
      'logoPhotos',
      logoPhotos.filter((_, i) => i !== index)
    );
  };

  const renderEmptySlots = (maxSlots: number, items: File[]) => {
    const emptySlots = maxSlots - items.length;
    const placeholders = Array(emptySlots).fill(null);

    return placeholders.map((_, index) => (
      <Box
        key={index}
        sx={{
          width: 200,
          height: 200,
          border: '2px dashed #ccc',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ccc',
        }}
      >
        <Typography variant="body2">Ingresar imagen</Typography>
      </Box>
    ));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box
        sx={{
          p: 4,
          borderRadius: '8px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography sx={{ color: themePalette.primary, fontSize: '36px', fontWeight: 'bold' }}>
          Agregar fotografías del emprendimiento
        </Typography>

        {/* Contenedor para fotos del local */}
        <Box
          sx={{
            mt: 4,
            p: 3,
            borderRadius: '8px',
            width: '100%',
            textAlign: 'center',
            background: themePalette.black10,
          }}
        >
          <Typography sx={{ color: themePalette.primary, fontSize: '18px', fontWeight: '600' }}>
            Fotos de tu local
          </Typography>
          <input
            accept=".jpg,.png"
            type="file"
            multiple
            onChange={handleLocalUpload}
            style={{ display: 'none' }}
            id="local-upload"
          />
          <label htmlFor="local-upload">
            <Button
              variant="contained"
              component="span"
              sx={{ background: themePalette.primary, color: themePalette.cwhite, textTransform: 'none', mt: 2 }}
              startIcon={<FileUploadIcon />}
            >
              Seleccionar Imagenes
            </Button>
          </label>
          <Box display="flex" flexWrap="wrap" mt={2} gap={2} justifyContent="center">
            {localPhotos.map((file, index) => (
              <Box key={index} sx={{ width: 200 }}>
                <Card>
                  <CardMedia component="img" height="140" image={URL.createObjectURL(file)} alt={file.name} />
                  <CardContent>
                    <Typography variant="body2" color="textSecondary">
                      {file.name}
                    </Typography>
                    <IconButton aria-label="delete" onClick={() => handleRemoveLocalPhoto(index)} color="secondary" size="small">
                      <DeleteIcon />
                    </IconButton>
                  </CardContent>
                </Card>
              </Box>
            ))}
            {renderEmptySlots(4, localPhotos)}
          </Box>
        </Box>

        {/* Contenedor para fotos del logotipo */}
        <Box
          sx={{
            mt: 4,
            p: 3,
            borderRadius: '8px',
            width: '100%',
            textAlign: 'center',
            background: themePalette.black10,
          }}
        >
          <Typography sx={{ color: themePalette.primary, fontSize: '18px', fontWeight: '600' }}>
            Logotipo
          </Typography>
          <input
            accept=".jpg,.png"
            type="file"
            multiple
            onChange={handleLogoUpload}
            style={{ display: 'none' }}
            id="logo-upload"
          />
          <label htmlFor="logo-upload">
            <Button
              variant="contained"
              component="span"
              sx={{ background: themePalette.primary, color: themePalette.cwhite, textTransform: 'none', mt: 2 }}
              startIcon={<FileUploadIcon  />}
            >
              Seleccionar Imagenes
            </Button>
          </label>
          <Box display="flex" flexWrap="wrap" mt={2} gap={2} justifyContent="center">
            {logoPhotos.map((file, index) => (
              <Box key={index} sx={{ width: 200 }}>
                <Card>
                  <CardMedia component="img" height="140" image={URL.createObjectURL(file)} alt={file.name} />
                  <CardContent>
                    <Typography variant="body2" color="textSecondary">
                      {file.name}
                    </Typography>
                    <IconButton aria-label="delete" onClick={() => handleRemoveLogoPhoto(index)} color="secondary" size="small">
                      <DeleteIcon />
                    </IconButton>
                  </CardContent>
                </Card>
              </Box>
            ))}
            {renderEmptySlots(2, logoPhotos)}
          </Box>
        </Box>

        {/* Botones de Guardar y Cancelar */}
        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', gap: 2 }}>
          <Button  type="submit" variant="contained" sx={{ background: themePalette.primary, color: themePalette.cwhite, textTransform: 'none', width:'150px', height:'34px', fontSize:'18px'}}>
            Guardar
          </Button>
          <Button variant="outlined"  sx={{ background: themePalette.primary, color: themePalette.cwhite, textTransform: 'none', width:'150px', height:'34px', fontSize:'18px'}}>
            Cancelar
          </Button>
        </Box>
      </Box>
    </form>
  );
};

export default AgregarFotosEmpren;
