"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, TextField, Typography, MenuItem, Grid2 } from "@mui/material";
import { themePalette } from "@/config/theme.config";

interface FormularioRegistroProductoProps {
  data: {
    categoryId: string;
    subcategoryId: string;
    sizeId?: string;
    stock?: number;
    finalPrice?: number;
    weight?: number;
    name: string;
    description: string;
  };
  onChange: (key: keyof FormularioRegistroProductoProps["data"], value: any) => void;
}

const FormularioRegistroProducto: React.FC<FormularioRegistroProductoProps> = ({ data, onChange }) => {
  const [sizes, setSizes] = useState<{ id: string; name: string }[]>([]);
  const [categories, setCategories] = useState<{ value: string; label: string }[]>([]);
  const [subcategories, setSubcategories] = useState<{ id: string; name: string; categoryId: string }[]>([]);

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api/products/register";
  const endpoints = {
    sizes: `${API_BASE_URL}/sizes`,
    categories: `${API_BASE_URL}/categories`,
    subcategories: `${API_BASE_URL}/sub-categories`,
  };

  const validateDecimalInput = (value: string): string => {
    return value.replace(/,/g, "").replace(/[^0-9.]/g, "");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "weight" || name === "finalPrice") {
      const validatedValue = validateDecimalInput(value);
      onChange(name as keyof FormularioRegistroProductoProps["data"], validatedValue);
    } else {
      onChange(name as keyof FormularioRegistroProductoProps["data"], value);
    }
  };

  const loadData = async () => {
    try {
      const [sizeResponse, categoryResponse, subcategoryResponse] = await Promise.all([
        axios.get(endpoints.sizes),
        axios.get(endpoints.categories),
        axios.get(endpoints.subcategories),
      ]);

      setSizes(sizeResponse.data); // Suponemos que el backend siempre devuelve objetos con `id` y `name`
      setCategories(
        categoryResponse.data.map((cat: { id: string; name: string }) => ({
          value: cat.id,
          label: cat.name,
        }))
      );
      setSubcategories(subcategoryResponse.data);
    } catch (error) {
      console.error("Error al cargar los datos dinámicos:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const createField = (
    label: string,
    name: string,
    type = "text",
    options?: { value: string; label: string }[] | { id: string; name: string }[],
    isSelect = false,
    textFieldProps: any = {}
  ) => (
    <>
      <Grid2 size={{ xs: 12, sm: 4, lg: 3 }} sx={{ display: "flex", alignItems: "center" }}>
        <Typography sx={{ fontWeight: "600", fontSize: "18px", mb: "5px", minWidth: "50px" }}>
          {label}:
        </Typography>
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 8, lg: 9 }}>
        {isSelect ? (
          <TextField
            select
            label="Seleccionar"
            name={name}
            value={data[name as keyof FormularioRegistroProductoProps["data"]] || ""}
            onChange={handleChange}
            fullWidth
            margin="normal"
            variant="outlined"
            required
            sx={{ maxWidth: "400px", textAlign: "left", "& .MuiSelect-select": { textAlign: "left" } }}
            {...textFieldProps}
          >
            {options &&
              options.map((option) => {
                if (typeof option === "object" && "id" in option) {
                  return (
                    <MenuItem key={option.id} value={option.id}>
                      {option.name}
                    </MenuItem>
                  );
                } else if (typeof option === "object" && "value" in option) {
                  return (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  );
                } else {
                  console.error("Formato inesperado en las opciones:", option);
                  return null;
                }
              })}
          </TextField>
        ) : (
          <TextField
            label="Ingresar"
            name={name}
            value={data[name as keyof FormularioRegistroProductoProps["data"]] || ""}
            onChange={handleChange}
            fullWidth
            margin="normal"
            variant="outlined"
            required
            type={type}
            sx={{ maxWidth: "400px" }}
            {...textFieldProps}
          />
        )}
      </Grid2>
    </>
  );

  const filteredSubcategories = subcategories
    .filter((sub) => sub.categoryId === data.categoryId)
    .map((sub) => ({ value: sub.id, label: sub.name }));

  const categoriesWithSizes = ["Correas", "Ropa", "Camas"];

  return (
    <Box
      sx={{
        padding: "20px",
        maxWidth: "1358px",
        margin: "0 auto",
        borderRadius: "10px",
        backgroundColor: themePalette.black10,
        boxShadow: 3,
        marginTop: "34px",
        color: themePalette.primary,
        border: "1px solid #004040",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <Typography
        align="left"
        sx={{
          color: themePalette.primary,
          width: "100%",
          fontSize: "24px",
          paddingLeft: "30px",
          fontWeight: "bold",
          marginBottom: "16px",
        }}
      >
        Información:
      </Typography>
      <Grid2
        container
        spacing={2}
        sx={{
          marginTop: "13px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {createField("Nombre", "name")}
        {createField("Categoría", "categoryId", "text", categories, true)}
        {data.categoryId &&
          createField("Subcategoría", "subcategoryId", "text", filteredSubcategories, true)}
        {categoriesWithSizes.includes(
          categories.find((cat) => cat.value === data.categoryId)?.label || ""
        ) && createField("Talla", "sizeId", "text", sizes, true)}
        {["Comida", "Medicamentos"].includes(
          categories.find((cat) => cat.value === data.categoryId)?.label || ""
        ) && createField("Peso (kg)", "weight", "number")}
        {createField("Stock", "stock", "number")}
        {createField("Precio final", "finalPrice", "number")}
        {createField("Descripción", "description", "text", undefined, false, {
          multiline: true,
          rows: 4,
          width: "700px",
        })}
      </Grid2>
    </Box>
  );
};

export default FormularioRegistroProducto;
