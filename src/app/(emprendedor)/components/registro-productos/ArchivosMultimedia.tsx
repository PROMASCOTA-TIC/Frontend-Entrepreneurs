"use client";

import React, { useState } from "react";
import { Box, Button, Typography, IconButton, Card, CardMedia } from "@mui/material";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import { theme, themePalette } from "@/app/config/theme.config";

interface ArchivosMultimediaProps {
  value: string[]; // URLs actuales de los archivos multimedia
  onChange: (files: string[]) => void; // Callback para actualizar las URLs
}

const ArchivosMultimedia: React.FC<ArchivosMultimediaProps> = ({ value, onChange }) => {
  const [previewUrls, setPreviewUrls] = useState<string[]>(value || []);

  const handleLocalUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newFiles = Array.from(files).slice(0, 4 - previewUrls.length); // Limitar a 4 imágenes
      const newUrls = newFiles.map((file) => URL.createObjectURL(file)); // Crear URLs temporales
      const updatedUrls = [...previewUrls, ...newUrls];
      setPreviewUrls(updatedUrls); // Actualizar vista previa
      onChange(updatedUrls); // Pasar los valores al componente padre
    }
  };

  const handleRemovePhoto = (index: number) => {
    const updatedUrls = previewUrls.filter((_, i) => i !== index);
    URL.revokeObjectURL(previewUrls[index]);
    setPreviewUrls(updatedUrls);
    onChange(updatedUrls);
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
          Archivos multimedia
        </Typography>
        <input
          accept=".jpg,.png"
          type="file"
          multiple
          onChange={handleLocalUpload}
          style={{ display: "none" }}
          id="local-upload"
        />
        <label htmlFor="local-upload">
          <Button
            variant="contained"
            component="span"
            sx={{
              textTransform: "none",
              width: "218px",
              height: "50px",
              borderRadius: "20px",
              fontSize: "18px",
              marginTop: "10px",
              background: theme.palette.primary.main,
              "@media (max-width: 600px)": {
                width: "150px",
                height: "40px",
                fontSize: "14px",
              },
            }}
            startIcon={<FileUploadIcon />}
            disabled={previewUrls.length >= 4}
          >
            Seleccionar Archivos
          </Button>
        </label>
        <Box display="flex" flexWrap="wrap" mt={2} gap={2} justifyContent="center">
          {previewUrls.map((url, index) => (
            <Box
              key={index}
              sx={{
                position: "relative",
                width: "200px",
                height: "200px",
              }}
            >
              <CardMedia
                component="img"
                sx={{
                  width: "200px",
                  height: "200px",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
                image={url}
                alt={`Vista previa ${index + 1}`}
              />
              <IconButton
                aria-label="delete"
                onClick={() => handleRemovePhoto(index)}
                sx={{
                  position: "absolute",
                  top: "5px",
                  right: "5px",
                  backgroundColor: "rgba(255, 0, 0, 0.8)",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "red",
                  },
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          ))}
          {previewUrls.length < 4 &&
            Array(4 - previewUrls.length)
              .fill(null)
              .map((_, index) => (
                <Box
                  key={index}
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
                  <Typography variant="body2">Subir imagen</Typography>
                </Box>
              ))}
        </Box>
      </Box>
    </Box>
  );
};

export default ArchivosMultimedia;
