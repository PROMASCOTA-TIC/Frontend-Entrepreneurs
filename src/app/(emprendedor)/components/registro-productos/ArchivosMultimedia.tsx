"use client";

import React, { useState } from "react";
import { Box, Button, Typography, IconButton, CardMedia } from "@mui/material";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import { theme, themePalette } from "@/app/config/theme.config";

interface ArchivosMultimediaProps {
  value: string[]; 
  onChange: (files: string[]) => void; 
  error?: string; 
}

interface PreviewFile {
  url: string;
  isVideo: boolean;
}

const ArchivosMultimedia: React.FC<ArchivosMultimediaProps> = ({ value, onChange, error }) => {
  const [previewFiles, setPreviewFiles] = useState<PreviewFile[]>(
    value.map((url) => ({ url, isVideo: false }))
  );

  const handleLocalUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newFiles = Array.from(files).slice(0, 4 - previewFiles.length);
      const newPreviews = newFiles.map((file) => ({
        url: URL.createObjectURL(file),
        isVideo: file.type.startsWith("video/"),
      }));
      const updatedFiles = [...previewFiles, ...newPreviews];
      setPreviewFiles(updatedFiles);
      onChange(updatedFiles.map((file) => file.url)); 
    }
  };

  const handleRemoveFile = (index: number) => {
    const updatedFiles = previewFiles.filter((_, i) => i !== index);
    URL.revokeObjectURL(previewFiles[index].url);
    setPreviewFiles(updatedFiles);
    onChange(updatedFiles.map((file) => file.url));
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
          border: error ? "2px solid red" : "1px solid #004040",
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
            marginBottom: "8px",
          }}
        >
          Archivos multimedia
        </Typography>

        <Typography
          align="left"
          sx={{
            color: themePalette.black,
            width: "100%",
            fontSize: "16px",
            paddingLeft: "30px",
            marginBottom: "16px",
          }}
        >
          Nota: El material multimedia debe ser de su propia autoría.
        </Typography>

        <input
          accept=".jpg,.png,.mp4"
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
            disabled={previewFiles.length >= 4}
          >
            Seleccionar archivos
          </Button>
        </label>
        <Box display="flex" flexWrap="wrap" mt={2} gap={2} justifyContent="center">
          {previewFiles.map((file, index) =>
            file.isVideo ? (
              <Box
                key={index}
                sx={{
                  position: "relative",
                  width: "200px",
                  height: "200px",
                }}
              >
                <video
                  style={{
                    width: "200px",
                    height: "200px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                  src={file.url}
                  controls
                />
                <IconButton
                  aria-label="delete"
                  onClick={() => handleRemoveFile(index)}
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
            ) : (
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
                  image={file.url}
                  alt={`Vista previa ${index + 1}`}
                />
                <IconButton
                  aria-label="delete"
                  onClick={() => handleRemoveFile(index)}
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
            )
          )}
          {previewFiles.length < 4 &&
            Array(4 - previewFiles.length)
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
                  <Typography variant="body2">Subir archivo</Typography>
                </Box>
              ))}
        </Box>
        {error && (
          <Typography
            sx={{
              color: "red",
              fontSize: "14px",
              marginTop: "10px",
              textAlign: "left",
            }}
          >
            {error}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default ArchivosMultimedia;
