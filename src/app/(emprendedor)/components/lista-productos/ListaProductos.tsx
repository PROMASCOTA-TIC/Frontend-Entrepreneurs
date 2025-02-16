"use client";

import React, { useEffect, useState } from "react";
import { Box, Typography, Button, Paper, IconButton, Dialog, DialogTitle, DialogContent, Snackbar } from "@mui/material";
import {DataGrid,GridToolbarContainer,GridToolbarExport,GridToolbarFilterButton,GridToolbarQuickFilter,GridColDef,} from "@mui/x-data-grid";
import VisibilityIcon from "@mui/icons-material/Visibility";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import Delete from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { themePalette } from "@/config/theme.config";
import { esES } from "@mui/x-data-grid/locales";
import OfertaProducto from "../oferta-producto/OfertaProducto";
import DetallesProducto from "../detalles-producto/DetallesProducto";
import EditarProducto from "../actualizar-producto/EditarProducto";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";
import { useGridApiRef } from "@mui/x-data-grid";
import { URL_BASE } from "@/config/config";


interface ProductDetails {
  id: string;
  name: string;
  description: string;
  petType: string;
  category: string;
  subcategory: string;
  finalPrice: string;
  stock: number;
  multimediaFiles: string[];
  publicationType: string;
  size: string | null;
  weight: string | null;
  createdAt: string;
}

const ListaProductos: React.FC = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductDetails | null>(null);
  const [rows, setRows] = useState<ProductDetails[]>([]);
  const [entrepreneurId, setEntrepreneurId] = useState<string | null>(null);
  const [productToDeleteName, setProductToDeleteName] = useState<string | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const apiRef = useGridApiRef();


  useEffect(() => {
    const storedEntrepreneurId = localStorage.getItem("entrepreneur_id");
    if (storedEntrepreneurId) {
      setEntrepreneurId(storedEntrepreneurId);
    } else {
      console.warn(" No se encontró el ID del emprendedor en localStorage.");
    }
  }, []);

  
  const handleViewProduct = (product: ProductDetails) => {
    setSelectedProduct(product);
    setOpenDetailsDialog(true);
  };

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);



  const handleEditProduct = async (productId: string) => {
    try {
      console.log("Obteniendo datos actualizados del producto:", productId);
      const response = await axios.get(`${URL_BASE}products/edit/${productId}`);
      const updatedProduct = response.data;

      console.log("Datos obtenidos:", updatedProduct);

      setSelectedProduct(updatedProduct);
      setOpenEditDialog(true);
    } catch (error) {
      console.error("Error al obtener los datos del producto:", error);
      alert("No se pudo obtener la información actualizada del producto.");
    }
  };

  const handleDeleteProduct = (productId: string) => {
    const product = rows.find((row) => row.id === productId); 
    setProductToDelete(productId);
    setProductToDeleteName(product ? product.name : "Producto desconocido"); 
    setOpenDeleteDialog(true);
  };
  

  const confirmDeleteProduct = async () => {
    if (!productToDelete) return;
  
    try {
      const response = await axios.delete(`${URL_BASE}products/${productToDelete}`);
  
      setSnackbarMessage(`"${productToDeleteName}" eliminado correctamente.`);
      setSnackbarOpen(true);
  
      apiRef.current.setRowSelectionModel([]);
      setRows((prevRows) => prevRows.filter((row) => row.id !== productToDelete));
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
      setSnackbarMessage("Ocurrió un error al eliminar el producto.");
      setSnackbarOpen(true);
    } finally {
      setOpenDeleteDialog(false);
      setProductToDelete(null);
      setProductToDeleteName(null);
    }
  };
  
  
  
  const fetchProducts = async () => {
    if (!entrepreneurId) {
      console.error("No se encontró el ID del emprendedor.");
      return;
    }

    try {
      const response = await axios.get(`${URL_BASE}products/entrepreneur/${entrepreneurId}`);
      const formattedData = response.data.map((product: any) => ({
        id: product.id,
        name: product.name,
        description: product.description,
        petType: product.petType,
        category: product.category,
        subcategory: product.subcategory,
        finalPrice: `$${product.finalPrice}`,
        stock: product.stock,
        multimediaFiles: product.multimediaFiles ? product.multimediaFiles.split(",") : [],
        publicationType: product.publicationType,
        size: product.size,
        weight: product.weight,
        createdAt: product.createdAt,
      }));
      setRows(formattedData);
    } catch (error) {
      console.error("Error al obtener los productos:", error);
    }
  };



  useEffect(() => {
    if (entrepreneurId) {
      fetchProducts();
    }
  }, [entrepreneurId]);

  const CustomToolbar = () => (
    <GridToolbarContainer sx={{ display: "flex", justifyContent: "space-between" }}>
      <div>
        <GridToolbarFilterButton />
        <GridToolbarExport />
      </div>
      <GridToolbarQuickFilter debounceMs={500} sx={{ marginLeft: "auto" }} />
    </GridToolbarContainer>
  );

  return (
    <Box sx={{ padding: "20px 30px 60px 30px " }}>
      <Typography
        sx={{
          marginBottom: "20px",
          textAlign: "left",
          fontSize: "24px",
          fontWeight: "bold",
          color: themePalette.primary,
          padding: "15px",
        }}
      >
        Lista de productos
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 3 }}>
        <Button
          variant="outlined"
          startIcon={<LocalOfferIcon />}
          onClick={() => setOpenDialog(true)}
          sx={{
            minWidth: "50px",
            background: themePalette.primary,
            textTransform: "none",
            borderRadius: "20px",
            color: themePalette.cwhite,
            mr: 2,
          }}
        >
          Generar Ofertas
        </Button>
      </Box>

      <Paper sx={{ height: 500, width: "100%", marginTop: 2 }}>
        <DataGrid
        key={rows.length}
        apiRef={apiRef}
        localeText={esES.components.MuiDataGrid.defaultProps.localeText}
        rows={rows.length > 0 ? rows : []} 
          columns={[
            { field: "name", headerName: "Nombre", minWidth: 150, flex: 1.16 },
            { field: "petType", headerName: "Tipo de Mascota", minWidth: 130, flex: 0.8 },
            { field: "category", headerName: "Categoría", minWidth: 130, flex:0.5 },
            { field: "subcategory", headerName: "Subcategoría", minWidth: 135, flex: 1 },
            { field: "finalPrice", headerName: "Precio final", minWidth: 100, flex: 0.5 },
            { field: "stock", headerName: "Stock", minWidth: 100, flex: 0.5 },
            {
              field: "ver",
              headerName: "Detalles",
              minWidth: 50,
              flex: 0.5,
              renderCell: (params) => (
                <IconButton sx={{ color: themePalette.primary }} onClick={() => handleViewProduct(params.row)}>
                  <VisibilityIcon />
                </IconButton>
              ),
            },
            {
              field: "editar",
              headerName: "Editar",
              minWidth: 90,
              flex: 0.3,
              renderCell: (params) => (
                <IconButton sx={{ color: "#FF5C00" }} onClick={() => handleEditProduct(params.row.id)}>
                  <EditIcon />
                </IconButton>
              ),
            },
            {
              field: "eliminar",
              headerName: "Eliminar",
              minWidth: 50,
              flex: 0.5,
              renderCell: (params) => (
                <IconButton color="error" onClick={() => handleDeleteProduct(params.row.id)}>
                  <Delete />
                </IconButton>
              ),
            },
          ]}
          pageSizeOptions={[5, 10, 25, 40, 100]}
          slots={{
            toolbar: CustomToolbar, 
          }}

          sx={{
            fontSize: "16px",
            "& .MuiDataGrid-toolbarContainer": {
              backgroundColor: themePalette.cwhite,
              padding: "0.5rem",
            },
            "& .MuiDataGrid-columnHeader": {
              backgroundColor: themePalette.black10,
              fontWeight: "bold",
            },
            "& .MuiDataGrid-footerContainer": {
              backgroundColor: themePalette.black10,
              fontWeight: "bold",
            },
          }}
        />
      </Paper>
      <Dialog
  open={openDeleteDialog}
  onClose={() => setOpenDeleteDialog(false)}
  maxWidth="xs"
  fullWidth
>
  <DialogTitle
    sx={{
      backgroundColor: themePalette.primary,
      color: themePalette.cwhite,
      textAlign: 'center',
      fontWeight: 'bold',
    }}
  >
    Confirmar Eliminación
    <IconButton
      onClick={() => setOpenDeleteDialog(false)}
      sx={{
        position: "absolute",
        right: 8,
        top: 8,
        color: themePalette.cwhite,
      }}
    >
      <CloseIcon />
    </IconButton>
  </DialogTitle>
  <DialogContent dividers>
    <Typography sx={{ fontSize: '18px', textAlign: 'center', color: themePalette.black }}>
      ¿Estás seguro de que deseas eliminar este producto? Esta acción no se puede deshacer.
    </Typography>
    <Box display="flex" justifyContent="center" gap={2} mt={3}>
      <Button
        onClick={() => setOpenDeleteDialog(false)}
        variant="contained"
         sx={{
                  textTransform: "none",
                  width: "120px",
                  background: themePalette.primary,
                  color: themePalette.cwhite,
                  "&:hover": { background: themePalette.secondary },
                }}
      >
        Cancelar
      </Button>
      <Button
        onClick={confirmDeleteProduct}
        variant="contained"
        color="error"
        sx={{
                  textTransform: "none",
                  width: "120px",
                  background: themePalette.primary,
                  color: themePalette.cwhite,
                  "&:hover": { background: "red" },
                }}
      >
        Eliminar
      </Button>
    </Box>
  </DialogContent>
</Dialog>

<Snackbar
  open={snackbarOpen}
  autoHideDuration={3000} 
  onClose={() => setSnackbarOpen(false)}
  message={snackbarMessage}
  anchorOrigin={{ vertical: "top", horizontal: "center" }}
/>

      <OfertaProducto open={openDialog} onClose={() => setOpenDialog(false)}  entrepreneurId={entrepreneurId} />
      {selectedProduct && <DetallesProducto product={selectedProduct} open={openDetailsDialog} onClose={() => setOpenDetailsDialog(false)} />}
      {selectedProduct && <EditarProducto open={openEditDialog} onClose={() => setOpenEditDialog(false)} product={selectedProduct} onUpdateSuccess={fetchProducts} />}
    </Box>
  );
};

export default ListaProductos;
