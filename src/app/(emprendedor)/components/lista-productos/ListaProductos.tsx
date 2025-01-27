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
import axios from "axios";

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
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false); // Control para el diálogo de detalles
  const [selectedProduct, setSelectedProduct] = useState<ProductDetails | null>(null); // Producto seleccionado
  const [rows, setRows] = useState<ProductDetails[]>([]); // Estado para almacenar los datos de la tabla
  const [entrepreneurId, setEntrepreneurId] = useState<string | null>(null);

  // Columnas de la tabla
  const columns: GridColDef[] = [
    { field: "name", headerName: "Nombre", minWidth: 150, flex: 1 },
    { field: "petType", headerName: "Tipo de Mascota", minWidth: 130, flex: 1 },
    { field: "category", headerName: "Categoría", minWidth: 130, flex: 1 },
    { field: "subcategory", headerName: "Subcategoría", minWidth: 130, flex: 1 },
    { field: "finalPrice", headerName: "Precio", minWidth: 100, flex: 0.8 },
    { field: "stock", headerName: "Cantidad", minWidth: 100, flex: 0.8 },
    {
      field: "ver",
      headerName: "Detalles",
      minWidth: 50,
      flex: 0.5,
      renderCell: (params) => (
        <IconButton
          sx={{ color: themePalette.primary }}
          onClick={() => handleViewProduct(params.row)} 
        >
          <VisibilityIcon />
        </IconButton>
      ),
    },
    {
      field: "editar",
      headerName: "Editar",
      minWidth: 90,
      flex: 0.5,
      renderCell: () => <Button sx={{ color: themePalette.primary }} startIcon={<EditIcon />} />,
    },
    {
      field: "eliminar",
      headerName: "Eliminar",
      minWidth: 50,
      flex: 0.5,
      renderCell: (params) => (
        <IconButton
          color="error"
          onClick={() => handleDeleteProduct(params.row.id)}
        >
          <Delete />
        </IconButton>
      ),
    },
  ];

  // Función para manejar la vista del producto
  const handleViewProduct = (product: ProductDetails) => {
    setSelectedProduct(product); // Guardar el producto seleccionado
    setOpenDetailsDialog(true); // Abrir el diálogo de detalles
  };

  // Función para eliminar el producto
  const handleDeleteProduct = async (productId: string) => {
    const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este producto?");
    if (!confirmDelete) return;

    try {
      const response = await axios.delete(`http://localhost:3001/api/products/${productId}`);
      alert(response.data.message); // Mostrar el mensaje de éxito
      setRows((prevRows) => prevRows.filter((row) => row.id !== productId)); // Eliminar el producto de la tabla
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
      alert("Ocurrió un error al eliminar el producto.");
    }
  };

  
  // Función para obtener los datos desde el backend
  const fetchProducts = async () => {
    if (!entrepreneurId) {
      console.error("No se encontró el ID del emprendedor.");
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:3001/api/products/entrepreneur/${entrepreneurId}`
      );
      // Formatear los datos de la respuesta
      const formattedData = response.data.map((product: any) => ({
        id: product.id,
        name: product.name,
        description: product.description,
        petType: product.petType,
        category: product.category,
        subcategory: product.subcategory,
        finalPrice: `$${product.finalPrice}`, // Agregar símbolo de dólar
        stock: product.stock,
        multimediaFiles: product.multimediaFiles.split(","),
        publicationType: product.publicationType, // Nueva propiedad
        size: product.size, // Nueva propiedad
        weight: product.weight, // Nueva propiedad
        createdAt: product.createdAt, // Nueva propiedad
      }));
      setRows(formattedData); // Actualizar el estado con los datos formateados
    } catch (error) {
      console.error("Error al obtener los productos:", error);
    }
  };

  useEffect(() => {
    const storedEntrepreneurId =
      localStorage.getItem("entrepreneurId") || "9d4d342e-aca0-4c88-868e-c86e2fb9b793";
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
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 40, page: 0 },
            },
          }}
          pageSizeOptions={[5, 10, 25, 40, 100]}
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

      {selectedProduct && (
        <DetallesProducto
          product={selectedProduct}
          open={openDetailsDialog}
          onClose={() => setOpenDetailsDialog(false)}
        />
      )}
    </Box>
  );
};

export default ListaProductos;
