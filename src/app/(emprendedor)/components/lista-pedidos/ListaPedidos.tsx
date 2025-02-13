"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, IconButton, CircularProgress } from "@mui/material";
import { DataGrid, GridColDef, GridToolbarContainer, GridToolbarExport, GridToolbarFilterButton, GridToolbarQuickFilter } from "@mui/x-data-grid";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Close } from "@mui/icons-material";
import { themePalette } from "@/config/theme.config";
import { esES } from "@mui/x-data-grid/locales";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { URL_BASE, URL_BASE2 } from "@/config/config";

const ListaPedidos: React.FC = () => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [entrepreneurId, setEntrepreneurId] = useState<string | null>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const storedEntrepreneurId = localStorage.getItem("entrepreneur_id");
    if (storedEntrepreneurId) {
      setEntrepreneurId(storedEntrepreneurId);
    } else {
      console.warn("No se encontró el ID del emprendedor en localStorage.");
    }
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {

      if (!entrepreneurId) return;

      try {
        const response = await axios.get(`${URL_BASE}products/${entrepreneurId}/orders-total`);
        if (response.data && response.data.orders) {
          const formattedOrders = response.data.orders.map((order: any) => ({
            id: order.id,
            shortId: order.id.substring(0, 8),
            date: dayjs(order.createdAt).format("DD/MM/YYYY"),
            client: order.buyer?.name || "N/A",
            products: order.totalItems,
            quantity: order.totalItems,
            total: `$${Number(order.total || 0).toFixed(2)}`,
            status: order.isPaid ? "Pagado" : "No Pagado",
            delivery: order.homeDelivery ? "Domicilio" : "Retiro en Tienda",
            isDelivered: order.isDelivered, 
            rawData: order,
          }));
          setOrders(formattedOrders);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, [entrepreneurId]);

  const updateStock = async () => {
    if (!selectedOrder || selectedOrder.isDelivered) return;
  
    setLoading(true);
  
    try {
      const requests = selectedOrder.orderItems.map(async (item: any) => {
        const productId = item.itemId;
        const orderId = selectedOrder.id;
        const orderItemId = item.orderItemId;
        const quantitySold = Number(item.quantity);
        const productResponse = await axios.get(`${URL_BASE}products/${productId}`);
        const currentStock = Number(productResponse.data.stock ?? 0);
        
        if (isNaN(currentStock)) {
          throw new Error(`Valores inválidos en stock.`);
        }
  
  
        const newStock = Math.max(currentStock - quantitySold, 0);
        const newSoldQuantity = (item.soldQuantity ?? 0) + quantitySold;
        
        console.log(`📦 Producto ${productId} → Stock Actual: ${currentStock}, Nuevo Stock: ${newStock}`);
        console.log(`📊 Producto ${productId} → Vendidos Actuales: ${item.soldQuantity}, Nuevo SoldQuantity: ${newSoldQuantity}`);
  
        const stockPayload = { 
          stock: newStock, 
          soldQuantity: newSoldQuantity 
        };
  
        await axios.patch(`${URL_BASE}products/${productId}`, stockPayload, {
          headers: { "Content-Type": "application/json" },
        });
  
        await axios.patch(`${URL_BASE2}orders/${orderId}/item/${orderItemId}`, {}, {
          headers: { "Content-Type": "application/json" },
        });
      });
  
      await Promise.all(requests);
      console.log("✅ Todos los productos y estados de ítems fueron actualizados exitosamente.");
  
      setSelectedOrder((prevOrder: any) => ({
        ...prevOrder,
        isDelivered: true,
      }));
  
      setOrders(prevOrders =>
        prevOrders.map(order =>
          order.id === selectedOrder.id ? { ...order, isDelivered: true } : order
        )
      );
  
    } catch (error: any) {
      console.error("❌ Error en la actualización:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };
  

  
  const handleOpenModal = (orderData: any) => {
    setSelectedOrder(orderData.rawData);
    setOpenModal(true);
  };

  const columns: GridColDef[] = [
    { field: "shortId", headerName: "ID", minWidth: 30, flex: 0.5 },
    { field: "date", headerName: "Fecha", minWidth: 100, flex: 1 },
    { field: "client", headerName: "Cliente", minWidth: 150, flex: 1 },
    { field: "products", headerName: "Items", minWidth: 150, flex: 0.5 },
    { field: "quantity", headerName: "Cantidad", minWidth: 80, flex: 0.5 },
    { field: "total", headerName: "Total", minWidth: 80, flex: 0.8 },
    { field: "status", headerName: "Estado", minWidth: 120, flex: 1 },
    { field: "delivery", headerName: "Tipo de Entrega", minWidth: 120, flex: 1 },
    {
      field: "isDelivered",
      headerName: "Entregado",
      minWidth: 100,
      flex: 0.8,
      renderCell: (params) => (
        <Typography sx={{ color: params.row.isDelivered ? "green" : "red", paddingTop:"15px" }}>
          {params.row.isDelivered ? "Sí" : "No"}
        </Typography>
      ),
    },
    {
      field: "details",
      headerName: "Detalles",
      minWidth: 70,
      flex: 0.5,
      renderCell: (params) => (
        <Button onClick={() => handleOpenModal(params.row)} sx={{ color: themePalette.primary }} startIcon={<VisibilityIcon />} />
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
      <Typography sx={{ marginBottom: "20px", textAlign: "left", fontSize: "24px", fontWeight: "bold", color: themePalette.primary, padding: "15px" }}>
        Lista de Pedidos
      </Typography>

      <Box sx={{ height: 500, width: "100%", marginTop: "30px" }}>
        <DataGrid 
        localeText={esES.components.MuiDataGrid.defaultProps.localeText}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 20 },
          },
        }}
        rows={orders} columns={columns} pageSizeOptions={[5, 10, 25, 50, 100]} 
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
          fontSize: "16px",
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

      <Dialog open={openModal} onClose={() => setOpenModal(false)} maxWidth="lg" fullWidth disableAutoFocus >
        <DialogTitle sx={{ backgroundColor: themePalette.primary, color: themePalette.cwhite, textAlign: "center", fontSize: "26px", fontWeight: "bold", position: "relative" }}>
          Pedido #{selectedOrder?.id?.substring(0, 8) || "Cargando..."}
          <IconButton onClick={() => setOpenModal(false)} sx={{ color: themePalette.cwhite, position: "absolute", right: 8 }}>
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Typography sx={{fontSize:"26px",fontWeight: "bold" }}>Resumen</Typography>
          <Typography sx={{fontSize:"24px"}}><strong>Comprador:</strong> {selectedOrder?.buyer?.name || "N/A"}</Typography>
          <Typography sx={{fontSize:"24px"}}><strong>Teléfono:</strong> {selectedOrder?.buyer?.phoneNumber || "N/A"}</Typography>
          <Typography sx={{fontSize:"24px"}}><strong>Fecha:</strong> {dayjs(selectedOrder?.createdAt).format("DD/MM/YYYY")}</Typography> 
          <Typography sx={{fontSize:"24px"}}><strong>Total:</strong> ${selectedOrder?.total ? selectedOrder?.total.toFixed(2) : "0.00"}</Typography>
          <Typography sx={{fontSize:"24px"}}><strong>Total de Productos:</strong> {selectedOrder?.totalItems || 0}</Typography>
          <Typography sx={{fontSize:"24px"}}><strong>Estado del pago:</strong> {selectedOrder?.isPaid ? "Pagado" : "No Pagado"}</Typography>
          <Typography sx={{fontSize:"24px"}}><strong>Tipo de entrega:</strong> {selectedOrder?.homeDelivery ? "Domicilio" : "Retiro en Tienda"}</Typography>

          {selectedOrder?.homeDelivery && selectedOrder?.petOwnerAddress && (
            <Typography sx={{fontSize:"24px"}}><strong>Dirección de entrega:</strong> {selectedOrder.petOwnerAddress}</Typography>
          )}

          <Box sx={{ height: 300, width: "100%", marginTop: "20px" }}>
            <Typography  sx={{ fontSize:"24px",fontWeight: "bold", marginBottom: 1 }}>Productos de la Orden</Typography>
            <DataGrid
              localeText={esES.components.MuiDataGrid.defaultProps.localeText}
              rows={selectedOrder?.orderItems?.map((item: any) => ({
                id: item.orderItemId,
                name: item.name || "Sin nombre",
                itemId: item.itemId.substring(0, 8),
                quantity: item.quantity,
                price: `$${item.price.toFixed(2)}`,
                totalItem: `$${(item.quantity * item.price).toFixed(2)}`,
              })) || []}
              columns={[
                { field: "itemId", headerName: "ID Producto", minWidth: 150, flex: 0.5 },
                { field: "name", headerName: "Nombre", minWidth: 150, flex: 1.2 },
                { field: "quantity", headerName: "Cantidad", minWidth: 100, flex: 0.5 },
                { field: "price", headerName: "Precio Unitario", minWidth: 100, flex: 0.5 },
                { field: "totalItem", headerName: "Total", minWidth: 100, flex: 0.5 },
              ]}
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
                fontSize: "16px",
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
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center" }}>
          <Button variant="contained"  sx={{
              textTransform: "none",
              width: "213px",
              height: "34px",
              borderRadius: "20px",
              fontSize: "18px",
              background: themePalette.primary,
            }}
             onClick={() => setOpenModal(false)}>Cerrar</Button>
        <Button 
            variant="contained"
            disabled={selectedOrder?.isDelivered || loading} 
            onClick={updateStock}
            sx={{
              textTransform: "none",
              width: "213px",
              height: "34px",
              borderRadius: "20px",
              fontSize: "18px",
              background: themePalette.primary,
            }}
          >
            {loading ? <CircularProgress size={24}  /> : (selectedOrder?.isDelivered ? "Ya Entregado" : "Entregado")}
          </Button>
        </DialogActions>
      </Dialog>
    </LocalizationProvider>
  );
};

export default ListaPedidos;
