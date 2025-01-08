"use client";
import React, { useState } from 'react';
import { Box, TextField, Typography, MenuItem, Grid2 } from '@mui/material';
import { themePalette } from '@/config/theme.config';

const productCategories = [
  { value: 'Comida', label: 'Comida' },
  { value: 'Correas', label: 'Correas' },
  { value: 'Ropa', label: 'Ropa' },
  { value: 'Camas', label: 'Camas' },
  { value: 'Juguetes', label: 'Juguetes' },
  { value: 'Medicamentos', label: 'Medicamentos' },
  { value: 'Servicios', label: 'Servicios' }
];

const subcategories = {
  Comida: ['Comida seca', 'Comida húmeda'],
  Correas: ['Nylon', 'Algodón', 'Cuero', 'Metálico'],
  Ropa: ['Chaquetas', 'Suéteres', 'Camisetas', 'Disfraces', 'Impermeables', 'Chalecos'],
  Camas: ['Camas para interior', 'Camas para exterior'],
  Juguetes: ['Juguetes de peluche', 'Pelotas', 'Juguetes para masticar', 'Juguetes de cuerda', 'Juguetes interactivos'],
  Medicamentos: ['Antiparasitarios', 'Suplementos y vitaminas'],
  Servicios: ['Servicios veterinarios', 'Servicio de paseo', 'Servicio de peluquería', 'Servicio de hotel']
};

const sizeOptions = ['S', 'M', 'L', 'XL', 'XXL'];

const FormularioRegistroProducto: React.FC = () => {
  const [formData, setFormData] = useState({
    category: '',
    subcategory: '',
    size: '',
    stock: '',
    price: '',
    weight: '',
    description: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const createField = (label: string, name: string, type = 'text', options?: string[], isSelect = false, textFieldProps: any = {}) => (
    <>
      <Grid2 
      size={{xs:12,sm:4,lg:3}}
      sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography sx={{ fontWeight: '600', fontSize: '18px', mb: '5px', minWidth: '50px' }}>{label}:</Typography>
      </Grid2>
      <Grid2 
      size={{xs:12,sm:8,lg:9}}>
      
        {isSelect ? (
          <TextField
            select
            label="Seleccionar"
            name={name}
            value={formData[name as keyof typeof formData]}
            onChange={handleChange}
            fullWidth
            margin="normal"
            variant="outlined"
            required
            sx={{ maxWidth: '400px' }}
            {...textFieldProps}
          >
            {options?.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        ) : (
          <TextField
            label="Ingresar"
            name={name}
            value={formData[name as keyof typeof formData]}
            onChange={handleChange}
            fullWidth
            margin="normal"
            variant="outlined"
            required
            type={type}
            sx={{ maxWidth: '400px' }}
            {...textFieldProps}
          />
        )}
      </Grid2>
    </>
  );

  return (
    <Box
      sx={{
        padding: '20px',
        maxWidth: '1358px',
        margin: '0 auto',
        borderRadius: '10px',
        backgroundColor: themePalette.black10,
        boxShadow: 3,
        marginTop: '34px',
        color: themePalette.primary,
        border: '1px solid #004040',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center', // Centra horizontalmente
        justifyContent: 'center', // Centra verticalmente
        textAlign: 'center', // Asegura que el texto también esté alineado al centro
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
        Información:
      </Typography>
      <Grid2
        container
        spacing={2}
        sx={{
          marginTop: '13px',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        {createField('Nombre', 'name')}
        {createField('Categoría', 'category', 'text', productCategories.map((cat) => cat.value), true)}
        {formData.category && createField('Subcategoría', 'subcategory', 'text', subcategories[formData.category as keyof typeof subcategories], true)}
        {formData.category === 'Comida' && createField('Peso (kg)', 'weight', 'number')}
        {createField('Stock', 'stock', 'number')}
        {createField('Precio final', 'price', 'number')}
        {['Ropa', 'Correas', 'Camas'].includes(formData.category) && createField('Talla', 'size', 'text', sizeOptions, true)}
        {createField('Descripción', 'description', 'text', undefined, false, { multiline: true, rows: 4, width: '700px' })}
      </Grid2>
    </Box>
  );
};

export default FormularioRegistroProducto;
