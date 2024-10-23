import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  IconButton,
  TableContainer,
  Grid2,
  Box,
  Paper
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { themePalette } from '@/config/theme.config';

// Tipo para los items del pedido
type OrderItem = {
  id: string;
  name: string;
  description: string;
  price: string;
  quantity: string;
  totalPrice: string;
};

// Tipos de propiedades que espera el componente ResumenPedido
type OrderSummaryProps = {
  open: boolean;
  onClose: () => void;
  orderNumber: string;
  buyer: string;
  orderDate: string;
  total: string;
  paymentStatus: string;
  paymentMethod: string;
  deliveryType: string;
  sector: string;
  address: string;
  items: OrderItem[];
  onDelivered: () => void;
};

// Componente ResumenPedido que mostrará el resumen del pedido en un diálogo
const ResumenPedido: React.FC<OrderSummaryProps> = ({
  open,
  onClose,
  orderNumber,
  buyer,
  orderDate,
  total,
  paymentStatus,
  paymentMethod,
  deliveryType,
  sector,
  address,
  items,
  onDelivered,
}) => {
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
        Pedido: #{orderNumber}
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
        <Typography 
        sx={{
            color: themePalette.primary,
            marginBottom: 2,
            fontSize: '24px',
            fontWeight: 'bold'
        }}
        >Resumen</Typography>
        
        {/* Distribución usando Grid */}
        <Grid2 container spacing={2} sx={{ marginBottom: 2, color: themePalette.primary, justifyContent: 'center' }}>
          <Grid2 size={{ xs: 6 }}>
            <Typography><strong>Comprador:</strong> {buyer}</Typography>
          </Grid2>
          <Grid2 size={{ xs: 6 }}>
            <Typography><strong>Total:</strong> {total}</Typography>
          </Grid2>
          <Grid2 size={{ xs: 6 }}>
            <Typography><strong>Número:</strong> {orderNumber}</Typography>
          </Grid2>
          <Grid2 size={{ xs: 6 }}>
            <Typography><strong>Fecha:</strong> {orderDate}</Typography>
          </Grid2>
          <Grid2 size={{ xs: 6 }}>
            <Typography><strong>Estado del pago:</strong> {paymentStatus}</Typography>
          </Grid2>
          <Grid2 size={{ xs: 6 }}>
            <Typography><strong>Método de pago:</strong> {paymentMethod}</Typography>
          </Grid2>
          <Grid2 size={{ xs: 6 }}>
            <Typography><strong>Tipo entrega:</strong> {deliveryType}</Typography>
          </Grid2>
          <Grid2 size={{ xs: 6 }}>
            <Typography><strong>Sector:</strong> {sector}</Typography>
          </Grid2>
          <Grid2 size={{ xs: 12 }}>
            <Typography><strong>Dirección:</strong> {address}</Typography>
          </Grid2>
        </Grid2>

        <Typography 
          sx={{
            color: themePalette.primary,
            fontSize: '24px',
            fontWeight: 'bold',
            marginTop: 2 
        }}
        >Items</Typography>

        {/* Hacer la tabla responsive */}
        <TableContainer component={Paper} sx={{ maxHeight: '300px' }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow
                sx={{
                  backgroundColor: themePalette.black10,
                }}
              >
                <TableCell>ID</TableCell>
                <TableCell>Nombre</TableCell>
                <TableCell>Descripción</TableCell>
                <TableCell>Precio</TableCell>
                <TableCell>Cantidad</TableCell>
                <TableCell>Precio Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.description}</TableCell>
                  <TableCell>{item.price}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{item.totalPrice}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
      <DialogActions
        sx={{
          display: 'flex',
          justifyContent: 'space-around',
          padding: 2,
        }}
      >
        <Button onClick={onClose} 
        sx={{
        background: themePalette.primary,
        color: themePalette.cwhite,
        borderRadius: '20px',
        textTransform: 'none',
        width: '100px',
        height: '34px',
        }}
        >
          Cerrar
        </Button>
        <Button onClick={onDelivered}
        sx={{
            background: themePalette.primary,
            color: themePalette.cwhite,
            borderRadius: '20px',
            textTransform: 'none',
            width: '100px',
            height: '34px',
            }}
        >
          Entregado
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ResumenPedido;
