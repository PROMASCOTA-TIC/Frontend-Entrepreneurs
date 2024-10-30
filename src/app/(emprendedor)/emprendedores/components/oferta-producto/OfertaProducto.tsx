import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, Button, Typography, TextField, Box, IconButton,Grid2 } from '@mui/material';
import { Close } from '@mui/icons-material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DataGrid, GridToolbarContainer, GridToolbarExport, GridToolbarFilterButton, GridToolbarQuickFilter, GridColDef } from '@mui/x-data-grid';
import { useForm, Controller } from 'react-hook-form';
import dayjs from 'dayjs';
import { esES } from '@mui/x-data-grid/locales';
import { themePalette } from '@/config/theme.config';
import { Edit, Delete } from '@mui/icons-material';

interface OfertaProductoProps {
  open: boolean;
  onClose: () => void;
}

const OfertaProducto: React.FC<OfertaProductoProps> = ({ open, onClose }) => {
  const [precioActual, setPrecioActual] = useState(100);
  const [precioConDescuento, setPrecioConDescuento] = useState(0);

  const { control, handleSubmit, watch, formState: { errors } } = useForm();
  const startDate = watch('startDate');

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', minWidth: 70, flex: 0.5 },
    { field: 'producto', headerName: 'Producto', minWidth: 150, flex: 1 },
    { field: 'fechaInicio', headerName: 'Fecha Inicio', minWidth: 150, flex: 1 },
    { field: 'fechaFin', headerName: 'Fecha Fin', minWidth: 150, flex: 1 },
    { field: 'precio', headerName: 'Precio', minWidth: 100, flex: 0.75 },
    { field: 'porcentajeDescuento', headerName: 'Descuento', minWidth: 150, flex: 1 },
    { field: 'precioPromocion', headerName: 'Precio Promoción', minWidth: 150, flex: 1 },
    {
      field: 'editar',
      headerName: 'Editar',
      minWidth: 90,
      flex: 0.5,
      renderCell: () => (
        <IconButton sx={{color:themePalette.primary}}>
          <Edit />
        </IconButton>
      ),
    },
    {
      field: 'eliminar',
      headerName: 'Eliminar',
      minWidth: 100,
      flex: 0.5,
      renderCell: () => (
        <IconButton color="error">
          <Delete />
        </IconButton>
      ),
    },
  ];
  
  const rows = [
    {
      id: 1,
      producto: 'Producto 1',
      fechaInicio: '2024-10-01',
      fechaFin: '2024-10-15',
      precio: '$100',
      porcentajeDescuento: '10%',
      precioPromocion: '$90',
    },
  ];

  const onSubmit = (data: any) => {
    console.log(data);
  };

  const CustomToolbar = () => (
    <GridToolbarContainer sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <div>
        <GridToolbarFilterButton />
        <GridToolbarExport />
      </div>
      <GridToolbarQuickFilter debounceMs={500} sx={{ marginLeft: 'auto' }} />
    </GridToolbarContainer>
  );

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
    <DialogTitle
      sx={{
        backgroundColor: themePalette.primary,
        color: themePalette.cwhite,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
      }}
    >
      <Typography sx={{ fontWeight: 'bold', fontSize: '36px', textAlign: 'center' }}>
        Lista de ofertas
      </Typography>
      <IconButton
        onClick={onClose}
        sx={{ color: themePalette.cwhite, position: 'absolute', right: 8 }}
      >
        <Close />
      </IconButton>
    </DialogTitle>

      <DialogContent dividers>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Box component="form" onSubmit={handleSubmit(onSubmit)} display="flex" flexDirection="column" alignItems="center" gap={2}>
            <Grid2 container spacing={2} justifyContent="right" alignItems="center">
              <Grid2 size={{ xs: 12, sm: 4 }}>
                <Typography align="right" sx={{ fontSize: '24px', fontWeight: '600', color: themePalette.primary }}>
                  Nombre de producto:
                </Typography>
              </Grid2>
              <Grid2 size={{ xs: 12, sm: 8 }}>
                <Controller
                  name="producto"
                  control={control}
                  rules={{ required: "El nombre del producto es obligatorio" }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      sx={{ maxWidth: '400px' }}
                      error={Boolean(errors.producto)}
                      helperText={errors.producto ? String(errors.producto.message) : ''}
                    />
                  )}
                />
              </Grid2>

              <Grid2 size={{ xs: 12, sm: 4 }}>
                <Typography align="right" sx={{ fontSize: '24px', fontWeight: '600', color: themePalette.primary }}>
                  Fecha de inicio:
                </Typography>
              </Grid2>
              <Grid2 size={{ xs: 12, sm: 8 }}>
                <Controller
                  name="startDate"
                  control={control}
                  rules={{ required: "La fecha de inicio es obligatoria" }}
                  render={({ field }) => (
                    <>
                      <DatePicker
                        {...field}
                        format="DD/MM/YYYY"
                        onChange={(date) => field.onChange(date)}
                        slotProps={{ textField: { fullWidth: true, sx: { maxWidth: '180px' }, error: Boolean(errors.startDate) } }}
                      />
                      {errors.startDate && (
                        <Typography color="error" variant="body2">
                          {String(errors.startDate.message)}
                        </Typography>
                      )}
                    </>
                  )}
                />
              </Grid2>

              <Grid2 size={{ xs: 12, sm: 4 }}>
                <Typography align="right" sx={{ fontSize: '24px', fontWeight: '600', color: themePalette.primary }}>
                  Fecha de fin:
                </Typography>
              </Grid2>
              <Grid2 size={{ xs: 12, sm: 8 }}>
                <Controller
                  name="endDate"
                  control={control}
                  rules={{
                    required: "La fecha de fin es obligatoria",
                    validate: (value) =>
                      startDate && dayjs(value).isAfter(dayjs(startDate)) ||
                      "La fecha de fin no puede ser anterior a la fecha de inicio",
                  }}
                  render={({ field }) => (
                    <>
                      <DatePicker
                        {...field}
                        format="DD/MM/YYYY"
                        onChange={(date) => field.onChange(date)}
                        minDate={startDate || undefined}
                        slotProps={{ textField: { fullWidth: true, sx: { maxWidth: '180px' }, error: Boolean(errors.endDate) } }}
                      />
                      {errors.endDate && (
                        <Typography color="error" variant="body2">
                          {String(errors.endDate.message)}
                        </Typography>
                      )}
                    </>
                  )}
                />
              </Grid2>

              <Grid2 size={{ xs: 12, sm: 4 }}>
                <Typography align="right" sx={{ fontSize: '24px', fontWeight: '600', color: themePalette.primary }}>
                  Precio actual:
                </Typography>
              </Grid2>
              <Grid2 size={{ xs: 12, sm: 8 }}>
                <TextField
                  value={`$${precioActual}`}
                  InputProps={{ readOnly: true }}
                  fullWidth
                  sx={{ maxWidth: '100px' }}
                />
              </Grid2>

              <Grid2 size={{ xs: 12, sm: 4 }}>
                <Typography align="right" sx={{ fontSize: '24px', fontWeight: '600', color: themePalette.primary }}>
                  Porcentaje de descuento:
                </Typography>
              </Grid2>
              <Grid2 size={{ xs: 12, sm: 8 }}>
                <Controller
                  name="porcentajeDescuento"
                  control={control}
                  rules={{ required: "El porcentaje de descuento es obligatorio" }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      type="number"
                      fullWidth
                      sx={{ maxWidth: '110px' }}
                      error={Boolean(errors.porcentajeDescuento)}
                      helperText={errors.porcentajeDescuento ? String(errors.porcentajeDescuento.message) : ''}
                    />
                  )}
                />
              </Grid2>

              <Grid2 size={{ xs: 12, sm: 4 }}>
                <Typography align="right" sx={{ fontSize: '24px', fontWeight: '600', color: themePalette.primary }}>
                  Precio con descuento:
                </Typography>
              </Grid2>
              <Grid2 size={{ xs: 12, sm: 8 }}>
                <TextField
                  value={`$${precioConDescuento.toFixed(2)}`}
                  InputProps={{ readOnly: true }}
                  fullWidth
                  sx={{ maxWidth: '100px' }}
                />
              </Grid2>
            </Grid2>

            <Box display="flex" justifyContent="center" gap={2} mt={2}>
              <Button onClick={onClose} variant="outlined" sx={{ textTransform: 'none', background: themePalette.primary, color: themePalette.cwhite }}>
                Cancelar
              </Button>
              <Button variant="contained" type="submit" sx={{ textTransform: 'none', background: themePalette.primary, color: themePalette.cwhite }}>
                Guardar
              </Button>
            </Box>

            <Box sx={{ height: 300, width: '100%' }}>
              <DataGrid
                localeText={esES.components.MuiDataGrid.defaultProps.localeText}
                rows={rows}
                columns={columns}
                initialState={{ pagination: { paginationModel: { pageSize: 5 } } }}
                pageSizeOptions={[5, 10, 25]}
                slots={{ toolbar: CustomToolbar }}
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
          </Box>
        </LocalizationProvider>
      </DialogContent>
    </Dialog>
  );
};

export default OfertaProducto;
