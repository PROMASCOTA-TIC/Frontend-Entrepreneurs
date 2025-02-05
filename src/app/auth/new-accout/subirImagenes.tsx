"use client";

import React, { useState } from "react";
import {
  Button,
  Grid,
  Typography,
  Box,
  Alert,
  CircularProgress,
  IconButton,
  Paper,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { initializeApp } from "firebase/app";
import { themePalette } from "@/config/theme.config";
import { theme } from "@/app/config/theme.config";

// Configuración de Firebase
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

type UploadImagesFormProps = {
  formData: any;
  updateFormData: (data: Partial<any>) => void;
  onSubmit: (finalData: any) => void;
  prevStep: () => void;
};

export const UploadImagesForm: React.FC<UploadImagesFormProps> = ({
  formData,
  updateFormData,
  onSubmit,
  prevStep,
}) => {
  const [localImages, setLocalImages] = useState<File[]>([]);
  const [logoImages, setLogoImages] = useState<File[]>([]);
  const [localPreview, setLocalPreview] = useState<string[]>(Array(4).fill(""));
  const [logoPreview, setLogoPreview] = useState<string[]>(Array(2).fill(""));
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const uploadImage = async (file: File, folder: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      const storageRef = ref(storage, `${folder}/${Date.now()}_${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        null,
        (error) => reject(error),
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(downloadURL);
        }
      );
    });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, type: "local" | "logo") => {
    const files = event.target.files;
    if (!files) return;

    const fileArray = Array.from(files).slice(0, type === "local" ? 4 : 2);
    const previewArray = fileArray.map((file) => URL.createObjectURL(file));

    if (type === "local") {
      setLocalImages(fileArray);
      setLocalPreview([...previewArray, ...Array(4 - previewArray.length).fill("")]);
    } else {
      setLogoImages(fileArray);
      setLogoPreview([...previewArray, ...Array(2 - previewArray.length).fill("")]);
    }
  };

  const handleRemoveImage = (index: number, type: "local" | "logo") => {
    if (type === "local") {
      const updatedImages = localImages.filter((_, i) => i !== index);
      const updatedPreviews = localPreview.map((src, i) => (i === index ? "" : src));
      setLocalImages(updatedImages);
      setLocalPreview(updatedPreviews);
    } else {
      const updatedImages = logoImages.filter((_, i) => i !== index);
      const updatedPreviews = logoPreview.map((src, i) => (i === index ? "" : src));
      setLogoImages(updatedImages);
      setLogoPreview(updatedPreviews);
    }
  };

  const handleSubmit = async () => {
    if (localImages.length !== 4 || logoImages.length !== 2) {
      setError("Debe subir 4 imágenes del local y 2 del logotipo.");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const uploadedLocalImages = await Promise.all(
        localImages.map((file) => uploadImage(file, "locales"))
      );

      const uploadedLogoImages = await Promise.all(
        logoImages.map((file) => uploadImage(file, "logotipos"))
      );

      const updatedFormData = {
        ...formData,
        fotosLocal: uploadedLocalImages,
        fotosLogotipo: uploadedLogoImages,
      };

      const response = await fetch("http://localhost:3001/api/auth/register-entrepreneur", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedFormData),
      });

      if (!response.ok) {
        throw new Error("Error en la solicitud. Verifique los datos e intente nuevamente.");
      }

      const data = await response.json();
      onSubmit(data);
    } catch (error) {
      setError("Hubo un problema al registrar el emprendimiento.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ width: "100%", padding: 3, textAlign: "center" }}>
      <Paper elevation={3} sx={{ padding: 3, borderRadius: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Las fotografias deben ser de su propia autoría
        </Typography>

        {error && <Alert severity="error">{error}</Alert>}

        {[{ type: "local", title: "Fotografías del local" }, { type: "logo", title: "Imágenes del Logotipo" }].map(({ type, title }) => (
          <Box key={type} sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ mb: 1 }}>
              {title}
            </Typography>
            <Button
              variant="outlined"
              component="label"
              startIcon={<CloudUploadIcon />}
              sx={{
                 textTransform: "none",
                              height: "50px",
                              borderRadius: "20px",
                              fontSize: "18px",
                              marginTop: "10px",
                              background: theme.palette.primary.main,
                              color: "white",
                width: "50%", mb: 2 }}
            >
              Seleccionar Archivos
              <input type="file" multiple accept="image/*" hidden onChange={(e) => handleFileChange(e, type as "local" | "logo")} />
            </Button>
            <Grid container spacing={2} direction="column" alignItems="center">
              {(type === "local" ? localPreview : logoPreview).map((src, index) => (
                <Grid item xs={12} key={index} sx={{ position: "relative" }}>
                  <Box
                    sx={{
                      width: "200px",
                      height: "120px",
                      backgroundColor: src ? "transparent" : "#ddd",
                      borderRadius: "8px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1.5rem",
                      fontWeight: "bold",
                      backgroundImage: src ? `url(${src})` : "none",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    {!src && index + 1}
                    {src && (
                      <IconButton
                        aria-label="delete"
                        onClick={() => handleRemoveImage(index, type as "local" | "logo")}
                        sx={{
                          position: "absolute",
                          top: "5px",
                          right: "5px",
                          backgroundColor: "rgba(255, 0, 0, 0.8)",
                          color: "white",
                          "&:hover": { backgroundColor: "red" },
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    )}
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        ))}

        <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 3 }}>
          <Button variant="contained"
          sx={{ 
                                                        backgroundColor: themePalette.primary, 
                                                        textTransform: "none",
                                                        color: "white",
                                                        width: "171px", 
                                                        height: "50px", 
                                                        fontSize: "18px",
                                                        borderRadius: "20px"
                                                      }}
           onClick={prevStep} disabled={loading}>
            Regresar
          </Button>
          <Button variant="contained"
             sx={{ 
                                                           backgroundColor: themePalette.primary, 
                                                           textTransform: "none",
                                                           color: "white",
                                                           width: "171px", 
                                                           height: "50px", 
                                                           fontSize: "18px",
                                                           borderRadius: "20px"
                                                         }}
            onClick={handleSubmit} disabled={loading}>
            {loading ? <CircularProgress size={24} sx={{ color: "#fff" }} /> : "Finalizar"}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};
