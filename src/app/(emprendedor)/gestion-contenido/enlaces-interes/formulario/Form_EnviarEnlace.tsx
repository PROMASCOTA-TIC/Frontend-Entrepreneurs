"use client";

import React from 'react'
import { Box, Grid2, MenuItem, Select, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Btn_GuardarCancelar from '@/components/gestionContenido/barraBotones/Btn_GuardarCancelar';

import '/src/assets/styles/gestionContenido/general.css';
import '/src/assets/styles/gestionContenido/estilos.css';
import { enviarEnlaceSchema } from '@/validations/gestion-contenido/enviarEnlaceSchema';
import ArchivosMultimedia from '@/components/gestionContenido/ArchivosMultimedia';

type Inputs = {
  categoria: string;
  titulo: string;
  descripcion: string;
  fuentes: string;
}

const Form_EnviarEnlace: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>({
    resolver: zodResolver(enviarEnlaceSchema),
    mode: 'onChange', // Valida en tiempo real
  });

  const onSubmit = (data: Inputs) => {
    console.log(data);
  };

  return (
    <div>
      <Box
        className='flex-center p-34'
        component="form"
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
              <h2 className='h2-bold txtcolor-primary'>Nombre</h2>
            </Grid2>

            {/* Nombre: Input */}
            <Grid2 size={{ xs: 12, sm: 8, md: 8 }}>
              <Grid2 size={12}>
                <TextField
                  disabled
                  placeholder="Nombre del usuario"
                  className='minima-regular'

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
              <h2 className='h2-bold txtcolor-primary'>Correo</h2>
            </Grid2>

            {/* Correo: Input */}
            <Grid2 size={{ xs: 12, sm: 8, md: 8 }}>
              <Grid2 size={12}>
                <TextField
                  disabled
                  placeholder="Correo del usuario"
                  className='minima-regular'

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
              <h2 className='h2-bold txtcolor-primary'>Categoría</h2>
            </Grid2>

            {/* Categoria: Select */}
            <Grid2 size={{ xs: 12, sm: 8, md: 8 }}>
              <Grid2 size={12}>
                <Select
                  defaultValue=""
                  displayEmpty
                  className='minima-regular'
                  {...register('categoria')}
                  error={!!errors.categoria}
                  sx={{
                    backgroundColor: 'white',
                    borderRadius: '15px',
                    minWidth: '100%',
                  }}
                >
                  <MenuItem value="" disabled>
                    <span style={{ color: '#A9A9A9', fontStyle: 'normal' }}>Seleccionar</span>
                  </MenuItem>
                  <MenuItem value="categoria1">Categoría 1</MenuItem>
                  <MenuItem value="categoria2">Categoría 2</MenuItem>
                  <MenuItem value="categoria3">Categoría 3</MenuItem>
                </Select>
              </Grid2>

              <Grid2 size={12}>
                {errors.categoria && (
                  <p className="text-red-500" style={{ margin: '4px' }}>
                    {errors.categoria.message}
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
              <h2 className='h2-bold txtcolor-primary'>Título</h2>
            </Grid2>

            {/* Titulo: Input */}
            <Grid2 size={{ xs: 12, sm: 8, md: 8 }}>
              <Grid2 size={12}>
                <TextField
                  placeholder="Ingresar"
                  className='minima-regular'
                  {...register('titulo')}
                  error={!!errors.titulo}
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
                {errors.titulo && (
                  <p className="text-red-500" style={{ margin: '4px' }}>
                    {errors.titulo.message}
                  </p>
                )}
              </Grid2>
            </Grid2>

            {/* Descripcion */}
            <Grid2 size={{ xs: 12, sm: 4, md: 4 }}>
              <h2 className='h2-bold txtcolor-primary'>Descripción</h2>
            </Grid2>

            {/* Descripcion: Input */}
            <Grid2 size={{ xs: 12, sm: 8, md: 8 }}>
              <Grid2 size={12}>
                <TextField
                  id="outlined-multiline-static"
                  multiline
                  rows={2}
                  placeholder="Ingresar"
                  {...register('descripcion')}
                  error={!!errors.descripcion}
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
                    },
                  }}
                />
              </Grid2>

              <Grid2 size={12}>
                {errors.descripcion && (
                  <p className="text-red-500" style={{ marginTop: '4px' }}>
                    {errors.descripcion.message}
                  </p>
                )}
              </Grid2>
            </Grid2>

            {/* Fuentes */}
            <Grid2 size={{ xs: 12, sm: 4, md: 4 }}>
              <h2 className='h2-bold txtcolor-primary'>Fuentes</h2>
            </Grid2>

            {/* Fuentes: Input */}
            <Grid2 size={{ xs: 12, sm: 8, md: 8 }}>
              <Grid2 size={12}>
                <TextField
                  placeholder="Ingresar"
                  className='minima-regular'
                  {...register('fuentes')}
                  error={!!errors.titulo}
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
                {errors.fuentes && (
                  <p className="text-red-500" style={{ margin: '4px' }}>
                    {errors.fuentes.message}
                  </p>
                )}
              </Grid2>
            </Grid2>

            {/* Archivos multimedia */}
            <Grid2 size={12}>
              <h2 className='h2-bold txtcolor-primary txt-center'>Archivos Multimedia</h2>
            </Grid2>

            <Grid2 size={12} className='flex-center'>
              <ArchivosMultimedia />
            </Grid2>

            {/* Botones */}
            <Grid2 size={12}>
              <div style={{ paddingTop: '21px' }}>
                <Btn_GuardarCancelar
                  linkGuardar="/gestion-contenido/preguntas-frecuentes/crear-pregunta"
                  linkCancelar="/gestion-contenido/preguntas-frecuentes"
                />
              </div>
            </Grid2>
          </Grid2>
        </Box>
      </Box >
    </div>
  )
}

export default Form_EnviarEnlace;
