"use client";
import React from 'react';
import { Box, Typography, TextField, Button, Grid2 } from '@mui/material';
import { DataGrid, GridToolbarContainer, GridToolbarExport, GridToolbarFilterButton, GridToolbarQuickFilter, GridColDef } from '@mui/x-data-grid';
import { useForm, Controller } from 'react-hook-form';
import { themePalette } from '@/config/theme.config';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { esES } from '@mui/x-data-grid/locales';

type FormData = {
  startDate: string;
  endDate: string;
};

const ListaPedidos: React.FC = () => {
  const { handleSubmit, control, formState: { errors }, getValues, trigger } = useForm<FormData>();

  const buttonStyle = {
    background: themePalette.primary,
    textTransform: 'none',
    borderRadius: '20px',
  };

  // Función para manejar el filtro por fechas
  const handleFilter = async () => {
    const isValid = await trigger(["startDate", "endDate"]);
    if (isValid) {
      const { startDate, endDate } = getValues();
      console.log(`Filtrando desde: ${startDate} hasta: ${endDate}`);
      // Lógica para aplicar el filtro en el DataGrid
    }
  };

  // Reutilizar lógica para renderizar TextField
  const renderTextField = (name: keyof FormData, label: string, type: string = "text", rules: any = {}) => (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      rules={rules}
      render={({ field }) => (
        <TextField
          {...field}
          type={type}
          label={label}
          variant="outlined"
          fullWidth
          InputLabelProps={{ shrink: true }}
          error={!!errors[name]}
          helperText={errors[name]?.message}
        />
      )}
    />
  );

  // Columnas de la tabla
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', minWidth: 30, flex: 0.5 },
    { field: 'date', headerName: 'Fecha', minWidth: 100, flex: 1 },
    { field: 'client', headerName: 'Cliente', minWidth: 150, flex: 1.5 },
    { field: 'products', headerName: 'Productos', minWidth: 150, flex: 1.5 },
    { field: 'quantity', headerName: 'Cantidad', minWidth: 80, flex: 1 },
    { field: 'price', headerName: 'Precio', minWidth: 80, flex: 1 },
    { field: 'total', headerName: 'Total', minWidth: 80, flex: 1 },
    { field: 'status', headerName: 'Estado', minWidth: 120, flex: 1 },
    { field: 'delivery', headerName: 'Tipo de Entrega', minWidth: 120, flex: 1 },
    {
      field: 'details',
      headerName: 'Detalles',
      minWidth: 70,
      flex: 0.5,
      renderCell: () => (
        <Button
          sx={{ color: themePalette.primary}}
          startIcon={<VisibilityIcon />}
        />
      ),
    },
  ];
  

  // Datos de ejemplo
  const rows = [
    { id: 1, date: '2024-10-18', client: 'Juan Pérez', products: 'Producto 1, Producto 2', quantity: 5, price: '$50', total: '$250', status: 'Enviado', delivery: 'Domicilio' },
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
        Pedidos
      </Typography>

      <Grid2 container alignItems="center" spacing={2} sx={{ mb: 4, justifyContent: 'right' }}>
        <Grid2 size={{ xs: 12, sm: 2 }}>
          {renderTextField("startDate", "Fecha de inicio", "date", {
            required: "La fecha de inicio es requerida",
            validate: (value: string) => {
              const endDate = getValues('endDate');
              return endDate && value > endDate ? "La fecha de inicio no puede ser posterior a la fecha de fin" : true;
            }
          })}
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 2 }}>
          {renderTextField("endDate", "Fecha de fin", "date", {
            required: "La fecha de fin es requerida",
            validate: (value: string) => {
              const startDate = getValues('startDate');
              return startDate && value < startDate ? "La fecha de fin no puede ser anterior a la fecha de inicio" : true;
            }
          })}
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 1.5 }}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleFilter}
            sx={buttonStyle}
          >
            Filtrar
          </Button>
        </Grid2>
      </Grid2>

      <div style={{ height: 400, width: '100%' }}>
        <DataGrid  localeText={esES.components.MuiDataGrid.defaultProps.localeText}
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
      </div>
    </Box>
  );
};

export default ListaPedidos;
