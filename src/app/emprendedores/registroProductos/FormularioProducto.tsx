"use client";
import React, { useState } from 'react';
import { Box, TextField, Typography, MenuItem } from '@mui/material';
import { themePalette } from '@/config/theme.config';

interface Subcategories {
  [key: string]: string[];
}

const productCategories = [
  { value: 'Comida', label: 'Comida' },
  { value: 'Correas', label: 'Correas' },
  { value: 'Ropa', label: 'Ropa' },
  { value: 'Camas', label: 'Camas' },
  { value: 'Juguetes', label: 'Juguetes' },
  { value: 'Medicamentos', label: 'Medicamentos' },
  { value: 'Servicios', label: 'Servicios' }
];

const subcategories: Subcategories = {
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
  const [category, setCategory] = useState<string>('');
  const [subcategory, setSubcategory] = useState<string>('');
  const [size, setSize] = useState<string>(''); // Talla seleccionada
  const [stock, setStock] = useState<string>('');
  const [price, setPrice] = useState<string>(''); // Precio del producto
  const [weight, setWeight] = useState<string>(''); // Peso para categoría de comida
  const [description, setDescription] = useState<string>('');

  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCategory(event.target.value);
    setSubcategory(''); // Limpiar subcategoría al cambiar categoría
    setWeight(''); // Limpiar el campo de peso si se cambia de categoría
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*\.?\d{0,2}$/.test(value)) {
      setPrice(value);
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center" 
      justifyContent="center"
     
      sx={{ padding: '20px', maxWidth: '1358px', margin: '0 auto', borderRadius: '10px', backgroundColor: themePalette.black10, boxShadow: 3, marginTop: '34px', color: themePalette.primary,  border: '1px solid #004040', }}
    >
      <Typography sx={{ color: themePalette.primary, width: '100%', fontSize: '24px', paddingLeft: '13px', fontWeight:'bold' }}>Información:</Typography>

      <Box display="flex" flexDirection="column" alignItems="center" sx={{ width: '100%' }}>
        {/* Nombre del producto */}
        <Box display="flex" flexDirection="row" justifyContent="center" alignItems="center" sx={{ width: '600px' }}>
          <Typography sx={{ width: '150px', textAlign: 'right', marginRight: '16px', fontSize:'24px', fontWeight:'600' }}>Nombre:</Typography>
          <TextField
            label="Ingresar"
            margin="normal"
            variant="outlined"
            required
            sx={{ flex: 1 }}
          />
        </Box>

        {/* Categoría */}
        <Box display="flex" flexDirection="row" justifyContent="center" alignItems="center" sx={{ width: '600px' }}>
          <Typography sx={{ width: '150px', textAlign: 'right', marginRight: '16px', fontSize:'24px', fontWeight:'600'  }}>Categoría:</Typography>
          <TextField
            select
            label="Seleccionar"
            value={category}
            onChange={handleCategoryChange}
            fullWidth
            margin="normal"
            variant="outlined"
            required
            sx={{ flex: 1 }}
          >
            {productCategories.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Box>

        {/* Subcategoría */}
        {category && (
          <Box display="flex" flexDirection="row" justifyContent="center" alignItems="center" sx={{ width: '600px' }}>
            <Typography sx={{ width: '150px', textAlign: 'right', marginRight: '16px', fontSize:'24px', fontWeight:'600'  }}>Subcategoría:</Typography>
            <TextField
              select
              label="Seleccionar"
              value={subcategory}
              onChange={(e) => setSubcategory(e.target.value)}
              fullWidth
              margin="normal"
              variant="outlined"
              required
              sx={{ flex: 1 }}
            >
              {subcategories[category]?.map((sub) => (
                <MenuItem key={sub} value={sub}>
                  {sub}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        )}

        {/* Peso (solo para Comida) */}
        {category === 'Comida' && (
          <Box display="flex" flexDirection="row" justifyContent="center" alignItems="center" sx={{ width: '600px' }}>
            <Typography sx={{ width: '150px', textAlign: 'right', marginRight: '16px' }}>Peso (kg):</Typography>
            <TextField
              label="Peso del producto (kg)"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              fullWidth
              margin="normal"
              variant="outlined"
              required
              type="number"
              InputProps={{ inputProps: { min: 0, step: 0.01 } }}
              sx={{ flex: 1 }}
            />
          </Box>
        )}

        {/* Stock */}
        <Box display="flex" flexDirection="row" justifyContent="center" alignItems="center" sx={{ width: '600px' }}>
          <Typography sx={{ width: '150px', textAlign: 'right', marginRight: '16px', fontSize:'24px', fontWeight:'600' }}>Stock:</Typography>
          <TextField
            label="Ingresar"
            value={stock}
            onChange={(e) => {
              const value = e.target.value;
              if (/^\d*$/.test(value)) {
                setStock(value);
              }
            }}
            fullWidth
            margin="normal"
            variant="outlined"
            required
            type="number"
            InputProps={{ inputProps: { min: 0, step: 1 } }}
            sx={{ flex: 1 }}
          />
        </Box>

        {/* Precio sin IVA */}
        <Box display="flex" flexDirection="row" justifyContent="center" alignItems="center" sx={{ width: '600px' }}>
          <Typography sx={{ width: '150px', textAlign: 'right', marginRight: '16px', fontSize:'24px', fontWeight:'600' }}>Precio sin IVA:</Typography>
          <TextField
            label="Ingresar"
            value={price}
            onChange={handlePriceChange}
            fullWidth
            margin="normal"
            variant="outlined"
            required
            type="text"
            sx={{ flex: 1 }}
          />
        </Box>

        {/* Talla */}
        {(category === 'Ropa' || category === 'Correas' || category === 'Camas') && (
          <Box display="flex" flexDirection="row" justifyContent="center" alignItems="center" sx={{ width: '600px' }}>
            <Typography sx={{width: '150px', textAlign: 'right', marginRight: '16px', fontSize:'24px', fontWeight:'600' }}>Talla:</Typography>
            <TextField
              select
              label="Seleccionar"
              value={size}
              onChange={(e) => setSize(e.target.value)}
              fullWidth
              margin="normal"
              variant="outlined"
              sx={{ flex: 1 }}
            >
              {sizeOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        )}

        {/* Descripción */}
        <Box display="flex" flexDirection="row" justifyContent="center" alignItems="center" sx={{ width: '600px' }}>
          <Typography sx={{width: '150px', textAlign: 'right', marginRight: '16px', fontSize:'24px', fontWeight:'600' }}>Descripción:</Typography>
          <TextField
            label="Ingresa información adicional"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            margin="normal"
            variant="outlined"
            required
            multiline
            rows={4}
            sx={{ flex: 1 }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default FormularioRegistroProducto;
