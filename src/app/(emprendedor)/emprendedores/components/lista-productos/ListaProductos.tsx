"use client";
import React from 'react';
import { Box, Typography, Button, Grid2, Paper } from '@mui/material';
import { DataGrid, GridToolbarContainer, GridToolbarExport, GridToolbarFilterButton, GridToolbarQuickFilter, GridColDef } from '@mui/x-data-grid';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import { themePalette } from '@/config/theme.config';
import { esES } from '@mui/x-data-grid/locales';

const ListaProductos: React.FC = () => {
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', minWidth: 70, flex: 0.5 },
    { field: 'nombre', headerName: 'Nombre', minWidth: 150, flex: 1 },
    { field: 'descripcion', headerName: 'Descripción', minWidth: 200, flex: 1.5 },
    { field: 'categoria', headerName: 'Categoría', minWidth: 130, flex: 1 },
    { field: 'subcategoria', headerName: 'Subcategoría', minWidth: 130, flex: 1 },
    { field: 'precio', headerName: 'Precio', minWidth: 100, flex: 0.8 },
    { field: 'cantidad', headerName: 'Cantidad', minWidth: 100, flex: 0.8 },
    { field: 'imagen', headerName: 'Imagen', minWidth: 120, flex: 1 },
    {
      field: 'editar',
      headerName: 'Editar',
      minWidth: 90,
      flex: 0.5,
      renderCell: () => (
        <Button sx={{ color: themePalette.primary }} startIcon={<EditIcon />} />
      ),
    },
    {
      field: 'eliminar',
      headerName: 'Eliminar',
      minWidth: 110,
      flex: 0.5,
      renderCell: () => (
        <Button color="error" startIcon={<DeleteForeverIcon />} />
      ),
    },
  ];

  const rows = [
    {
      id: 1,
      nombre: 'Producto 1',
      descripcion: 'Descripción del producto 1',
      categoria: 'Categoría 1',
      subcategoria: 'Subcategoría 1',
      precio: '$100',
      cantidad: 10,
      imagen: 'Imagen 1',
    },
  ];

  const CustomToolbar = () => {
    return (
      <GridToolbarContainer sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <GridToolbarFilterButton />
          <GridToolbarExport />
        </div>
        <GridToolbarQuickFilter
          debounceMs={500}
          sx={{ marginLeft: 'auto' }}
        />
      </GridToolbarContainer>
    );
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography align="left" gutterBottom sx={{ color: '#004040', fontWeight: 'bold', fontSize: '34px' }}>
        Lista de productos
      </Typography>

      <Grid2 container alignItems="center" sx={{ mb: 4, display: 'flex', justifyContent: 'flex-end' }}>
        <Grid2>
          <Button
            variant="outlined"
            startIcon={<LocalOfferIcon />}
            sx={{
              minWidth: '50px',
              background: themePalette.primary,
              textTransform: 'none',
              borderRadius: '20px',
              color: themePalette.cwhite,
            }}
          >
            Generar Ofertas
          </Button>
        </Grid2>
      </Grid2>

      <Paper sx={{ height: 400, width: '100%' }}>
        <DataGrid
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10, 25]}
          slots={{
            toolbar: CustomToolbar,
          }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500 },
            },
          }}
          sx={{
            '& .MuiDataGrid-toolbarContainer': {
              backgroundColor: themePalette.cwhite,
              padding: '0.5rem',
              border: '0px solid',
            },
            '& .MuiDataGrid-columnHeader': {
              backgroundColor: themePalette.black10,
              fontWeight: 'bold',
            },
            '& .MuiDataGrid-footerContainer': {
              backgroundColor: themePalette.black10,
              fontWeight: 'bold',
            },
          }}
        />
      </Paper>
    </Box>
  );
};

export default ListaProductos;
