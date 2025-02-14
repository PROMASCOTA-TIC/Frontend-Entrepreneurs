"use client";

import React, { useState } from "react";
import { Box, Button, Typography, IconButton, CardMedia } from "@mui/material";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import { theme, themePalette } from "@/app/config/theme.config";

interface ArchivosMultimediaProps {
  onChange: (files: File[]) => void; 
  error?: string; 
}

interface PreviewFile {
  url: string;
  isVideo: boolean;
}

const ArchivosMultimedia: React.FC<ArchivosMultimediaProps> = ({ onChange, error }) => {
  const [previewFiles, setPreviewFiles] = useState<PreviewFile[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleLocalUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newFiles = Array.from(files).slice(0, 4 - previewFiles.length);
      const newPreviews = newFiles.map((file) => ({
        url: URL.createObjectURL(file),
        isVideo: file.type.startsWith("video/"),
      }));
      const updatedFiles = [...selectedFiles, ...newFiles];
      
      setPreviewFiles([...previewFiles, ...newPreviews]);
      setSelectedFiles(updatedFiles);
      onChange(updatedFiles);
    }
  };

  const handleRemoveFile = (index: number) => {
    const updatedFiles = previewFiles.filter((_, i) => i !== index);
    const updatedSelectedFiles = selectedFiles.filter((_, i) => i !== index);

    URL.revokeObjectURL(previewFiles[index].url);
    setPreviewFiles(updatedFiles);
    setSelectedFiles(updatedSelectedFiles);
    onChange(updatedSelectedFiles);
  };

  return (
    <Box sx={{ p: 4, borderRadius: "8px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <Box sx={{ mt: 4, p: 3, borderRadius: "8px", width: "100%", textAlign: "center", background: themePalette.black10, border: error ? "2px solid red" : "1px solid #004040" }}>
        <Typography align="left" sx={{ color: themePalette.primary, width: "100%", fontSize: "24px", paddingLeft: "30px", fontWeight: "bold", marginBottom: "8px" }}>
          Archivos multimedia
        </Typography>

        <input accept=".jpg,.png,.mp4" type="file" multiple onChange={handleLocalUpload} style={{ display: "none" }} id="local-upload" />
        <label htmlFor="local-upload">
          <Button variant="contained" component="span" sx={{ textTransform: "none", width: "218px", height: "50px", borderRadius: "20px", fontSize: "18px", marginTop: "10px", background: theme.palette.primary.main }} startIcon={<FileUploadIcon />} disabled={previewFiles.length >= 4}>
            Seleccionar archivos
          </Button>
        </label>

        <Box display="flex" flexWrap="wrap" mt={2} gap={2} justifyContent="center">
          {previewFiles.map((file, index) => (
            <Box key={index} sx={{ position: "relative", width: "200px", height: "200px" }}>
              {file.isVideo ? (
                <video style={{ width: "200px", height: "200px", objectFit: "cover", borderRadius: "8px" }} src={file.url} controls />
              ) : (
                <CardMedia component="img" sx={{ width: "200px", height: "200px", objectFit: "cover", borderRadius: "8px" }} image={file.url} alt={`Vista previa ${index + 1}`} />
              )}
              <IconButton aria-label="delete" onClick={() => handleRemoveFile(index)} sx={{ position: "absolute", top: "5px", right: "5px", backgroundColor: "rgba(255, 0, 0, 0.8)", color: "white", "&:hover": { backgroundColor: "red" } }}>
                <DeleteIcon />
              </IconButton>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default ArchivosMultimedia;