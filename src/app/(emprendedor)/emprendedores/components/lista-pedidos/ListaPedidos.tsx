"use client";
import React from 'react';
import { Box, Typography, TextField, Button, Table, TableBody, TableCell, TableHead, TableRow, Grid2, TableContainer, Paper, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useForm, Controller } from 'react-hook-form';
import { themePalette } from '@/config/theme.config';

type FormData = {
  startDate: string;
  endDate: string;
  clientName: string;
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
    }
  };

  // Función para buscar por nombre de cliente
  const handleClientSearch = async () => {
    const isValid = await trigger("clientName");
    if (isValid) {
      const { clientName } = getValues();
      console.log(`Buscando cliente: ${clientName}`);
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

  return (
    <Box sx={{ padding: 3 }}>
      <Typography align="left" gutterBottom sx={{ color: '#004040', fontWeight: 'bold', fontSize: '34px' }}>
        Pedidos
      </Typography>

      <Grid2 container alignItems="center" spacing={2} sx={{ mb: 4, justifyContent: 'space-between' }}>
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
        <Grid2 size={{ xs: 13, sm: 1.5 }}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            startIcon={<SearchIcon />}
            onClick={handleFilter}
            sx={buttonStyle}
          >
            Filtrar
          </Button>
        </Grid2>

        <Grid2 size={{ xs: 12, sm: 3 }}>
          {renderTextField("clientName", "Nombre del cliente", "text", { required: "El nombre del cliente es requerido" })}
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 1.5 }}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            startIcon={<SearchIcon />}
            onClick={handleClientSearch}
            sx={buttonStyle}
          >
            Buscar
          </Button>
        </Grid2>
      </Grid2>

      <Grid2 container spacing={2}>
        <Grid2 size={{ xs: 12 }}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Fecha</TableCell>
                  <TableCell>Cliente</TableCell>
                  <TableCell>Productos</TableCell>
                  <TableCell>Cantidad</TableCell>
                  <TableCell>Precio</TableCell>
                  <TableCell>Total</TableCell>
                  <TableCell>Estado</TableCell>
                  <TableCell>Tipo de Entrega</TableCell>
                  <TableCell>Detalles</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>1</TableCell>
                  <TableCell>2024-10-18</TableCell>
                  <TableCell>Juan Pérez</TableCell>
                  <TableCell>Producto 1, Producto 2</TableCell>
                  <TableCell>5</TableCell>
                  <TableCell>$50</TableCell>
                  <TableCell>$250</TableCell>
                  <TableCell>Enviado</TableCell>
                  <TableCell>Domicilio</TableCell>
                  <TableCell>
                    <IconButton sx={{color:themePalette.primary}}>
                      <VisibilityIcon />
                    </IconButton>
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

export default ListaPedidos;
