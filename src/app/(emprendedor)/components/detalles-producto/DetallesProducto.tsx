import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  IconButton,
  Grid,
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
  multimediaFiles: string | string[];
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
  

  const multimediaArray: string[] =
    typeof product.multimediaFiles === "string"
      ? product.multimediaFiles.split(",").map((url) => url.trim()) 
      : Array.isArray(product.multimediaFiles)
      ? product.multimediaFiles
      : [];

  const renderMultimedia = (url: string, index: number) => {
    const isVideo = url.includes("videos/") || url.includes(".mp4") || url.includes(".webm") || url.includes(".ogg");

    return isVideo ? (
      <video
        key={index}
        controls
        style={{
          width: "200px",
          height: "200px",
          borderRadius: "8px",
          objectFit: "contain",
          backgroundColor: "black",
        }}
      >
        <source src={url.trim()} type="video/mp4" />
        Tu navegador no soporta videos.
      </video>
    ) : (
      <img
        key={index}
        src={url.trim()}
        alt={`Multimedia ${index + 1}`}
        style={{
          width: "200px",
          height: "200px",
          objectFit: "cover",
          borderRadius: "8px",
          boxShadow: "2px 2px 10px rgba(0,0,0,0.2)",
        }}
      />
    );
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
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography
                variant="h5"
                sx={{ fontWeight: "bold", color: themePalette.primary }}
              >
                {product.name}
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", marginBottom: 1 }}
              >
                Multimedia:
              </Typography>
              <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                {multimediaArray.map((url, index) => renderMultimedia(url, index))}
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Box
                sx={{
                  width: "100%",
                  height: "2px",
                  backgroundColor: themePalette.primary,
                  marginY: 2,
                }}
              />
            </Grid>

            {product.description && (
              <Grid item xs={12} sm={6}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Descripción:
                </Typography>
                <Typography>{product.description}</Typography>
              </Grid>
            )}

            {product.publicationType && (
              <Grid item xs={12} sm={6}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Tipo de publicación:
                </Typography>
                <Typography>{product.publicationType}</Typography>
              </Grid>
            )}

            {product.petType && (
              <Grid item xs={12} sm={6}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Tipo de mascota:
                </Typography>
                <Typography>{product.petType}</Typography>
              </Grid>
            )}

            {product.category && (
              <Grid item xs={12} sm={6}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Categoría:
                </Typography>
                <Typography>{product.category}</Typography>
              </Grid>
            )}

            {product.subcategory && (
              <Grid item xs={12} sm={6}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Subcategoría:
                </Typography>
                <Typography>{product.subcategory}</Typography>
              </Grid>
            )}

            {product.finalPrice && (
              <Grid item xs={12} sm={6}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Precio:
                </Typography>
                <Typography>{product.finalPrice}</Typography>
              </Grid>
            )}

            <Grid item xs={12}>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Cantidad disponible:
              </Typography>
              <Typography>{product.stock}</Typography>
            </Grid>

            {product.size && (
              <Grid item xs={12}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Tamaño:
                </Typography>
                <Typography>{product.size}</Typography>
              </Grid>
            )}

            {product.weight && (
              <Grid item xs={12}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Peso:
                </Typography>
                <Typography>{product.weight ? `${product.weight} gr` : "No especificado"}
                </Typography>
              </Grid>
            )}

            <Grid item xs={12}>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Fecha de registro:
              </Typography>
              <Typography>{new Date(product.createdAt).toLocaleDateString()}</Typography>
            </Grid>
          </Grid>
        </Paper>
      </DialogContent>
    </Dialog>
  );
};

export default DetallesProducto;
