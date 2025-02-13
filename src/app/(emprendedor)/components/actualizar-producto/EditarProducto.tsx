"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  Typography,
  CircularProgress,
  IconButton,
  Grid2
} from "@mui/material";
import { Close } from "@mui/icons-material";
import axios from "axios";
import { themePalette } from "@/config/theme.config";
import TipoPublicacion from "../registro-productos/TipoPublicacion";
import TipoMascota from "../registro-productos/TipoMascota";
import FormularioRegistroProducto from "../registro-productos/FormularioProducto";
import ArchivosMultimedia from "../registro-productos/ArchivosMultimedia";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { initializeApp } from "firebase/app";
import { URL_BASE } from "@/config/config";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

interface EditarProductoProps {
  open: boolean;
  onClose: () => void;
  product: any;
  onUpdateSuccess: () => void;
}

const EditarProducto: React.FC<EditarProductoProps> = ({
  open,
  onClose,
  product,
  onUpdateSuccess,
}) => {
  const [formData, setFormData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const fetchProductData = async () => {
      if (!product || !product.id) return;

      setFetching(true);
      try {
        console.log("Obteniendo datos del producto desde el backend:", product.id);
        const response = await axios.get(`${URL_BASE}products/edit/${product.id}`);
        const updatedProduct = response.data;

        console.log("Datos obtenidos para edición:", updatedProduct);

        setFormData({
          ...updatedProduct,
          finalPrice: updatedProduct.finalPrice.toString(),
          multimediaFiles: Array.isArray(updatedProduct.multimediaFiles)
            ? updatedProduct.multimediaFiles
            : updatedProduct.multimediaFiles?.split(",").map((url: string) => url.trim()) || [],
        });
      } catch (error) {
        console.error("Error al obtener los datos del producto:", error);
        alert("No se pudo obtener la información actualizada del producto.");
      } finally {
        setFetching(false);
      }
    };

    if (open) {
      fetchProductData();
    }
  }, [open, product]);

  const handleChange = (key: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [key]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [key]: "",
    }));
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.publicationType) newErrors.publicationType = "Seleccione un tipo de publicación.";
    if (!formData.petTypeId) newErrors.petTypeId = "Seleccione un tipo de mascota.";
    if (!formData.categoryId) newErrors.categoryId = "Seleccione una categoría.";
    if (!formData.subcategoryId) newErrors.subcategoryId = "Seleccione una subcategoría.";
    if (!formData.name) newErrors.name = "Ingrese el nombre del producto.";
    if (!formData.description) newErrors.description = "Ingrese una descripción.";
    if (!formData.stock || formData.stock <= 0) newErrors.stock = "Ingrese un stock válido.";
    if (!formData.finalPrice || formData.finalPrice <= 0) newErrors.finalPrice = "Ingrese un precio válido.";
    if (!formData.multimediaFiles.length) newErrors.multimediaFiles = "Suba al menos una imagen.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const uploadMediaToFirebase = async (files: string[]) => {
    const urls: string[] = [];

    for (const file of files) {
        if (file.startsWith("https://")) {
            urls.push(file);
        } else {

            const response = await fetch(file);
            const blob = await response.blob();

            const fileType = blob.type;
            const fileExtension = fileType.split("/")[1]; 


            const prefix = fileType.startsWith("image/") ? "imagenes" : "videos";


            const storageRef = ref(
                storage,
                `emprendedores/productos/${prefix}/${Date.now()}_${Math.random().toString(36).slice(2)}.${fileExtension}`
            );

            await uploadBytes(storageRef, blob);

            const downloadURL = await getDownloadURL(storageRef);
            urls.push(downloadURL);
        }
    }
    
    return urls;
};


  const handleUpdate = async () => {
    if (!validateForm()) return;
  
    setLoading(true);
    try {
      const uploadedUrls = await uploadMediaToFirebase(formData.multimediaFiles);

      const formattedData = {
        entrepreneurId: formData.entrepreneurId,
        publicationType: formData.publicationType,
        petTypeId: formData.petTypeId,
        categoryId: formData.categoryId,
        subcategoryId: formData.subcategoryId,
        sizeId: formData.sizeId,
        finalPrice: parseFloat(formData.finalPrice),
        stock: parseInt(formData.stock, 10),
        name: formData.name,
        description: formData.description,
        multimediaFiles: uploadedUrls,
        weight: formData.weight ? parseFloat(formData.weight) : null,
      };
      console.log("Enviando datos limpios al backend:", formattedData);
      const response = await axios.patch(
       `${URL_BASE}products/${formData.id}`,
        formattedData
      );
  
      console.log("Producto actualizado:", response.data);
      alert("Producto actualizado exitosamente.");
      onUpdateSuccess();
      onClose();
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
      alert("Error al actualizar el producto.");
    } finally {
      setLoading(false);
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
        <Typography sx={{ fontWeight: "bold", fontSize: "32px", textAlign: "center" }}>
          Editar Producto
        </Typography>
        <IconButton onClick={onClose} sx={{ color: themePalette.cwhite, position: "absolute", right: 8 }}>
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers sx={{ maxHeight: "80vh", overflowY: "auto" }}>
        {fetching ? (
          <Typography sx={{ textAlign: "center", my: 3 }}>
            <CircularProgress /> Cargando datos...
          </Typography>
        ) : formData ? (
          <>
            <TipoPublicacion value={formData.publicationType} onChange={(value) => handleChange("publicationType", value)} error={errors.publicationType} />
            <TipoMascota value={formData.petTypeId} onChange={(value) => handleChange("petTypeId", value)} error={errors.petTypeId} />
            <FormularioRegistroProducto data={formData} onChange={handleChange} errors={errors} />
            <ArchivosMultimedia value={formData.multimediaFiles} onChange={(files) => handleChange("multimediaFiles", files)} error={errors.multimediaFiles} />
            <Grid2 container spacing={2} justifyContent="center" sx={{ mt: 3 }}>
              <Button variant="contained" onClick={handleUpdate} disabled={loading} sx={{
                  textTransform: "none",
                  width: "213px",
                  height: "34px",
                  borderRadius: "20px",
                  fontSize: "18px",
                  background: themePalette.primary,
                }}>
                {loading ? <CircularProgress size={24} color="inherit" /> : "Guardar cambios"}
              </Button>
              <Button variant="contained" onClick={onClose} sx={{
                  textTransform: "none",
                  width: "213px",
                  height: "34px",
                  borderRadius: "20px",
                  fontSize: "18px",
                  background: themePalette.primary,
                }}>
                Cancelar
              </Button>
            </Grid2>
          </>
        ) : <Typography sx={{ textAlign: "center", my: 3 }}>No se pudo cargar el producto.</Typography>}
      </DialogContent>
    </Dialog>
  );
};

export default EditarProducto;
