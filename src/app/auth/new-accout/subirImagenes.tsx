"use client";

import React, { useState } from "react";
import {
  Button,
  Grid,
  Typography,
  Box,
  Alert,
  CircularProgress,
} from "@mui/material";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { initializeApp } from "firebase/app";
import { themePalette } from "@/config/theme.config";

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
  formData: any; // ⚠️ Asegurar que acepta todos los datos del formulario
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
  const [localPreview, setLocalPreview] = useState<string[]>([]);
  const [logoPreview, setLogoPreview] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Función para subir imágenes a Firebase Storage
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

  // Manejar la selección de archivos
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, type: "local" | "logo") => {
    const files = event.target.files;
    if (!files) return;

    const fileArray = Array.from(files);
    const previewArray = fileArray.map((file) => URL.createObjectURL(file));

    if (type === "local") {
      setLocalImages(fileArray);
      setLocalPreview(previewArray);
    } else {
      setLogoImages(fileArray);
      setLogoPreview(previewArray);
    }
  };

  // ✅ Función corregida para enviar todos los datos acumulados
  const handleSubmit = async () => {
    if (localImages.length !== 4 || logoImages.length !== 2) {
      setError("Debe subir exactamente 4 imágenes del local y 2 del logotipo.");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Subir imágenes del local
      const uploadedLocalImages = await Promise.all(
        localImages.map((file) => uploadImage(file, "locales"))
      );

      // Subir logotipos
      const uploadedLogoImages = await Promise.all(
        logoImages.map((file) => uploadImage(file, "logotipos"))
      );

      console.log("✅ Imágenes subidas correctamente");
      console.log("📌 URLs Local:", uploadedLocalImages);
      console.log("📌 URLs Logotipo:", uploadedLogoImages);

      // 🔹 Actualizar formData con TODA la información antes de enviarla
      const updatedFormData = {
        ...formData, // ✅ Mantener todos los datos previos del formulario
        fotosLocal: uploadedLocalImages,
        fotosLogotipo: uploadedLogoImages,
      };

      // 🔍 Verificar en consola si los datos están completos antes de enviarlos
      console.log("📤 Enviando datos al backend:", JSON.stringify(updatedFormData, null, 2));

      // Enviar los datos completos al backend
      const response = await fetch("http://localhost:3001/api/auth/register-entrepreneur", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedFormData),
      });

      if (!response.ok) {
        throw new Error("Error en la solicitud. Verifique los datos e intente nuevamente.");
      }

      const data = await response.json();
      console.log("✅ Registro exitoso en backend:", data);
      onSubmit(data);
    } catch (error) {
      console.error("❌ Error al enviar los datos al backend:", error);
      setError("Hubo un problema al registrar el emprendimiento.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ width: "100%", padding: 3, textAlign: "center" }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        📸 Subir imágenes del negocio
      </Typography>

      {error && <Alert severity="error">{error}</Alert>}

      <Grid container spacing={2} justifyContent="center">
        {/* Imágenes del local */}
        <Grid item xs={12} sm={6}>
          <Typography>🏢 Imágenes del Local (4)</Typography>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => handleFileChange(e, "local")}
            style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "4px" }}
          />
          <Grid container spacing={1} sx={{ mt: 1 }}>
            {localPreview.map((src, index) => (
              <Grid item xs={3} key={index}>
                <img src={src} alt={`Local ${index + 1}`} style={{ width: "100%", borderRadius: "5px" }} />
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* Imágenes del logotipo */}
        <Grid item xs={12} sm={6}>
          <Typography>📌 Imágenes del Logotipo (2)</Typography>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => handleFileChange(e, "logo")}
            style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "4px" }}
          />
          <Grid container spacing={1} sx={{ mt: 1 }}>
            {logoPreview.map((src, index) => (
              <Grid item xs={6} key={index}>
                <img src={src} alt={`Logo ${index + 1}`} style={{ width: "100%", borderRadius: "5px" }} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>

      <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 3 }}>
        <Button
          variant="contained"
          sx={{ backgroundColor: themePalette.primary }}
          onClick={prevStep}
          disabled={loading}
        >
          Regresar
        </Button>

        <Button
          variant="contained"
          sx={{ backgroundColor: themePalette.primary }}
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} sx={{ color: "#fff" }} /> : "Guardar y Enviar"}
        </Button>
      </Box>
    </Box>
  );
};
