"use client";
import React, { useState } from 'react';
import { Box, Typography, Button,Grid2 } from '@mui/material';
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
      renderCell: (params) => (
        <Button
          onClick={() => handleOpenModal(params.row)}
          sx={{ color: themePalette.primary }}
          startIcon={<VisibilityIcon />}
        />
      ),
    },
  ];

  const rows = [
    { 
      id: 1, 
      date: '2024-10-18', 
      client: 'Juan Pérez', 
      orderNumber: '1234', 
      total: '$250', 
      paymentStatus: 'Pagado', 
      paymentMethod: 'Tarjeta', 
      deliveryType: 'Domicilio', 
      sector: 'Centro', 
      address: 'Av. Siempre Viva 123', 
      items: [
        { id: 1, name: 'Producto 1', description: 'Descripción 1', category: 'Categoria1', subcategory: 'Subcategoria', quantity: 2, price: '$150' }
      ] 
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
        <Typography align="left" gutterBottom sx={{ color: '#004040', fontWeight: 'bold', fontSize: '34px' }}>
          Pedidos
        </Typography>
        <Grid2 container spacing={2} alignItems="center" justifyContent="flex-end">
        <Grid2 size={{ xs: 12, sm: 4, md: 2.09 }}>
          <Controller
            name="startDate"
            control={control}
            rules={{ required: "La fecha de inicio es obligatoria" }}
            render={({ field }) => (
              <>
                <DatePicker
                  {...field}
                  label="Fecha de inicio"
                  format="DD/MM/YYYY"
                  onChange={(date) => field.onChange(date)}
                  sx={{ width: "100%" }}
                />
                {errors.startDate && (
                  <Typography color="error" variant="body2">
                    {errors.startDate.message}
                  </Typography>
                )}
              </>
            )}
          />
   </Grid2>

   <Grid2 size={{ xs: 12, sm: 4, md: 2 }}>
          <Controller
            name="endDate"
            control={control}
            rules={{
              required: "La fecha de fin es obligatoria",
              validate: (value) => {
                const startDate = getValues("startDate");
                return startDate && value && dayjs(value).isBefore(startDate) ? "La fecha de fin no puede ser anterior a la fecha de inicio" : true;
              },
            }}
            render={({ field }) => (
              <>
                <DatePicker
                  {...field}
                  label="Fecha de fin"
                  format="DD/MM/YYYY"
                  minDate={getValues("startDate") || undefined}
                  onChange={(date) => field.onChange(date)}
                  sx={{ width: "100%" }}
                />
                {errors.endDate && (
                  <Typography color="error" variant="body2">
                    {errors.endDate.message}
                  </Typography>
                )}
              </>
            )}
          />
 </Grid2>

 <Grid2 size={{ xs: 12, sm: 4, md: 1 }} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit(handleFilter)}
            sx={{ background: themePalette.primary, textTransform: 'none', borderRadius: '20px', width: '100%', mr: 2 }}
          >
            Filtrar
          </Button>
          </Grid2>
       </Grid2>
    
    <Box sx={{ height: 400, width: "100%", marginTop: "30px" }}>
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

        <ResumenPedido
          open={openModal}
          onClose={() => setOpenModal(false)}
          orderData={selectedOrder}
        />
      </Box>
    
    </LocalizationProvider>
  );
};

export default ListaPedidos;
