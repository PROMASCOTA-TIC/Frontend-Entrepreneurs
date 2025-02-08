"use client";

import React, { useState } from "react";
import { Box, Button, CircularProgress, DialogContent, DialogTitle, Grid2, Typography,Dialog } from "@mui/material";
import TipoPublicacion from "../../components/registro-productos/TipoPublicacion";
import TipoMascota from "../../components/registro-productos/TipoMascota";
import FormularioRegistroProducto from "../../components/registro-productos/FormularioProducto";
import ArchivosMultimedia from "../../components/registro-productos/ArchivosMultimedia";
import { theme } from "@/app/config/theme.config";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { initializeApp } from "firebase/app";
import { useRouter } from "next/navigation";
import { themePalette } from "@/config/theme.config";
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

interface ProductData {
  entrepreneurId: string;
  publicationType: string;
  petTypeId: string;
  categoryId: string;
  subcategoryId: string;
  sizeId?: string;
  weight?: number;
  stock?: number;
  finalPrice?: number;
  name: string;
  description: string;
  multimediaFiles: string[];
}

export default function RegistroProducto() {
  const router = useRouter();
  const entrepreneurId = "ca224da6-01f1-4546-943d-c00f52f296dd"; 

  const [productData, setProductData] = useState<ProductData>({
    entrepreneurId,
    publicationType: "",
    petTypeId: "",
    categoryId: "",
    subcategoryId: "",
    sizeId: undefined,
    weight: undefined,
    stock: undefined,
    finalPrice: undefined,
    name: "",
    description: "",
    multimediaFiles: [],
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ProductData, string>>>({});
  const [loading, setLoading] = useState(false);
  const [openSuccessDialog, setOpenSuccessDialog] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  
  const updateProductData = (key: keyof ProductData, value: any) => {
    setProductData((prev) => ({
      ...prev,
      [key]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [key]: undefined,
    }));
  };

  const validateForm = () => {
    const newErrors: Partial<Record<keyof ProductData, string>> = {};

    if (!productData.publicationType) newErrors.publicationType = "Seleccione un tipo de publicación.";
    if (!productData.petTypeId) newErrors.petTypeId = "Seleccione un tipo de mascota.";
    if (!productData.categoryId) newErrors.categoryId = "Seleccione una categoría.";
    if (!productData.subcategoryId) newErrors.subcategoryId = "Seleccione una subcategoría.";
    if (!productData.name) newErrors.name = "Ingrese el nombre del producto.";
    if (!productData.description) newErrors.description = "Ingrese una descripción.";
    if (!productData.stock || productData.stock <= 0) newErrors.stock = "Ingrese un stock válido.";
    if (!productData.finalPrice || productData.finalPrice <= 0) newErrors.finalPrice = "Ingrese un precio válido.";
    if (!productData.multimediaFiles.length) newErrors.multimediaFiles = "Suba al menos una imagen.";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const uploadMediaToFirebase = async (files: string[]) => {
    const urls: string[] = [];
    
    for (const file of files) {
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
  
    return urls;
  };
  

  const handleGuardar = async () => {
    if (!validateForm()) {
      console.log("Errores de validación:", errors);
      return;
    }

    setLoading(true);
    console.log("Datos antes de subir:", productData);

    try {
      const uploadedUrls = await uploadMediaToFirebase(productData.multimediaFiles);
      const updatedProductData = {
        ...productData,
        multimediaFiles: uploadedUrls,
      };
    
      const response = await fetch(`${URL_BASE}products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProductData),
      });
    
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error del servidor:", errorText);
        throw new Error(`Error al guardar el producto: ${response.statusText}`);
      }
    
      const data = await response.json();
    
      // ✅ Mensaje con el nombre del producto guardado
      setSuccessMessage(`"${productData.name}" se guardó exitosamente.`);
      setOpenSuccessDialog(true);
    
      setProductData((prev) => ({
        ...prev,
        entrepreneurId,
        publicationType: "",
        petTypeId: "",
        categoryId: "",
        subcategoryId: "",
        sizeId: undefined,
        weight: undefined,
        stock: undefined,
        finalPrice: undefined,
        name: "",
        description: "",
        multimediaFiles: [],
      }));
    } catch (error) {
      console.error("Error general:", error);
      setSuccessMessage("Ocurrió un error al guardar el producto.");
      setOpenSuccessDialog(true);
    } finally {
      setLoading(false);
    }
  }    

  const handleCancelar = () => {
    setProductData({
      entrepreneurId, 
      publicationType: "",
      petTypeId: "",
      categoryId: "",
      subcategoryId: "",
      sizeId: undefined,
      weight: undefined,
      stock: undefined,
      finalPrice: undefined,
      name: "",
      description: "",
      multimediaFiles: [],
    });
    router.push("/inicio");
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <CircularProgress size={60} />
        <h1>Guardando producto...</h1>
      </Box>
    );
  }

  return (
    <>
      <TipoPublicacion
        value={productData.publicationType}
        onChange={(value) => updateProductData("publicationType", value)}
        error={errors.publicationType}
      />
      <TipoMascota
        value={productData.petTypeId}
        onChange={(value) => updateProductData("petTypeId", value)}
        error={errors.petTypeId}
      />
      <FormularioRegistroProducto
        data={{
          categoryId: productData.categoryId,
          subcategoryId: productData.subcategoryId,
          sizeId: productData.sizeId,
          stock: productData.stock,
          finalPrice: productData.finalPrice,
          weight: productData.weight,
          name: productData.name,
          description: productData.description,
        }}
        onChange={(key, value) => updateProductData(key, value)}
        errors={errors}
      />
      <ArchivosMultimedia
        value={productData.multimediaFiles}
        onChange={(urls) => updateProductData("multimediaFiles", urls)}
        error={errors.multimediaFiles}
      />
      <Grid2 container spacing={2} justifyContent="space-evenly" alignItems="center">
        <Button
          variant="contained"
          onClick={handleGuardar}
          sx={{
            textTransform: "none",
            width: "213px",
            height: "34px",
            borderRadius: "20px",
            fontSize: "18px",
            marginTop: "10px",
            background: theme.palette.primary.main,
          }}
        >
          Guardar
        </Button>

        <Dialog
  open={openSuccessDialog}
  onClose={() => setOpenSuccessDialog(false)}
  maxWidth="xs"
  fullWidth
>
  <DialogTitle
    sx={{
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
      textAlign: "center",
      fontWeight: "bold",
    }}
  >
    Confirmación
  </DialogTitle>
  <DialogContent dividers>
    <Typography sx={{ fontSize: "18px", textAlign: "center", color: theme.palette.text.primary }}>
      {successMessage}
    </Typography>
    <Box display="flex" justifyContent="center" gap={2} mt={3}>
      <Button
        onClick={() => setOpenSuccessDialog(false)}
        variant="contained"
         sx={{
                        textTransform: "none",
                        width: "120px",
                        background: themePalette.primary,
                        color: themePalette.cwhite,
                        "&:hover": { background: themePalette.secondary },
                      }}
      >
        Aceptar
      </Button>
    </Box>
  </DialogContent>
</Dialog>

        <Button
          variant="contained"
          onClick={handleCancelar}
          sx={{
            textTransform: "none",
            width: "213px",
            height: "34px",
            borderRadius: "20px",
            fontSize: "18px",
            marginTop: "10px",
            background: theme.palette.primary.main,
          }}
        >
          Cancelar
        </Button>
      </Grid2>
    </>
  );
}
