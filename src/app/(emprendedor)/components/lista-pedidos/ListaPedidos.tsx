"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, Button, Grid2 } from '@mui/material';
import { DataGrid, GridToolbarContainer, GridToolbarExport, GridToolbarFilterButton, GridToolbarQuickFilter, GridColDef } from '@mui/x-data-grid';
import { useForm, Controller } from 'react-hook-form';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { themePalette } from '@/config/theme.config';
import ResumenPedido from '../resumen-pedido/ResumenPedido';
import { esES } from '@mui/x-data-grid/locales';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

type FormData = {
  startDate: Dayjs | null;
  endDate: Dayjs | null;
};

const ListaPedidos: React.FC = () => {
  const { handleSubmit, control, formState: { errors }, getValues, trigger } = useForm<FormData>({
    defaultValues: {
      startDate: null,
      endDate: null,
    },
  });

  const [openModal, setOpenModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const entrepreneurId = "a9201395-3f2f-42e4-bca0-9506ee84167b"; // 🔥 Luego cambiar a localStorage

  // 🔥 Función para obtener órdenes del backend
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/products/${entrepreneurId}/orders-total`);
        if (response.data && response.data.orders) {
          const formattedOrders = response.data.orders.map((order: any) => ({
            id: order.id.substring(0, 8), 
            date: dayjs(order.createdAt).format('DD/MM/YYYY'), 
            client: order.buyer?.name || 'N/A', 
            products: order.totalItems,  
            quantity: order.totalItems, 
            total: `$${order.total.toFixed(2)}`, // 🔥 Total de la orden
            status: order.isPaid ? "Pagado" : "No Pagado", // 🔥 Estado de pago
            delivery: order.homeDelivery ? "Domicilio" : "Retiro en Tienda", // 🔥 Tipo de entrega
          }));
          setOrders(formattedOrders);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, []);

  const handleFilter = async () => {
    const isValid = await trigger(["startDate", "endDate"]);
    if (isValid) {
      const { startDate, endDate } = getValues();
      console.log(`Filtrando desde: ${startDate?.format('DD/MM/YYYY')} hasta: ${endDate?.format('DD/MM/YYYY')}`);
      // Lógica para aplicar el filtro en el DataGrid
    }
  };

  const handleOpenModal = (orderData: any) => {
    setSelectedOrder(orderData);
    setOpenModal(true);
  };

  // 🔥 Definición de las columnas del DataGrid (SE ELIMINÓ `price`)
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', minWidth: 30, flex: 0.5 },
    { field: 'date', headerName: 'Fecha', minWidth: 100, flex: 1 },
    { field: 'client', headerName: 'Cliente', minWidth: 150, flex: 1.5 },
    { field: 'products', headerName: 'Items', minWidth: 150, flex: 1.5 },
    { field: 'quantity', headerName: 'Cantidad', minWidth: 80, flex: 1 },
    { field: 'total', headerName: 'Total', minWidth: 80, flex: 1 },
    { field: 'status', headerName: 'Estado', minWidth: 120, flex: 1 },
    { field: 'delivery', headerName: 'Tipo de Entrega', minWidth: 120, flex: 1 },
    {
      field: 'details',
      headerName: 'Detalles',
      minWidth: 70,
      flex: 0.5,
      renderCell: (params) => (
        <Button
          onClick={() => handleOpenModal(params.row)}
          sx={{ color: themePalette.primary }}
          startIcon={<VisibilityIcon />}
        />
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

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Typography
        sx={{
          marginBottom: '20px',
          textAlign: 'left',
          fontSize: '24px',
          fontWeight: 'bold',
          color: themePalette.primary,
          padding: '15px',
        }}
      >
        Lista de pedidos
      </Typography>

      <Grid2 container spacing={2} alignItems="center" justifyContent="flex-end">
        <Grid2 size={{ xs: 12, sm: 4, md: 2.09 }}>
          <Controller
            name="startDate"
            control={control}
            rules={{ required: "La fecha de inicio es obligatoria" }}
            render={({ field }) => (
              <>
                <DatePicker {...field} label="Fecha de inicio" format="DD/MM/YYYY" sx={{ width: "100%" }} />
                {errors.startDate && <Typography color="error">{errors.startDate.message}</Typography>}
              </>
            )}
          />
        </Grid2>

        <Grid2 size={{ xs: 12, sm: 4, md: 2 }}>
          <Controller
            name="endDate"
            control={control}
            rules={{ required: "La fecha de fin es obligatoria" }}
            render={({ field }) => (
              <>
                <DatePicker {...field} label="Fecha de fin" format="DD/MM/YYYY" sx={{ width: "100%" }} />
                {errors.endDate && <Typography color="error">{errors.endDate.message}</Typography>}
              </>
            )}
          />
        </Grid2>

        <Grid2 size={{ xs: 12, sm: 4, md: 1 }}>
          <Button variant="contained" color="primary" onClick={handleSubmit(handleFilter)} sx={{ borderRadius: '20px', width: '100%', mr: 2 }}>
            Filtrar
          </Button>
        </Grid2>
      </Grid2>

      <Box sx={{ height: 400, width: "100%", marginTop: "30px" }}>
        <DataGrid rows={orders} columns={columns} pageSizeOptions={[5, 10, 25]} slots={{ toolbar: CustomToolbar }} />
        <ResumenPedido open={openModal} onClose={() => setOpenModal(false)} orderData={selectedOrder} />
      </Box>
    </LocalizationProvider>
  );
};

export default ListaPedidos;
