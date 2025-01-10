"use client";

import React, { useState } from "react";
import { Box, Button, Typography, IconButton, Card, CardMedia, CardContent } from "@mui/material";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import { themePalette } from "@/app/config/theme.config";

interface ArchivosMultimediaProps {
  value: string; // URL actual del archivo multimedia
  onChange: (file: string) => void; // Callback para actualizar la URL del archivo multimedia
}

const ArchivosMultimedia: React.FC<ArchivosMultimediaProps> = ({ value, onChange }) => {
  const [previewUrl, setPreviewUrl] = useState<string>(value || ""); // Manejo de la URL temporal para vista previa

  const handleLocalUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files[0]) {
      const fileUrl = URL.createObjectURL(files[0]); // Crear URL temporal
      setPreviewUrl(fileUrl); // Actualizar la vista previa
      onChange(fileUrl); // Pasar el valor al componente padre
    }
  };

  const handleRemovePhoto = () => {
    setPreviewUrl(""); // Limpiar la vista previa
    onChange(""); // Actualizar en el componente padre
  };

  return (
    <Box
      sx={{
        p: 4,
        borderRadius: "8px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          mt: 4,
          p: 3,
          borderRadius: "8px",
          width: "100%",
          textAlign: "center",
          background: themePalette.black10,
          border: "1px solid #004040",
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
          Archivo multimedia
        </Typography>
        <input
          accept=".jpg,.png"
          type="file"
          onChange={handleLocalUpload}
          style={{ display: "none" }}
          id="local-upload"
        />
        <label htmlFor="local-upload">
          <Button
            variant="contained"
            component="span"
            sx={{
              background: themePalette.primary,
              color: themePalette.cwhite,
              textTransform: "none",
              mt: 2,
            }}
            startIcon={<FileUploadIcon />}
          >
            Seleccionar Archivo
          </Button>
        </label>
        <Box display="flex" flexWrap="wrap" mt={2} gap={2} justifyContent="center">
          {previewUrl ? (
            <Card sx={{ width: 200, height: 200 }}>
              <CardMedia
                component="img"
                sx={{
                  width: "200px",
                  height: "200px",
                  objectFit: "cover", // Ajustar la imagen al tamaño del contenedor
                }}
                image={previewUrl}
                alt="Vista previa"
              />
              <CardContent>
                <IconButton
                  aria-label="delete"
                  onClick={handleRemovePhoto}
                  color="secondary"
                  size="small"
                >
                  <DeleteIcon />
                </IconButton>
              </CardContent>
            </Card>
          ) : (
            <Box
              sx={{
                width: 200,
                height: 200,
                border: "2px dashed #ccc",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#ccc",
              }}
            >
              <Typography variant="body2">No hay archivo seleccionado</Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default ArchivosMultimedia;
