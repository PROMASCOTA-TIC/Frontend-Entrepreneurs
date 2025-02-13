import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Box } from '@mui/material';
import { themePalette } from '@/config/theme.config';

interface ProductCardProps {
  name: string;
  multimediaFiles: string;
  description: string;
  finalPrice: number;
  onEdit: () => void;
  onDelete: () => void; // 🔹 Asegurarse de que onDelete esté definido
}

const ProductCard: React.FC<ProductCardProps> = ({ name, multimediaFiles, description, finalPrice, onEdit, onDelete }) => {
  const imageUrl = multimediaFiles ? multimediaFiles.split(',')[0].trim() : ''; // Extraer la primera imagen
  const truncatedDescription = description.length > 50 ? description.slice(0, 50) + "..." : description; // Extraer un máximo de 50 caracteres

  return (
    <Card
      sx={{
        width: 220,
        height: 420,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        border: `2px solid ${themePalette.primary}`,
        borderRadius: '8px',
        padding: 1,
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexGrow: 1,
        }}
      >
        <Typography
          component="div"
          gutterBottom
          sx={{
            fontSize: '16px',
            fontWeight: 'bold',
            minHeight: '45px',
            maxHeight: '50px',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            color: themePalette.primary,
          }}
        >
          {name}
        </Typography>

        {imageUrl && (
          <CardMedia
            component="img"
            image={imageUrl}
            alt={name}
            sx={{
              width: '100%',
              height: 150,
              objectFit: 'contain',
              marginBottom: 1,
            }}
          />
        )}

        <Typography variant="body2" sx={{ color: themePalette.primary, minHeight: '50px', maxHeight: '50px' }}>
          {truncatedDescription}
        </Typography>

        <Typography variant="h6" color="text.primary" sx={{ marginTop: 1 }}>
          ${finalPrice ? finalPrice.toFixed(2) : "0.00"}
        </Typography>
      </CardContent>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, paddingBottom: 1, alignItems: 'center' }}>
        <Button variant="contained" 
        sx={{
          width: '130px',
          height: '30px',
          borderRadius: '20px',
          background: themePalette.primary,
          textTransform: 'none',
          color: themePalette.cwhite,
        }}
        onClick={onEdit}>
          Editar
        </Button>
        <Button variant="outlined"  
        sx={{
            width: '130px',
            height: '30px',
            borderRadius: '20px',
            background: themePalette.primary,
            textTransform: 'none',
            color: themePalette.cwhite,
          }} 
           onClick={onDelete}>
          Eliminar
        </Button>
      </Box>
    </Card>
  );
};

export default ProductCard;
