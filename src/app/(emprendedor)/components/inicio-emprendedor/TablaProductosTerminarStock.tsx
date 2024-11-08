import React from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { esES } from '@mui/x-data-grid/locales';
import { DataGrid, GridToolbarContainer, GridToolbarExport, GridToolbarFilterButton, GridToolbarQuickFilter, GridColDef } from '@mui/x-data-grid';
import { themePalette } from '@/config/theme.config';

interface Product {
  id: number;
  nombre: string;
  descripcion: string;
  categoria: string;
  cantidad: number;
  precio: number;
  subcategoria: string;
  imagen: string;
}

const rows: Product[] = [
  {
    id: 1,
    nombre: 'Producto A',
    descripcion: 'Descripción del Producto A',
    categoria: 'Categoría 1',
    cantidad: 3,
    precio: 100,
    subcategoria: 'Subcategoría 1',
    imagen: 'https://via.placeholder.com/50'
  },
  // Agrega más filas según sea necesario
];

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', minWidth: 70, flex: 1 },
  { field: 'nombre', headerName: 'Nombre', minWidth: 150, flex: 2 },
  { field: 'descripcion', headerName: 'Descripción', minWidth: 200, flex: 3 },
  { field: 'categoria', headerName: 'Categoría', minWidth: 130, flex: 2 },
  { field: 'cantidad', headerName: 'Cantidad', type: 'number', minWidth: 100, flex: 1 },
  { field: 'precio', headerName: 'Precio', type: 'number', minWidth: 100, flex: 1 },
  { field: 'subcategoria', headerName: 'Subcategoría', minWidth: 130, flex: 2 },
  {
    field: 'imagen',
    headerName: 'Imagen',
    minWidth: 90,
    flex: 1,
    renderCell: (params) => (
      <img src={params.value as string} alt="Producto" width="50" height="50" />
    ),
  },
  {
    field: 'editar',
    headerName: 'Editar',
    minWidth: 90,
    flex: 1,
    renderCell: () => (
      <IconButton  aria-label="Editar" sx={{color:themePalette.primary}}>
        <EditIcon />
      </IconButton>
    ),
  },
  {
    field: 'eliminar',
    headerName: 'Eliminar',
    minWidth: 90,
    flex: 1,
    renderCell: () => (
      <IconButton color="error" aria-label="Eliminar">
        <DeleteIcon />
      </IconButton>
    ),
  },
];

const CustomToolbar = () => (
  <GridToolbarContainer sx={{ display: 'flex', justifyContent: 'space-between' }}>
    <div>
      <GridToolbarFilterButton />
      <GridToolbarExport />
    </div>
    <GridToolbarQuickFilter debounceMs={500} sx={{ marginLeft: 'auto' }} />
  </GridToolbarContainer>
);

const ProductTable: React.FC = () => {
  return (
    <Box sx={{ padding: '15px' }}>
    <Typography  sx={{ marginBottom: '20px', textAlign: 'left', fontSize:'24px',fontWeight:'bold',color:themePalette.primary }}>
      Productos por acabar stock
    </Typography>
      
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
    </Box>
  );
};

export default ProductTable;
