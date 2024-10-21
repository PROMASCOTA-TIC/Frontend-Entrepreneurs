"use client";
import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  IconButton,
  InputAdornment,
  Grid2,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { useForm, Controller } from 'react-hook-form';
import { themePalette } from '@/config/theme.config';

// Estilos reutilizables
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
  const startDate = watch('startDate');
  const endDate = watch('endDate');
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
          <Grid2 container spacing={2}>
            {/* Nombre del producto */}
            <Grid2
            size={{xs:12}}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Typography sx={{ flexBasis: '25%', ...typographyStyle }}>
                  Nombre producto:
                </Typography>
                <Controller
                  name="productName"
                  control={control}
                  rules={{ required: 'El nombre del producto es requerido' }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      placeholder="Buscar productos"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <SearchIcon />
                          </InputAdornment>
                        ),
                      }}
                      error={!!errors.productName}
                      helperText={errors.productName?.message}
                      sx={{ flexBasis: '75%' }}
                    />
                  )}
                />
              </div>
            </Grid2>

            {/* Fecha inicio */}
            <Grid2
            size={{xs:12}}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Typography sx={{ flexBasis: '25%', ...typographyStyle }}>
                  Fecha inicio:
                </Typography>
                <Controller
                  name="startDate"
                  control={control}
                  rules={{ required: 'La fecha de inicio es requerida' }}
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label="Desde"
                        value={value}
                        onChange={onChange}
                        slotProps={{
                          textField: {
                            error: !!error,
                            helperText: error ? error.message : null,
                          },
                        }}
                      />
                    </LocalizationProvider>
                  )}
                />
              </div>
            </Grid2>

            {/* Fecha fin */}
            <Grid2 
            size={{xs:12}}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Typography sx={{ flexBasis: '25%', ...typographyStyle }}>
                  Fecha fin:
                </Typography>
                <Controller
                  name="endDate"
                  control={control}
                  rules={{
                    required: 'La fecha de fin es requerida',
                    validate: (value) =>
                      dayjs(value).isAfter(dayjs(startDate)) ||
                      'La fecha fin debe ser después de la fecha de inicio',
                  }}
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label="Hasta"
                        value={value}
                        onChange={onChange}
                        slotProps={{
                          textField: {
                            error: !!error,
                            helperText: error ? error.message : null,
                          },
                        }}
                      />
                    </LocalizationProvider>
                  )}
                />
              </div>
            </Grid2>

            {/* Precio original - Campo no editable */}
            <Grid2
            size={{xs:12}}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Typography sx={{ flexBasis: '25%', ...typographyStyle }}>
                  Precio:
                </Typography>
                <Typography variant="body1" sx={{ flexBasis: '75%' }}>
                  ${originalPrice.toFixed(2)}
                </Typography>
              </div>
            </Grid2>

            {/* Porcentaje de descuento */}
            <Grid2 
            size={{xs:12}}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Typography sx={{ flexBasis: '25%', ...typographyStyle }}>
                  Porcentaje descuento:
                </Typography>
                <Controller
                  name="discountPercentage"
                  control={control}
                  rules={{
                    required: 'El porcentaje de descuento es requerido',
                    min: { value: 0, message: 'El porcentaje no puede ser menor a 0' },
                    max: { value: 100, message: 'El porcentaje no puede ser mayor a 100' },
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Ingresar"
                      type="number"
                      error={!!errors.discountPercentage}
                      helperText={errors.discountPercentage?.message}
                      sx={{ flexBasis: '30%' }}
                    />
                  )}
                />
              </div>
            </Grid2>

            {/* Precio con descuento */}
            <Grid2
            size={{xs:12}}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Typography sx={{ flexBasis: '25%', ...typographyStyle }}>
                  Precio con descuento:
                </Typography>
                <Typography variant="body1" sx={{ flexBasis: '75%' }}>
                  ${discountedPrice.toFixed(2)}
                </Typography>
              </div>
            </Grid2>
          </Grid2>

          <DialogActions
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '23px' }}
          >
            <Button sx={buttonStyle} onClick={onClose}>
              Cancelar
            </Button>
            <Button sx={buttonStyle} type="submit">
              Guardar
            </Button>
          </DialogActions>
        </form>

        {/* Tabla de ofertas ingresadas */}
        <Typography 
        sx={{
            color: themePalette.primary,
            marginBottom: 2,
            fontSize: '24px',
            fontWeight: 'bold'
        }}>
          Ofertas ingresadas
        </Typography>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: themePalette.black10 }}>
              <TableCell>ID</TableCell>
              <TableCell>Nombre del producto</TableCell>
              <TableCell>Fecha inicio</TableCell>
              <TableCell>Fecha fin</TableCell>
              <TableCell>Precio original</TableCell>
              <TableCell>Porcentaje descuento</TableCell>
              <TableCell>Precio promocion</TableCell>
              <TableCell>Editar</TableCell>
              <TableCell>Eliminar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {offers.map((offer) => (
              <TableRow key={offer.id}>
                <TableCell>{offer.id}</TableCell>
                <TableCell>{offer.productName}</TableCell>
                <TableCell>{offer.startDate}</TableCell>
                <TableCell>{offer.endDate}</TableCell>
                <TableCell>${offer.originalPrice.toFixed(2)}</TableCell>
                <TableCell>{offer.discountPercentage}%</TableCell>
                <TableCell>${offer.discountedPrice.toFixed(2)}</TableCell>
                <TableCell>
                  <Button>Editar</Button>
                </TableCell>
                <TableCell>
                  <Button>Eliminar</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DialogContent>
    </Dialog>
  );
};

// Componente padre que controla el estado del diálogo
const ComponentePadre: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Button onClick={() => setOpen(true)}>Ver lista de ofertas</Button>
      <OfertaProducto open={open} onClose={() => setOpen(false)} />
    </div>
  );
};

export default ComponentePadre;
