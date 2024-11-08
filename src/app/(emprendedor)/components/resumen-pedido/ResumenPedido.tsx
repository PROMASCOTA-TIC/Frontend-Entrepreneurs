import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';
import { themePalette } from '@/config/theme.config';
import { DataGrid, GridToolbarContainer, GridToolbarExport, GridToolbarFilterButton, GridToolbarQuickFilter, GridColDef } from '@mui/x-data-grid';
import { esES } from '@mui/x-data-grid/locales';

interface DetallesPedidoProps {
  open: boolean;
  onClose: () => void;
  orderData: {
    id: number;
    client: string;
    orderNumber: string;
    date: string;
    total: string;
    paymentStatus: string;
    paymentMethod: string;
    deliveryType: string;
    sector: string;
    address: string;
    items: Array<{ id: number; name: string; description: string; category: string; subcategory: string; quantity: number; price: string }>;
  } | null;
}

const DetallesPedido: React.FC<DetallesPedidoProps> = ({ open, onClose, orderData }) => {
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', minWidth: 50, flex: 0.5 },
    { field: 'name', headerName: 'Nombre', minWidth: 150, flex: 1 },
    { field: 'description', headerName: 'Descripción', minWidth: 200, flex: 1.5 },
    { field: 'category', headerName: 'Categoría', minWidth: 100, flex: 1 },
    { field: 'subcategory', headerName: 'Subcategoría', minWidth: 100, flex: 1 },
    { field: 'quantity', headerName: 'Cantidad', minWidth: 80, flex: 0.5 },
    { field: 'price', headerName: 'Precio', minWidth: 80, flex: 0.5 },
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

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ backgroundColor: themePalette.primary, color: themePalette.cwhite, textAlign: 'center' }}>
        Pedido #{orderData?.orderNumber || 'Cargando...'}
        <IconButton onClick={onClose} sx={{ color: themePalette.cwhite, position: 'absolute', right: 8 }}>
          <Close />
        </IconButton>
      </DialogTitle>
      
      <DialogContent dividers>
        {orderData ? (
          <>
            <Box sx={{ mb: 1 }}>
              <Typography sx={{ fontWeight: 'bold', mb: 1, textAlign: 'left', fontSize: '24px' }}>Resumen</Typography>
              <Box sx={{ textAlign: 'left', color: themePalette.black }}>
                <Typography sx={{fontSize:'18px'}}><strong>Comprador:</strong> {orderData.client}</Typography>
                <Typography sx={{fontSize:'18px'}}><strong>Fecha:</strong> {orderData.date}</Typography>
                <Typography sx={{fontSize:'18px'}}><strong>Total:</strong> {orderData.total}</Typography>
                <Typography sx={{fontSize:'18px'}}><strong>Estado del pago:</strong> {orderData.paymentStatus}</Typography>
                <Typography sx={{fontSize:'18px'}}><strong>Método de pago:</strong> {orderData.paymentMethod}</Typography>
                <Typography sx={{fontSize:'18px'}}><strong>Tipo de entrega:</strong> {orderData.deliveryType}</Typography>
                <Typography sx={{fontSize:'18px'}}><strong>Sector:</strong> {orderData.sector}</Typography>
                <Typography sx={{fontSize:'18px'}}><strong>Dirección:</strong> {orderData.address}</Typography>
              </Box>
            </Box>

            <Box sx={{ height: 300, width: '100%' }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>Items</Typography>
              <DataGrid
                localeText={esES.components.MuiDataGrid.defaultProps.localeText}
                rows={orderData.items}
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
          </>
        ) : (
          <Typography>Cargando detalles del pedido...</Typography>
        )}
      </DialogContent>
      
      <DialogActions sx={{ justifyContent: 'center', gap:'30px' }}>
        <Button onClick={onClose} variant="outlined" sx={{background:themePalette.primary, color:themePalette.cwhite, textTransform:'none', fontSize:'18px', borderRadius:'20px', width:'100px'}}>Cerrar</Button>
        <Button variant="contained" sx={{background:themePalette.primary, color:themePalette.cwhite, textTransform:'none', fontSize:'18px', borderRadius:'20px', width:'100px'}}>Enviado</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DetallesPedido;
