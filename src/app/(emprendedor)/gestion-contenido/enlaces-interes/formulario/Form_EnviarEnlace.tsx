"use client";

import React, { useEffect, useState } from 'react'
import { Alert, Box, Grid2, MenuItem, Select, Snackbar, TextField } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import '/src/assets/styles/gestionContenido/general.css';
import '/src/assets/styles/gestionContenido/estilos.css';
import { enviarEnlaceSchema } from '@/validations/gestion-contenido/enviarEnlaceSchema';
import ArchivosMultimedia from '@/components/gestionContenido/ArchivosMultimedia';
import Btn_GuardarCancelar from '@/components/gestionContenido/barraBotones/Btn_GuardarCancelar';
import { useRouter } from "next/navigation";

import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

// Ajusta tu tipo Inputs para que coincida con el Zod Schema (enviarEnlaceSchema).
// Agrega "imagesUrl" si en tu backend es opcional, etc.
type Inputs = {
  ownerName: string;
  ownerEmail: string;
  category: string;      // Lo manejaremos como string
  title: string;
  description: string;
  sourceLink: string;
  imagesUrl?: string;    // Si lo quieres opcional
};

const categoryMap: Record<string, number> = {
  higiene: 1,
  salud: 2,
  adiestramiento: 3,
  nutricion: 4,
  seguridad: 5,
  actividades: 6,
};

// Configuración de Firebase
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

const Form_EnviarEnlace: React.FC = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]); // Almacena los archivos seleccionados
  const router = useRouter();

  //********************************************* */
  const [userData, setUserData] = useState({ name: "", email: "" });

  // 1. Configurar React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(enviarEnlaceSchema),
    mode: "onChange", // Valida en tiempo real
    defaultValues: {
      // **************************************************************************
      ownerName: userData.name,
      ownerEmail: userData.email,
    },
  });

  const [open, setOpen] = useState(false);

  // *************************************************
  // Crear una funcion que obtenga datos de un usuario en base al id
  // Tomar el id de localstorage.get('user_id') y hacer una peticion a la API

  // const getUserData = async () => {
  //   //const userId = localStorage.getItem('entrepreneurId');
  //   const entrepreneurId = "fcbb22fe-bfc5-4c63-8fe7-bb01f762f604"; // Cambiar por el id real
  //   if (!entrepreneurId) return;

  //   try {
  //     const response = await fetch(`http://localhost:3001/api/users/entrepreneurs/${entrepreneurId}`);
  //     if (!response.ok) {
  //       throw new Error(`Error al obtener datos de usuario. Status: ${response.status}`);
  //     }

  //     const userData = await response.json();

  //     setUserData(userData);

  //     console.log("Datos de usuario:", userData);
  //   } catch (error) {
  //     console.error("Error al obtener datos de usuario:", error);
  //   }
  // }

  // // usar hook useEffect llamar a la funcion de arriba
  // useEffect(() => {
  //   getUserData();
  // }, []);
  /**************************************************************************************************************** */

  // Función para subir archivos a Firebase
  const uploadMediaToFirebase = async (files: File[]) => {
    console.log("Subiendo archivos:", files); // Agregar log

    if (files.length === 0) return "";

    const urls: string[] = [];
    for (const file of files) {
      try {
        const storageRef = ref(storage, `gestion-contenido/enlaces-interes/${Date.now()}_${file.name}`);
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);
        urls.push(downloadURL);
      } catch (error) {
        console.error("Error al subir archivo:", error);
      }
    }

    const urlsString = urls.join(","); // Convertir el array a string separado por comas
    console.log("URLs de archivos subidos:", urlsString);
    return urlsString;
  };

  // 2. Función onSubmit con React Hook Form
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log("Formulario enviado con datos:", data); // Agregar log
    try {
      setError("");
      setSuccess("");

      // Subir archivos a Firebase y obtener un string de URLs
      const imagesUrlString = await uploadMediaToFirebase(selectedFiles);

      const createLinkDto = {
        ownerName: data.ownerName,
        ownerEmail: data.ownerEmail,
        categoryId: categoryMap[data.category],
        title: data.title,
        description: data.description,
        sourceLink: data.sourceLink,
        imagesUrl: imagesUrlString,
      };

      console.log("Datos a enviar al backend:", createLinkDto); // Agregar log

      // 3. Enviar al backend
      const response = await fetch("http://localhost:3001/api/links/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(createLinkDto),
      });

      if (!response.ok) {
        throw new Error(`Error al crear enlace. Status: ${response.status}`);
      }

      setOpenSnackbar(true);
      setTimeout(() => {
        router.push("/gestion-contenido/enlaces-interes");
      }, 4000);
    } catch (err: any) {
      console.error("Error en el envío:", err);
      setError(err.message || "Ocurrió un error al crear el enlace");
      setOpen(true);
    }
  };

  return (
    <div>
      <form
        className='flex-center p-34'
        onSubmit={handleSubmit(onSubmit)}
      >
        <Box
          className='bg-black10 flex-column p-34'
          sx={{
            width: { xs: '90%', sm: '90%', md: '70%' },
            border: '1px solid #004040',
            borderRadius: '10px',
            gap: '21px'
          }}
        >
          <Grid2 container spacing={2}>
            {/* INFORMACION DEL USUARIO */}
            <Grid2 size={12}>
              <h2 className='h2-bold txtcolor-primary txt-center'>Información del usuario</h2>
            </Grid2>

            {/* Nombre */}
            <Grid2 size={{ xs: 12, sm: 4, md: 4 }}>
              <h2 className='h2-bold txtcolor-primary'>Nombre *</h2>
            </Grid2>

            {/* Nombre: Input */}
            <Grid2 size={{ xs: 12, sm: 8, md: 8 }}>
              <Grid2 size={12}>
                <TextField
                  //disabled
                  placeholder="Nombre del usuario"
                  className='minima-regular'
                  required
                  {...register('ownerName')}
                  error={!!errors.ownerName}
                  sx={{
                    borderRadius: '15px',
                    backgroundColor: 'white',
                    width: '100%',
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderRadius: '15px',
                      },
                    },
                  }}
                />
              </Grid2>
            </Grid2>

            {/* Correo */}
            <Grid2 size={{ xs: 12, sm: 4, md: 4 }}>
              <h2 className='h2-bold txtcolor-primary'>Correo *</h2>
            </Grid2>

            {/* Correo: Input */}
            <Grid2 size={{ xs: 12, sm: 8, md: 8 }}>
              <Grid2 size={12}>
                <TextField
                  //disabled
                  placeholder="Correo del usuario"
                  className='minima-regular'
                  required
                  {...register('ownerEmail')}
                  error={!!errors.ownerEmail}
                  sx={{
                    borderRadius: '15px',
                    backgroundColor: 'white',
                    width: '100%',
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderRadius: '15px',
                      },
                    },
                  }}
                />
              </Grid2>
            </Grid2>


            {/* SECCION DE TIPO DE CONTENIDO */}
            <Grid2 size={12}>
              <h2 className='h2-bold txtcolor-primary txt-center'>Tipo de contenido</h2>
            </Grid2>

            {/* Categoria */}
            <Grid2 size={{ xs: 12, sm: 4, md: 4 }}>
              <h2 className='h2-bold txtcolor-primary'>Categoría *</h2>
            </Grid2>

            {/* Categoria: Select */}
            <Grid2 size={{ xs: 12, sm: 8, md: 8 }}>
              <Grid2 size={12}>
                <Select
                  defaultValue=""
                  displayEmpty
                  className='minima-regular'
                  {...register('category')}
                  error={!!errors.category}
                  sx={{
                    backgroundColor: 'white',
                    borderRadius: '15px',
                    minWidth: '100%',
                  }}
                >
                  <MenuItem value="" disabled>Seleccionar</MenuItem>
                  <MenuItem value="higiene">Higiene</MenuItem>
                  <MenuItem value="salud">Salud</MenuItem>
                  <MenuItem value="adiestramiento">Adiestramiento</MenuItem>
                  <MenuItem value="nutricion">Nutrición</MenuItem>
                  <MenuItem value="seguridad">Seguridad</MenuItem>
                  <MenuItem value="actividades">Actividades</MenuItem>
                </Select>
              </Grid2>

              <Grid2 size={12}>
                {errors.category && (
                  <p className="text-red-500" style={{ margin: '4px' }}>
                    {errors.category.message}
                  </p>
                )}
              </Grid2>
            </Grid2>

            {/* SECCION DE DETALLES DE CONTENIDO */}
            <Grid2 size={12}>
              <h2 className='h2-bold txtcolor-primary txt-center'>Detalles del contenido</h2>
            </Grid2>

            {/* Titulo */}
            <Grid2 size={{ xs: 12, sm: 4, md: 4 }}>
              <h2 className='h2-bold txtcolor-primary'>Título *</h2>
            </Grid2>

            {/* Titulo: Input */}
            <Grid2 size={{ xs: 12, sm: 8, md: 8 }}>
              <Grid2 size={12}>
                <TextField
                  placeholder="Ingresar"
                  className='minima-regular'
                  {...register('title')}
                  error={!!errors.title}
                  sx={{
                    borderRadius: '15px',
                    backgroundColor: 'white',
                    width: '100%',
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderRadius: '15px',
                      },
                    },
                  }}
                />
              </Grid2>

              <Grid2 size={12}>
                {errors.title && (
                  <p className="text-red-500" style={{ margin: '4px' }}>
                    {errors.title.message}
                  </p>
                )}
              </Grid2>
            </Grid2>

            {/* Descripcion */}
            <Grid2 size={{ xs: 12, sm: 4, md: 4 }}>
              <h2 className='h2-bold txtcolor-primary'>Descripción *</h2>
            </Grid2>

            {/* Descripcion: Input */}
            <Grid2 size={{ xs: 12, sm: 8, md: 8 }}>
              <Grid2 size={12}>
                <TextField
                  id="outlined-multiline-static"
                  multiline
                  rows={2}
                  placeholder="Ingresar"
                  {...register('description')}
                  error={!!errors.description}
                  sx={{
                    borderRadius: '15px',
                    backgroundColor: 'white',
                    width: '100%',
                    minHeight: '100px',
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderRadius: '15px',
                      },
                    },
                    '& .MuiInputBase-input': {
                      minHeight: '100px',
                      whiteSpace: 'pre-line',
                    },
                  }}
                />
              </Grid2>

              <Grid2 size={12}>
                {errors.description && (
                  <p className="text-red-500" style={{ marginTop: '4px' }}>
                    {errors.description.message}
                  </p>
                )}
              </Grid2>
            </Grid2>

            {/* Fuentes */}
            <Grid2 size={{ xs: 12, sm: 4, md: 4 }}>
              <h2 className='h2-bold txtcolor-primary'>Fuentes *</h2>
            </Grid2>

            {/* Fuentes: Input */}
            <Grid2 size={{ xs: 12, sm: 8, md: 8 }}>
              <Grid2 size={12}>
                <TextField
                  placeholder="Ingresar"
                  className='minima-regular'
                  {...register('sourceLink')}
                  error={!!errors.sourceLink}
                  sx={{
                    borderRadius: '15px',
                    backgroundColor: 'white',
                    width: '100%',
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderRadius: '15px',
                      },
                    },
                  }}
                />
              </Grid2>

              <Grid2 size={12}>
                {errors.sourceLink && (
                  <p className="text-red-500" style={{ margin: '4px' }}>
                    {errors.sourceLink.message}
                  </p>
                )}
              </Grid2>
            </Grid2>

            <Grid2 size={12}>
              <h2 className='h2-bold txtcolor-primary txt-center'>Archivos Multimedia</h2>
            </Grid2>

            <Grid2 size={12} className='flex-center'>
              <ArchivosMultimedia onChange={(files) => setSelectedFiles(files)} />
            </Grid2>

            {/* Botones */}
            <Grid2 size={12}>
              <div style={{ paddingTop: '21px' }}>
                <Btn_GuardarCancelar
                  linkCancelar="/gestion-contenido/enlaces-interes"
                />

                <Snackbar
                  open={openSnackbar}
                  autoHideDuration={4000}
                  onClose={() => setOpenSnackbar(false)}
                  anchorOrigin={{ vertical: "top", horizontal: "center" }}
                >
                  <Alert
                    onClose={() => setOpenSnackbar(false)}
                    severity="success"
                    sx={{ width: "100%" }}
                  >
                    Guardado con éxito. Redirigiendo...
                  </Alert>
                </Snackbar>
              </div>
            </Grid2>
          </Grid2>
        </Box>
      </form >
    </div>
  )
}

export default Form_EnviarEnlace;
