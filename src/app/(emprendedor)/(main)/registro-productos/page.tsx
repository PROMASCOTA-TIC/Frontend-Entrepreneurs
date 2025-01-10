"use client";

import React, { useState } from "react";
import { Box, Button, CircularProgress } from "@mui/material";
import TipoPublicacion from "../../components/registro-productos/TipoPublicacion";
import TipoMascota from "../../components/registro-productos/TipoMascota";
import FormularioRegistroProducto from "../../components/registro-productos/FormularioProducto";
import ArchivosMultimedia from "../../components/registro-productos/ArchivosMultimedia";

// Define la interfaz para estructurar los datos del producto
interface ProductData {
  entrepreneurId: string; // ID del emprendedor
  publicationType: string; // Tipo de publicación: "0" o "1"
  petTypeId: string; // Tipo de mascota
  categoryId: string; // Categoría
  subcategoryId: string; // Subcategoría
  sizeId?: string; // Opcional: Talla
  weight?: number; // Opcional: Peso
  stock?: number; // Opcional: Stock
  finalPrice?: number; // Opcional: Precio final
  name: string; // Nombre del producto
  description: string; // Descripción
  multimediaFiles: string; // URLs de archivos multimedia
}

export default function RegistroProducto() {
  const [productData, setProductData] = useState<ProductData>({
    entrepreneurId: "9d4d342e-aca0-4c88-868e-c86e2fb9b793", // ID fijo como ejemplo
    publicationType: "",
    petTypeId: "",
    categoryId: "",
    subcategoryId: "",
    sizeId: undefined,
    weight: undefined,
    stock: undefined, // Cambiar a undefined
    finalPrice: undefined, // Cambiar a undefined
    name: "",
    description: "",
    multimediaFiles: "", // Ajustado a string[]
  });

  const [loading, setLoading] = useState(false); // Estado de carga

  // Función para actualizar los datos desde los componentes hijos
  const updateProductData = (key: keyof ProductData, value: any) => {
    setProductData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleGuardar = async () => {
    setLoading(true); // Activa el estado de carga
    try {
      console.log("Datos que se enviarán al backend:", productData);
      const response = await fetch("http://localhost:3001/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData), // Envía los datos como JSON
      });

      if (!response.ok) {
        throw new Error("Error al guardar el producto.");
      }

      const data = await response.json();
      alert("Producto guardado exitosamente.");
      console.log("Respuesta del backend:", data);
    } catch (error) {
      console.error("Error:", error);
      alert("Ocurrió un error al guardar el producto.");
    } finally {
      setLoading(false); // Desactiva el estado de carga
    }
  };

  const handleCancelar = () => {
    console.log("Registro cancelado");
    // Reinicia los datos del formulario
    setProductData({
      entrepreneurId: "123e4567-e89b-12d3-a456-426614174000",
      publicationType: "",
      petTypeId: "",
      categoryId: "",
      subcategoryId: "",
      sizeId: undefined,
      weight: undefined,
      stock: undefined, // Ajuste
      finalPrice: undefined, // Ajuste
      name: "",
      description: "",
      multimediaFiles: "",
    }
    );
  };

  // Render de carga
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
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
        <Button variant="contained" color="primary" onClick={handleGuardar}>
          Guardar
        </Button>
        <Button variant="outlined" color="secondary" onClick={handleCancelar}>
          Cancelar
        </Button>
      </Box>
    </>
  );
}
