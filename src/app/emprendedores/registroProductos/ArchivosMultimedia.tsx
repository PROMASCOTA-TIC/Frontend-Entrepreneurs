"use client";
import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, IconButton, Card, CardMedia, CardContent } from '@mui/material';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import { useForm } from 'react-hook-form';
import '@/assets/styles/emprendedores/general.css';
import { themePalette } from '@/app/config/theme.config';

interface FormData {
  localPhotos: File[];
}

const ArchivosMultimedia: React.FC = () => {
  const { handleSubmit, control, setValue, watch } = useForm<FormData>({
    defaultValues: {
      localPhotos: [],
    },
  });

  const localPhotos = watch('localPhotos');

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
    console.log(data);
  };

  const handleLocalUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const fileArray = Array.from(files).slice(0, 4); // Limitar a 4 archivos
      setValue('localPhotos', fileArray);
    }
  };

  const handleRemoveLocalPhoto = (index: number) => {
    setValue(
      'localPhotos',
      localPhotos.filter((_, i) => i !== index)
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

        <Box
          sx={{
            mt: 4,
            p: 3,
            borderRadius: '8px',
            width: '100%',
            textAlign: 'center',
            background: themePalette.black10,
            border: '1px solid #004040',

          }}
        >
         <Typography
        align="left"
        sx={{
          color: themePalette.primary,
          width: '100%',
          fontSize: '24px',
          paddingLeft: '30px',
          fontWeight: 'bold',
          marginBottom: '16px'
        }}
      >
        Archivos multimedia
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
              Seleccionar  Archivos
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

      </Box>
    </form>
  );
};

export default ArchivosMultimedia;
