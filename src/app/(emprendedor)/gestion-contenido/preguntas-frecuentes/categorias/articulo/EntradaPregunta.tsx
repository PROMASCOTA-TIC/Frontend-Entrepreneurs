"use client"; // Para que este componente también sea un Client Component

import React, { useState } from 'react';
import { Box, Button, Divider } from '@mui/material';
import { green, red } from '@mui/material/colors';
import { Check, Close } from '@mui/icons-material';
import EncuestaPositiva from './EncuestaPositiva';
import EncuestaNegativa from './EncuestaNegativa';

import '/src/assets/styles/gestionContenido/general.css';

const EntradaPregunta: React.FC = () => {
    const [openPositive, setOpenPositive] = useState(false);
    const [openNegative, setOpenNegative] = useState(false);

    const handleOpenPositive = async () => {
        await sendFeedbackToDatabase("visto");
        setOpenPositive(true);
    };

    const handleOpenNegative = async () => {
        await sendFeedbackToDatabase("x");
        setOpenNegative(true);
    };

    const sendFeedbackToDatabase = async (response: string) => {
        // Aquí implementas la lógica para enviar la respuesta a tu base de datos
        console.log("Enviando respuesta:", response);
    };

    return (
        <Box
            className='flex-column'
            sx={{
                padding: '34px 55px',
                gap: '21px'
            }}
        >
            <div style={{ display: 'flex' }}>
                <div className='flex-column txt-justify' style={{ gap: '21px', paddingRight: '34px' }}>
                    <h2 className='h2-semiBold txtcolor-secondary'>Titulo: Lorem ipsum dolor sit amet consectetur adipiscing elit fringilla pulvinar, tristique dis donec vulputate et aptent magnis integer metus vehicula</h2>
                    <p className='n-regular'>Lorem ipsum dolor sit amet consectetur adipiscing elit fringilla pulvinar, tristique dis donec vulputate et aptent magnis integer metus vehicula, penatibus tortor imperdiet ornare cursus erat fames fermentum. Litora torquent eu primis tempus montes tellus proin a, luctus non parturient laoreet sociis vel id. Vestibulum conubia himenaeos tincidunt leo volutpat dui sociis habitasse hendrerit, primis lobortis laoreet eget ac hac per aptent pulvinar et, ut curae cursus venenatis porttitor at commodo sed. Aliquet accumsan convallis parturient sociosqu phasellus rhoncus enim proin, eu sociis dictumst in rutrum morbi dignissim cras gravida, vestibulum viverra natoque inceptos tortor mus neque.
                        Id dapibus felis phasellus rutrum aenean sollicitudin mus neque, senectus interdum nascetur donec cras cum nostra, malesuada bibendum torquent etiam ullamcorper varius habitasse. Ultrices scelerisque auctor arcu morbi curabitur aenean luctus, porttitor nulla nibh turpis semper interdum aliquam, donec neque in quisque curae odio. Accumsan risus consequat molestie egestas morbi euismod auctor eros quis, faucibus magna pellentesque sed justo mi vehicula diam venenatis a, neque sodales porta hac fames nostra leo nisl. Feugiat integer potenti quisque habitasse hendrerit facilisis porttitor malesuada nullam, conubia proin venenatis dis urna nascetur habitant justo, fames fringilla suscipit scelerisque sed sodales tempus volutpat.
                        Euismod venenatis himenaeos id et cursus erat, aenean pulvinar varius auctor ligula, aliquet parturient iaculis cubilia ad. Magnis lectus pharetra imperdiet odio dignissim cras pellentesque nostra nibh gravida lacus molestie, ligula nec himenaeos commodo proin scelerisque consequat auctor nullam cum. Volutpat posuere leo cum urna eleifend facilisis ad nunc litora mauris est pretium inceptos sagittis, nibh vivamus venenatis platea habitant lobortis elementum eros pellentesque ullamcorper in vehicula.</p>
                </div>
            </div>

            {/* Línea divisoria */}
            <Divider sx={{ marginY: '21px', borderColor: '#00AA28' }} />

            {/* Sección de evaluación */}
            <Box
                className='flex-column'
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '21px',
                }}
            >
                <h2 className='h2-semiBold txtcolor-secondary txt-center'>¿Te resultó útil esta respuesta?</h2>
                <p className='n-regular txt-center'>Tu opinión es importante para nosotros. Por favor, indícanos si esta guía te ha sido útil.</p>
                <Box
                    className='flex-spaceBetween'
                    sx={{
                        gap: {
                            xs: '15px',   // Gap para pantallas extra pequeñas
                            md: '100px',   
                        },
                    }}
                >
                    <Button
                        variant="contained"
                        onClick={handleOpenPositive}
                        sx={{
                            backgroundColor: green[500],  // Color verde del botón
                            color: 'white',                // Color del ícono
                            borderRadius: '8px',          // Bordes redondeados
                            '&:hover': {
                                backgroundColor: green[700], // Color al pasar el mouse por encima
                            },
                            padding: '8px 12px',          // Ajusta el tamaño del botón
                        }}
                    >
                        <Check />
                    </Button>

                    <Button
                        variant="contained"
                        onClick={handleOpenNegative}
                        sx={{
                            backgroundColor: red[500],  // Color rojo del botón
                            color: 'white',              // Color del ícono
                            borderRadius: '8px',        // Bordes redondeados
                            '&:hover': {
                                backgroundColor: red[700], // Color al pasar el mouse por encima
                            },
                            padding: '8px 12px',        // Ajusta el tamaño del botón
                        }}
                    >
                        <Close />
                    </Button>
                </Box>
                <p className='n-regular txt-center'>¡Gracias por tu feedback! Tu participación nos ayuda a mejorar y ofrecer mejores recursos para todos nuestros usuarios.</p>
            </Box>

            {/* Componente de Encuesta */}
            <EncuestaPositiva open={openPositive} handleClose={() => setOpenPositive(false)} />
            <EncuestaNegativa open={openNegative} handleClose={() => setOpenNegative(false)} />
        </Box>
    );
};

export default EntradaPregunta;



// 'use client'; // Asegúrate de que este componente funcione como un componente del lado del cliente

// import { useEffect, useState } from 'react';
// import { useParams } from 'next/navigation';

// // Definimos la interfaz para describir las propiedades del artículo
// interface Articulo {
//   id: number;
//   categoria: string;
//   titulo: string;
//   texto: string;
// }

// const EntradaPregunta = ({}) => {
//   const { id } = useParams(); // Obtener el ID del artículo desde la URL

//   // Definimos el estado del artículo usando la interfaz Articulo o null inicialmente
//   const [articulo, setArticulo] = useState<Articulo | null>(null);

//   useEffect(() => {
//     if (id) {
//       // Llamada para obtener el artículo desde la API usando el ID
//       fetch(`/api/articulos/${id}`)
//         .then((response) => response.json())
//         .then((data) => {
//           setArticulo(data); // Establecemos los datos del artículo en el estado
//         })
//         .catch((error) => {
//           console.error('Error al obtener los datos del artículo:', error);
//         });
//     }
//   }, [id]); // El efecto se ejecuta cuando cambia el ID

//   // Si el artículo no ha cargado aún, mostramos un mensaje de carga
//   if (!articulo) {
//     return <p>Cargando artículo...</p>;
//   }

//   // Renderizamos la información del artículo
//   return (
//     <div>
//       <h1>{articulo.categoria}</h1>
//       <h2>{articulo.titulo}</h2>
//       <img src={articulo.imagen} alt={articulo.titulo} style={{ width: '300px', float: 'left', marginRight: '20px' }} />
//       <p>{articulo.texto}</p>
//       <p><strong>Bibliografía:</strong> {articulo.bibliografia}</p>
//       <p><strong>Autor:</strong> {articulo.autor}</p>
//     </div>
//   );
// };

// export default EntradaPregunta;
