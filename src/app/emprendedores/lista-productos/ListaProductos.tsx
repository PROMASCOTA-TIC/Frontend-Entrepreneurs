import React from 'react';
import { Box, Typography, TextField, Button, Table, TableBody, TableCell, TableHead, TableRow, Grid2, TableContainer, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LocalOfferIcon from '@mui/icons-material/LocalOffer'; 
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { themePalette } from '@/config/theme.config';
import EditIcon from '@mui/icons-material/Edit';
import { Edit } from '@mui/icons-material';

const ProductList: React.FC = () => {
  return (
    <Box sx={{ padding: 3 }}>
      {/* Título */}
      <Typography align="left" gutterBottom sx={{ color: '#004040', fontWeight: 'bold', fontSize: '34px' }}>
        Lista de productos
      </Typography>

      {/* Campo de búsqueda y botones */}
      <Grid2 container alignItems="center" spacing={2} sx={{ mb: 4, display: 'flex', justifyContent: 'center',gap:'50px' }}>
      
        <Grid2 
        size={{xs:12, sm:6}}>
          <TextField
            variant="outlined"
            fullWidth
            placeholder="Busca tus productos por su nombre"
          />
        </Grid2>
        <Grid2 
        size={{xs:12, sm:1.2}}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            startIcon={<SearchIcon />}
            sx={{ minWidth: '50px',
                background:themePalette.primary,
                textTransform:'none',
                borderRadius:'20px',
             }}  
          >
            Buscar
          </Button>
        </Grid2>
        <Grid2 
        size={{xs:12, sm:2}}>
          <Button
            variant="outlined"
            fullWidth
            startIcon={<LocalOfferIcon />}

            sx={{ minWidth: '50px',
                background:themePalette.primary,
                textTransform:'none',
                borderRadius:'20px',
                color:themePalette.cwhite,
             }}
          >
            Generar Ofertas
          </Button>
        </Grid2>
      </Grid2>

      {/* Tabla de productos */}
      <Grid2 container spacing={2}>
        <Grid2 
        size={{xs:12}}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Nombre</TableCell>
                  <TableCell>Descripción</TableCell>
                  <TableCell>Categoría</TableCell>
                  <TableCell>Subcategoría</TableCell>
                  <TableCell>Precio</TableCell>
                  <TableCell>Cantidad</TableCell>
                  <TableCell>Imagen</TableCell>
                  <TableCell>Editar</TableCell>
                  <TableCell>Eliminar</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* Aquí irían las filas dinámicas */}
                <TableRow>
                  <TableCell>1</TableCell>
                  <TableCell>Producto 1</TableCell>
                  <TableCell>Descripción del producto 1</TableCell>
                  <TableCell>Categoría 1</TableCell>
                  <TableCell>Subcategoría 1</TableCell>
                  <TableCell>$100</TableCell>
                  <TableCell>10</TableCell>
                  <TableCell>Imagen 1</TableCell>
                  <TableCell>
                  <Button

  sx={{
    minWidth: 'auto',  
    color: themePalette.primary,  
  }}
  startIcon={<Edit sx={{ fontSize: '50px' }} />}  
>
</Button>
                  </TableCell>
                  <TableCell>
                    <Button  color="error" 
                    size='large'
                     startIcon={<DeleteForeverIcon 
                        sx={{ fontSize: '30px' }} />}
                    >
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default ProductList;
