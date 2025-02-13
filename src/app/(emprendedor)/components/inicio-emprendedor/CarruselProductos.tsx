"use client";

import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress, Snackbar, Dialog, DialogTitle, DialogContent, Button,Grid2 } from '@mui/material';
import { themePalette } from '@/config/theme.config';
import ProductCard from './CardsProductosVendidos';
import EditarProducto from '../actualizar-producto/EditarProducto';
import { URL_BASE } from '@/config/config';

interface Product {
  id: string;
  name: string;
  multimediaFiles: string;
  description: string;
  finalPrice: number;
}

const CarruselProductosVendidos: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [entrepreneurId, setEntrepreneurId] = useState<string | null>(null);

  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    const storedEntrepreneurId = localStorage.getItem('entrepreneur_id');
    if (storedEntrepreneurId) {
      setEntrepreneurId(storedEntrepreneurId);
    } else {
      console.warn("No se encontró el ID del emprendedor en localStorage.");
    }
  }, []);

  const fetchTopSellingProducts = async () => {
    if (!entrepreneurId) return;

    setLoading(true);
    try {
      const response = await fetch(`${URL_BASE}products/entrepreneur/${entrepreneurId}/top-selling`
);
      if (!response.ok) {
        throw new Error("Error al obtener productos");
      }
      const data = await response.json();

      const formattedProducts = data.map((product: any) => ({
        id: product.id,
        name: product.name,
        multimediaFiles: product.multimediaFiles || '',
        description: product.description.length > 50 ? product.description.slice(0, 50) + "..." : product.description,
        finalPrice: product.finalPrice ? parseFloat(product.finalPrice) : 0,
      }));

      setProducts(formattedProducts);
    } catch (error) {
      console.error("Error al obtener los productos más vendidos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTopSellingProducts();
  }, [entrepreneurId]);

  const confirmDeleteProduct = async () => {
    if (!productToDelete) return;

    try {
      const response = await fetch(`${URL_BASE}products/${productToDelete.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error("Error al eliminar el producto");
      }

      setProducts((prevProducts) => prevProducts.filter((product) => product.id !== productToDelete.id));

      setSnackbarMessage(`"${productToDelete.name}" eliminado correctamente.`);
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
      setSnackbarMessage("No se pudo eliminar el producto.");
      setSnackbarOpen(true);
    } finally {
      setOpenDeleteDialog(false);
      setProductToDelete(null);
    }
  };

  const handleDeleteProduct = (product: Product) => {
    setProductToDelete(product);
    setOpenDeleteDialog(true);
  };

  const handleEditProduct = async (productId: string) => {
    try {
      const response = await fetch(`${URL_BASE}products/edit/${productId}`);
      if (!response.ok) throw new Error("Error al obtener los datos del producto");

      const data = await response.json();
      setSelectedProduct(data);
      setOpenEditDialog(true);
    } catch (error) {
      console.error("Error al obtener los datos del producto:", error);
      setSnackbarMessage("No se pudo obtener la información del producto.");
      setSnackbarOpen(true);
    }
  };

  const handleUpdateSuccess = () => {
    setSnackbarMessage("Producto actualizado exitosamente.");
    setSnackbarOpen(true);
    setOpenEditDialog(false);

    fetchTopSellingProducts();
  };

  return (
    <Box sx={{ padding: '15px' }}>
      <Typography sx={{ marginBottom: '20px', textAlign: 'left', fontSize: '24px', fontWeight: 'bold', color: themePalette.primary }}>
        Productos más vendidos
      </Typography>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '150px' }}>
          <CircularProgress color="primary" />
        </Box>
      ) : (
        <Box
          sx={{
            overflowX: 'auto',
            display: 'flex',
            justifyContent: 'center',
            '&::-webkit-scrollbar': { display: 'none' },
          }}
        >
          <Grid2 container spacing={5} justifyContent="space-between" sx={{ display: 'flex', flexWrap: 'nowrap' }}>
            {products.slice(0, 5).map((product) => (
              <Grid2 key={product.id} sx={{ minWidth: '220px', flexShrink: 0, display: 'flex', justifyContent: 'center' }}>
                <ProductCard
                  name={product.name}
                  multimediaFiles={product.multimediaFiles}
                  description={product.description}
                  finalPrice={product.finalPrice}
                  onEdit={() => handleEditProduct(product.id)}
                  onDelete={() => handleDeleteProduct(product)}
                />
              </Grid2>
            ))}
          </Grid2>
        </Box>
      )}

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
        </DialogTitle>
        <DialogContent dividers>
          <Typography sx={{ fontSize: '18px', textAlign: 'center', color: themePalette.black }}>
            ¿Estás seguro de que deseas eliminar <b>{productToDelete?.name}</b>? Esta acción no se puede deshacer.
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

      {selectedProduct && (
        <EditarProducto
          open={openEditDialog}
          onClose={() => setOpenEditDialog(false)}
          product={selectedProduct}
          onUpdateSuccess={handleUpdateSuccess}
        />
      )}

      <Snackbar open={snackbarOpen} autoHideDuration={4000} onClose={() => setSnackbarOpen(false)} message={snackbarMessage} anchorOrigin={{ vertical: "top", horizontal: "center" }} />
    </Box>
  );
};

export default CarruselProductosVendidos;
