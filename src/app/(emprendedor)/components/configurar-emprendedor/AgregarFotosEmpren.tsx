"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  IconButton,
  CardMedia,
  Card,
  CircularProgress,
  Alert,
} from "@mui/material";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import "@/assets/styles/emprendedores/general.css";
import { themePalette } from "@/config/theme.config";
import { initializeApp } from "firebase/app";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { theme } from "@/app/config/theme.config";
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

const API_GET = `${URL_BASE}users/entrepreneurs`;
const API_PATCH = `${URL_BASE}users/update-entrepreneur`;


const AgregarFotosEmpren: React.FC = () => {
  const { handleSubmit, setValue, watch } = useForm();
  const router = useRouter();
  
  const localPhotos = watch("localPhotos") || [];
  const logoPhotos = watch("logoPhotos") || [];
  const [entrepreneurId, setEntrepreneurId] = useState<string | null>(null);
  const [previewLocalPhotos, setPreviewLocalPhotos] = useState<string[]>([]);
  const [previewLogoPhotos, setPreviewLogoPhotos] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);


  useEffect(() => {
    const storedEntrepreneurId = localStorage.getItem("entrepreneur_id");
    if (storedEntrepreneurId) {
      setEntrepreneurId(storedEntrepreneurId);
    } else {
      setErrorMessage("No se encontró el ID del emprendedor. Inicie sesión nuevamente.");
    }
  }, []);


  useEffect(() => {
    if (!entrepreneurId) return;

    const fetchData = async () => {
      try {
        const response = await fetch(`${API_GET}/${entrepreneurId}`);
        if (!response.ok) throw new Error("Error al obtener datos");

        const data = await response.json();

        if (data.fotosLocal) setPreviewLocalPhotos(data.fotosLocal.split(", "));
        if (data.fotosLogotipo) setPreviewLogoPhotos(data.fotosLogotipo.split(", "));
      } catch (error) {
        console.error("Error cargando datos:", error);
      }
    };

    fetchData();
  }, [entrepreneurId]);

  const uploadImagesToFirebase = async (files: File[], folder: string) => {
    const urls: string[] = [];
    for (const file of files) {
      const storageRef = ref(
        storage,
        `${folder}/${Date.now()}_${Math.random().toString(36).slice(2)}.jpg`
      );
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      urls.push(downloadURL);
    }
    return urls;
  };

  const handleLocalUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files ? Array.from(event.target.files).slice(0, 4) : [];
    setValue("localPhotos", files);
    setPreviewLocalPhotos(files.map((file) => URL.createObjectURL(file)));
  };

  const handleLogoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files ? Array.from(event.target.files).slice(0, 2) : [];
    setValue("logoPhotos", files);
    setPreviewLogoPhotos(files.map((file) => URL.createObjectURL(file)));
  };

  const handleRemoveLocalPhoto = (index: number) => {
    setPreviewLocalPhotos(previewLocalPhotos.filter((_: string, i: number) => i !== index));
    setValue("localPhotos", localPhotos.filter((_: File, i: number) => i !== index));
  };
  
  const handleRemoveLogoPhoto = (index: number) => {
    setPreviewLogoPhotos(previewLogoPhotos.filter((_: string, i: number) => i !== index));
    setValue("logoPhotos", logoPhotos.filter((_: File, i: number) => i !== index));
  };
  

  const onSubmit = async () => {
    setSuccessMessage(null);

    if (previewLocalPhotos.length < 4) {
      setErrorMessage("Debes 4 imágenes para Fotos de tu local");
      return;
    }
    if (previewLogoPhotos.length < 2) {
      setErrorMessage("Debes  2 imágenes para Logotipo");
      return;
    }
  
    setLoading(true);
    setErrorMessage(null);
  
    try {
      let uploadedLocalUrls = previewLocalPhotos;
      let uploadedLogoUrls = previewLogoPhotos;
  
      if (localPhotos.length > 0) {
        uploadedLocalUrls = await uploadImagesToFirebase(localPhotos, "locales");
      }
      if (logoPhotos.length > 0) {
        uploadedLogoUrls = await uploadImagesToFirebase(logoPhotos, "logotipos");
      }
  
      const body = {
        fotosLocal: uploadedLocalUrls,
        fotosLogotipo: uploadedLogoUrls,
      };
  
      await fetch(`${API_PATCH}/${entrepreneurId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      setSuccessMessage("Fotos actualizadas correctamente");
      console.log("Datos de imágenes actualizados correctamente.");
    } catch (error) {
      console.error(" Error al actualizar las imágenes:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ p: 4, borderRadius: "8px", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Typography sx={{ color: themePalette.primary, fontSize: "36px", fontWeight: "bold" }}>
          Agregar fotografías del emprendimiento
        </Typography>
      {successMessage && <Alert severity="success">{successMessage}</Alert>}

<Box sx={{ mt: 4, p: 3, width: "100%", background: themePalette.black10, borderRadius: "8px", textAlign: "center" }}>
  <Typography sx={{ color: themePalette.primary, fontSize: "18px", fontWeight: "600" }}>Fotos de tu local</Typography>
  <input accept=".jpg,.png" type="file" multiple onChange={handleLocalUpload} style={{ display: "none" }} id="local-upload" />
  <label htmlFor="local-upload">
    <Button variant="contained" component="span" startIcon={<FileUploadIcon />}
    sx={{
      textTransform: "none",
                   height: "50px",
                   borderRadius: "20px",
                   fontSize: "18px",
                   marginTop: "10px",
                   background: theme.palette.primary.main,
                   color: "white",
     width: "20%", mb: 2 }}
    >Seleccionar Imágenes</Button>
  </label>
  <Box display="flex" flexWrap="wrap" gap={2} justifyContent="center" mt={2}>
    {previewLocalPhotos.map((src, index) => (
      <Card key={index} sx={{ width: 180, height: 180, position: "relative" }}>
        <CardMedia component="img" sx={{ width: "100%", height: "100%", objectFit: "cover" }} image={src} alt={`Local ${index}`} />
        
        <IconButton 
          onClick={() => handleRemoveLocalPhoto(index)} 
          sx={{ position: "absolute", top: 5, right: 5, background: "rgba(255,0,0,0.8)", color: "white", '&:hover': { background: "red" } }}
        >
          <DeleteIcon />
        </IconButton>

      </Card>
    ))}
  </Box>
</Box>



<Box sx={{ mt: 4, p: 3, width: "100%", background: themePalette.black10, borderRadius: "8px", textAlign: "center" }}>
  <Typography sx={{ color: themePalette.primary, fontSize: "18px", fontWeight: "600" }}>Logotipo</Typography>
  <input accept=".jpg,.png" type="file" multiple onChange={handleLogoUpload} style={{ display: "none" }} id="logo-upload" />
  <label htmlFor="logo-upload">
    <Button variant="contained" component="span" 
    startIcon={<FileUploadIcon />}
     sx={{
                     textTransform: "none",
                                  height: "50px",
                                  borderRadius: "20px",
                                  fontSize: "18px",
                                  marginTop: "10px",
                                  background: theme.palette.primary.main,
                                  color: "white",
                    width: "20%", mb: 2 }}
    >Seleccionar Imágenes</Button>
  </label>
  <Box display="flex" flexWrap="wrap" gap={2} justifyContent="center" mt={2}>
    {previewLogoPhotos.map((src, index) => (
      <Card key={index} sx={{ width: 180, height: 180, position: "relative" }}>
        <CardMedia component="img" sx={{ width: "100%", height: "100%", objectFit: "cover" }} image={src} alt={`Logo ${index}`} />
        
        <IconButton 
          onClick={() => handleRemoveLogoPhoto(index)} 
          sx={{ position: "absolute", top: 5, right: 5, background: "rgba(255,0,0,0.8)", color: "white", '&:hover': { background: "red" } }}
        >
          <DeleteIcon />
        </IconButton>

      </Card>
    ))}
  </Box>
</Box>

{errorMessage && (
  <Typography sx={{ color: "red", fontSize: "16px", mt: 2 }}>
    {errorMessage}
  </Typography>
)}

            <Box  sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 3 }}>
            <Button 
            sx={{ 
                                                                    backgroundColor: themePalette.primary, 
                                                                    textTransform: "none",
                                                                    color: "white",
                                                                    width: "171px", 
                                                                    height: "50px", 
                                                                    fontSize: "18px",
                                                                    borderRadius: "20px"
                                                                  }}
            variant="contained" onClick={() => router.push("/inicio")}>Cancelar</Button>
         <Button type="submit" variant="contained" disabled={loading}
         sx={{ 
                                                                 backgroundColor: themePalette.primary, 
                                                                 textTransform: "none",
                                                                 color: "white",
                                                                 width: "171px", 
                                                                 height: "50px", 
                                                                 fontSize: "18px",
                                                                 borderRadius: "20px"
                                                               }}
         >{loading ? <CircularProgress size={24} /> : "Guardar"}</Button>
        </Box>
      </Box>
    </form>
  );
};

export default AgregarFotosEmpren;
