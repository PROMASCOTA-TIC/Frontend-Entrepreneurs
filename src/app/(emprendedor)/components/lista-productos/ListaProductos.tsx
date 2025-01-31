"use client";

import React, { useEffect, useState } from "react";
import { Box, Typography, Button, Paper, IconButton } from "@mui/material";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
  GridToolbarQuickFilter,
  GridColDef,
} from "@mui/x-data-grid";
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
import { useGridApiRef } from "@mui/x-data-grid";


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
  const apiRef = useGridApiRef();
  const handleViewProduct = (product: ProductDetails) => {
    setSelectedProduct(product);
    setOpenDetailsDialog(true);
  };

  const handleEditProduct = async (productId: string) => {
    try {
      console.log("Obteniendo datos actualizados del producto:", productId);
      const response = await axios.get(`http://localhost:3001/api/products/edit/${productId}`);
      const updatedProduct = response.data;

      console.log("Datos obtenidos:", updatedProduct);

      setSelectedProduct(updatedProduct);
      setOpenEditDialog(true);
    } catch (error) {
      console.error("Error al obtener los datos del producto:", error);
      alert("No se pudo obtener la información actualizada del producto.");
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este producto?");
    if (!confirmDelete) return;
  
    try {
      const response = await axios.delete(`http://localhost:3001/api/products/${productId}`);
      alert(response.data.message);
  
      apiRef.current.setRowSelectionModel([]); // Limpia la selección antes de actualizar
  
      setRows((prevRows) => {
        const updatedRows = prevRows.filter((row) => row.id !== productId);
        return updatedRows.length > 0 ? updatedRows : []; // Asegura que DataGrid nunca tenga `undefined`
      });
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
      alert("Ocurrió un error al eliminar el producto.");
    }
  };

  const fetchProducts = async () => {
    if (!entrepreneurId) {
      console.error("No se encontró el ID del emprendedor.");
      return;
    }

    try {
      const response = await axios.get(`http://localhost:3001/api/products/entrepreneur/${entrepreneurId}`);
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
    const storedEntrepreneurId = localStorage.getItem("entrepreneurId") || "9d4d342e-aca0-4c88-868e-c86e2fb9b793";
    setEntrepreneurId(storedEntrepreneurId);
  }, []);

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
    <Box>
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
        key={rows.length} // Clave dinámica para forzar la actualización cuando la tabla quede vacía
        apiRef={apiRef}
        localeText={esES.components.MuiDataGrid.defaultProps.localeText}
        rows={rows.length > 0 ? rows : []} // Evita errores cuando no hay datos
          columns={[
            { field: "name", headerName: "Nombre", minWidth: 150, flex: 1 },
            { field: "petType", headerName: "Tipo de Mascota", minWidth: 130, flex: 1 },
            { field: "category", headerName: "Categoría", minWidth: 130, flex: 1 },
            { field: "subcategory", headerName: "Subcategoría", minWidth: 130, flex: 1 },
            { field: "finalPrice", headerName: "Precio", minWidth: 100, flex: 0.8 },
            { field: "stock", headerName: "Stock", minWidth: 100, flex: 0.8 },
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
              flex: 0.5,
              renderCell: (params) => (
                <IconButton sx={{ color: themePalette.primary }} onClick={() => handleEditProduct(params.row.id)}>
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

      <OfertaProducto open={openDialog} onClose={() => setOpenDialog(false)} />
      {selectedProduct && <DetallesProducto product={selectedProduct} open={openDetailsDialog} onClose={() => setOpenDetailsDialog(false)} />}
      {selectedProduct && <EditarProducto open={openEditDialog} onClose={() => setOpenEditDialog(false)} product={selectedProduct} onUpdateSuccess={fetchProducts} />}
    </Box>
  );
};

export default ListaProductos;
