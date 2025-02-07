import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  IconButton,
  Grid2,
  Box,
  Paper,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { themePalette } from "@/config/theme.config";

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

interface DetallesProductoProps {
  product: ProductDetails;
  open: boolean;
  onClose: () => void;
}

const DetallesProducto: React.FC<DetallesProductoProps> = ({
  product,
  open,
  onClose,
}) => {
  const renderMultimedia = (url: string, index: number) => {
    const isVideo = url.match(/\.(mp4|webm|ogg)$/i);

    if (isVideo) {
      return (
        <video
          key={index}
          src={url.trim()}
          controls
          style={{
            width: "150px",
            height: "150px",
            borderRadius: "8px",
          }}
        />
      );
    } else {
      return (
        <img
          key={index}
          src={url.trim()}
          alt={`Multimedia ${index + 1}`}
          style={{
            width: "150px",
            height: "150px",
            objectFit: "cover",
            borderRadius: "8px",
          }}
        />
      );
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle
        sx={{
          backgroundColor: themePalette.primary,
          color: themePalette.cwhite,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
      >
        <Typography sx={{ fontWeight: "bold", fontSize: "36px", textAlign: "center" }}>
          Detalles del Producto
        </Typography>
        <IconButton
          onClick={onClose}
          sx={{ color: themePalette.cwhite, position: "absolute", right: 8 }}
        >
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <Paper elevation={3} sx={{ padding: 4, marginBottom: 4 }}>
          <Grid2 container spacing={2}>
            <Grid2 size={{ xs: 12 }}>
              <Typography
                variant="h5"
                sx={{ fontWeight: "bold", color: themePalette.primary }}
              >
                {product.name}
              </Typography>
            </Grid2>

            <Grid2 size={{ xs: 12 }}>
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", marginBottom: 1 }}
              >
                Imágenes:
              </Typography>
              <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                {product.multimediaFiles.map((url, index) =>
                  renderMultimedia(url, index)
                )}
              </Box>
            </Grid2>

            <Grid2 size={{ xs: 12 }}>
              <Box
                sx={{
                  width: "100%",
                  height: "2px",
                  backgroundColor: themePalette.primary,
                  marginY: 2,
                }}
              />
            </Grid2>

            {product.description && (
              <Grid2 size={{ xs: 12, sm: 6 }}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Descripción:
                </Typography>
                <Typography>{product.description}</Typography>
              </Grid2>
            )}

            {product.publicationType && (
              <Grid2 size={{ xs: 12, sm: 6 }}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Tipo de publicación:
                </Typography>
                <Typography>{product.publicationType}</Typography>
              </Grid2>
            )}

            {product.petType && (
              <Grid2 size={{ xs: 12, sm: 6 }}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Tipo de mascota:
                </Typography>
                <Typography>{product.petType}</Typography>
              </Grid2>
            )}

            {product.category && (
              <Grid2 size={{ xs: 12, sm: 6 }}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Categoría:
                </Typography>
                <Typography>{product.category}</Typography>
              </Grid2>
            )}

            {product.subcategory && (
              <Grid2 size={{ xs: 12, sm: 6 }}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Subcategoría:
                </Typography>
                <Typography>{product.subcategory}</Typography>
              </Grid2>
            )}

            {product.finalPrice && (
              <Grid2 size={{ xs: 12, sm: 6 }}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Precio:
                </Typography>
                <Typography>{product.finalPrice}</Typography>
              </Grid2>
            )}

            <Grid2 size={{ xs: 12 }}>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Cantidad disponible:
              </Typography>
              <Typography>{product.stock}</Typography>
            </Grid2>

            {product.size && (
              <Grid2 size={{ xs: 12 }}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Tamaño:
                </Typography>
                <Typography>{product.size}</Typography>
              </Grid2>
            )}

            {product.weight && (
              <Grid2 size={{ xs: 12 }}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Peso:
                </Typography>
                <Typography>{product.weight ? `${product.weight} gr` : "No especificado"}
                </Typography>
              </Grid2>
            )}

            <Grid2 size={{ xs: 12 }}>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Fecha de registro:
              </Typography>
              <Typography>{new Date(product.createdAt).toLocaleDateString()}</Typography>
            </Grid2>
          </Grid2>
        </Paper>
      </DialogContent>
    </Dialog>
  );
};

export default DetallesProducto;
