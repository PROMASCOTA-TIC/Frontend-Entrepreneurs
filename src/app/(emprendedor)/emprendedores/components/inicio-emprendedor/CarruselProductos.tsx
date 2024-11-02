import React from 'react';
import { Box, Typography, Grid2 } from '@mui/material';


import ProductCard from './CardsProductosVendidos';
import { themePalette } from '@/config/theme.config';

interface Product {
  name: string;
  imageUrl: string;
  description: string;
  price: number;
}

interface CarouselProps {
  products: Product[];
  onEdit: (index: number) => void;
  onDelete: (index: number) => void;
}

const Carousel: React.FC<CarouselProps> = ({ products, onEdit, onDelete }) => {
  // Limit to the first 5 products
  const topProducts = products.slice(0, 5);

  return (
    <Box sx={{ padding: '15px' }}>
      <Typography  sx={{ marginBottom: '20px', textAlign: 'left', fontSize:'24px',fontWeight:'bold',color:themePalette.primary }}>
        Productos más vendidos
      </Typography>
      
      <Box
        sx={{
          overflowX: 'auto',
          display: 'flex',
          justifyContent: 'center',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        }}
      >
        <Grid2
          container
          spacing={5}
          justifyContent="space-between"
          sx={{
            display: 'flex',
            flexWrap: 'nowrap',
          }}
        >
          {topProducts.map((product, index) => (
            <Grid2
              key={index}
              sx={{
                minWidth: '220px',
                flexShrink: 0,
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <ProductCard
                name={product.name}
                imageUrl={product.imageUrl}
                description={product.description}
                price={product.price}
                onEdit={() => onEdit(index)}
                onDelete={() => onDelete(index)}
              />
            </Grid2>
          ))}
        </Grid2>
      </Box>
    </Box>
  );
};

export default Carousel;
