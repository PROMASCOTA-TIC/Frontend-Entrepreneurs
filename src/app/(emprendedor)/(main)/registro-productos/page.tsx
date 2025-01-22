"use client";

import React, { useState } from "react";
import { Box, Button, CircularProgress, Grid2 } from "@mui/material";
import TipoPublicacion from "../../components/registro-productos/TipoPublicacion";
import TipoMascota from "../../components/registro-productos/TipoMascota";
import FormularioRegistroProducto from "../../components/registro-productos/FormularioProducto";
import ArchivosMultimedia from "../../components/registro-productos/ArchivosMultimedia";
import { theme } from "@/app/config/theme.config";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { initializeApp } from "firebase/app";
import { useRouter } from "next/navigation"; 

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
  const [productData, setProductData] = useState<ProductData>({
    entrepreneurId: "9d4d342e-aca0-4c88-868e-c86e2fb9b793", 
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

  const [loading, setLoading] = useState(false);

  const updateProductData = (key: keyof ProductData, value: any) => {
    setProductData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };
  
  const uploadImagesToFirebase = async (files: string[]) => {
    const urls: string[] = [];
    for (const file of files) {
      const blob = await fetch(file).then((res) => res.blob());
      const storageRef = ref(
        storage,
        `products/${Date.now()}_${Math.random().toString(36).slice(2)}.jpg`
      );
      await uploadBytes(storageRef, blob);
      const downloadURL = await getDownloadURL(storageRef);
      urls.push(downloadURL);
    }
    return urls;
  };

  const handleGuardar = async () => {
    setLoading(true);
    try {
      // Subir imágenes a Firebase y obtener los enlaces públicos
      const uploadedUrls = await uploadImagesToFirebase(productData.multimediaFiles);
  
      // Actualizar los datos con los enlaces generados
      const updatedProductData = {
        ...productData,
        multimediaFiles: uploadedUrls,
      };
  
      console.log("Datos que se enviarán al backend:", updatedProductData);
  
      const response = await fetch("http://localhost:3001/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProductData),
      });
  
      if (!response.ok) {
        throw new Error("Error al guardar el producto.");
      }
  
      const data = await response.json();
      alert("Producto guardado exitosamente.");
      console.log("Respuesta del backend:", data);
  
      // Restablecer los datos del formulario
      setProductData({
        entrepreneurId: "123e4567-e89b-12d3-a456-426614174000",
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
    } catch (error) {
      console.error("Error:", error);
      alert("Ocurrió un error al guardar el producto.");
    } finally {
      setLoading(false);
    }
  };
  
  const handleCancelar = () => {
    console.log("Registro cancelado");
    setProductData({
      entrepreneurId: "123e4567-e89b-12d3-a456-426614174000",
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
      />
      <TipoMascota
        value={productData.petTypeId}
        onChange={(value) => updateProductData("petTypeId", value)}
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
      />
      <ArchivosMultimedia
        value={productData.multimediaFiles}
        onChange={(urls) => updateProductData("multimediaFiles", urls)}
      />
      <Grid2
       container spacing={2} justifyContent="space-evenly" alignItems="center"
       >
        <Button variant="contained" onClick={handleGuardar}
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
        <Button variant="contained" onClick={handleCancelar}
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
