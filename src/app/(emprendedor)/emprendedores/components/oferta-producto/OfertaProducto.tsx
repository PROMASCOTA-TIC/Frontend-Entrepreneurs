"use client";
import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Typography,
  Button,
  IconButton,
  InputAdornment,
  Grid2,
} from '@mui/material';
import {  DataGrid,GridToolbarContainer, GridToolbarExport, GridToolbarFilterButton, GridToolbarQuickFilter, GridColDef } from '@mui/x-data-grid';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { useForm, Controller } from 'react-hook-form';
import { themePalette } from '@/config/theme.config';
import { esES } from '@mui/x-data-grid/locales';

const typographyStyle = {
  fontSize: '18px',
  fontWeight: 'bold',
};

const buttonStyle = {
  background: themePalette.primary,
  color: themePalette.cwhite,
  borderRadius: '20px',
  textTransform: 'none',
  width: '100px',
  height: '34px',
};

type Offer = {
  id: string;
  productName: string;
  startDate: string;
  endDate: string;
  originalPrice: number;
  discountPercentage: number;
  discountedPrice: number;
};

type OfertaProductoProps = {
  open: boolean;
  onClose: () => void;
};

const OfertaProducto: React.FC<OfertaProductoProps> = ({ open, onClose }) => {
  const { control, handleSubmit, reset, watch, formState: { errors } } = useForm({
    defaultValues: {
      productName: '',
      startDate: dayjs(),
      endDate: dayjs(),
      originalPrice: 0,
      discountPercentage: 0,
    },
  });

  const originalPrice = watch('originalPrice');
  const discountPercentage = watch('discountPercentage');
  const discountedPrice = originalPrice - (originalPrice * discountPercentage) / 100;

  const [offers, setOffers] = useState<Offer[]>([]);

  const onSubmit = (data: any) => {
    const newOffer: Offer = {
      id: (offers.length + 1).toString(),
      productName: data.productName,
      startDate: data.startDate.format('YYYY-MM-DD'),
      endDate: data.endDate.format('YYYY-MM-DD'),
      originalPrice: data.originalPrice,
      discountPercentage: data.discountPercentage,
      discountedPrice: discountedPrice,
    };
    setOffers([...offers, newOffer]);
    reset();
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'productName', headerName: 'Nombre del producto', width: 200 },
    { field: 'startDate', headerName: 'Fecha inicio', width: 150 },
    { field: 'endDate', headerName: 'Fecha fin', width: 150 },
    { field: 'originalPrice', headerName: 'Precio original', width: 150, valueFormatter: ({ value }) => `$${value.toFixed(2)}` },
    { field: 'discountPercentage', headerName: 'Porcentaje descuento', width: 180 },
    { field: 'discountedPrice', headerName: 'Precio promocion', width: 180, valueFormatter: ({ value }) => `$${value.toFixed(2)}` },
    {
      field: 'edit',
      headerName: 'Editar',
      width: 100,
      renderCell: () => <Button>Editar</Button>,
    },
    {
      field: 'delete',
      headerName: 'Eliminar',
      width: 100,
      renderCell: () => <Button>Eliminar</Button>,
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
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '24px',
          color: themePalette.cwhite,
          fontWeight: 'bold',
          backgroundColor: themePalette.primary,
        }}
      >
        Lista de ofertas
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: themePalette.cwhite,
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Formulario */}
          <Grid2 container spacing={2}>
            {/* Campos del formulario */}
            {/* Similar al código original */}
          </Grid2>

          <DialogActions sx={{ display: 'flex', justifyContent: 'center', gap: '23px' }}>
            <Button sx={buttonStyle} onClick={onClose}>
              Cancelar
            </Button>
            <Button sx={buttonStyle} type="submit">
              Guardar
            </Button>
          </DialogActions>
        </form>

        {/* Tabla de ofertas ingresadas */}
        <Typography sx={{ color: themePalette.primary, marginBottom: 2, fontSize: '24px', fontWeight: 'bold' }}>
          Ofertas ingresadas
        </Typography>
        <div style={{ height: 400, width: '100%' }}>
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
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Componente padre que controla el estado del diálogo
const OfertaProductos: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Button onClick={() => setOpen(true)}>Ver lista de ofertas</Button>
      <OfertaProducto open={open} onClose={() => setOpen(false)} />
    </div>
  );
};

export default OfertaProductos;
