import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Box } from '@mui/material';
import { themePalette } from '@/config/theme.config';

interface ProductCardProps {
  name: string;
  imageUrl: string;
  description: string;
  price: number;
  onEdit: () => void;
  onDelete: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ name, imageUrl, description, price, onEdit, onDelete }) => {
  return (
    <Card
      sx={{
        width: 191,
        height: 367,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        border: `1px solid ${themePalette.primary}`, // Agregar borde de color
        borderRadius: '8px', // Opcional: agregar un borde redondeado
      }}
    >
      <CardContent sx={{display: 'flex',flexDirection:'column', alignItems:'center', justifyContent:'center' }}>
        <Typography component="div" gutterBottom sx={{fontSize:'18px', fontWeight:'bold'}}>
          {name}
        </Typography>
        <CardMedia
          component="img"
          height="140"
          image={imageUrl}
          alt={name}
          sx={{ marginBottom: 1 }}
        />
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
        <Typography variant="h6" color="text.primary" sx={{ marginTop: 1 }}>
          ${price.toFixed(2)}
        </Typography>
      </CardContent>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, paddingBottom: 1, alignItems: 'center' }}>
        <Button
          variant="contained"
          color="primary"
          onClick={onEdit}
          sx={{
            width: '130px',
            height: '30px',
            borderRadius: '20px',
            background: themePalette.primary,
            textTransform: 'none',
          }}
        >
          Editar
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={onDelete}
          sx={{
            width: '130px',
            height: '30px',
            borderRadius: '20px',
            background: themePalette.primary,
            textTransform: 'none',
            color: themePalette.cwhite,
          }}
        >
          Eliminar
        </Button>
      </Box>
    </Card>
  );
};

export default ProductCard;
