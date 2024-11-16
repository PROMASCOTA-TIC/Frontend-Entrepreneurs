import { Box, Button } from '@mui/material'
import React from 'react'

import '/src/assets/styles/gestionContenido/general.css';
import '/src/assets/styles/gestionContenido/estilos.css';
import { Download } from '@mui/icons-material';

const EntradaArticulo = () => {
    return (
        <Box
            sx={{
                padding: '34px 55px',
                gap: '21px'
            }}
        >
            <div style={{ display: 'flex' }}>
                <div className='flex-column txt-justify' style={{ width: '80%', gap: '21px', paddingRight: '34px' }}>
                    <h2 className='h2-semiBold txtcolor-secondary'>Titulo: Lorem ipsum dolor sit amet consectetur adipiscing elit fringilla pulvinar, tristique dis donec vulputate et aptent magnis integer metus vehicula</h2>
                    <p className='n-regular'>Lorem ipsum dolor sit amet consectetur adipiscing elit fringilla pulvinar, tristique dis donec vulputate et aptent magnis integer metus vehicula, penatibus tortor imperdiet ornare cursus erat fames fermentum. Litora torquent eu primis tempus montes tellus proin a, luctus non parturient laoreet sociis vel id. Vestibulum conubia himenaeos tincidunt leo volutpat dui sociis habitasse hendrerit, primis lobortis laoreet eget ac hac per aptent pulvinar et, ut curae cursus venenatis porttitor at commodo sed. Aliquet accumsan convallis parturient sociosqu phasellus rhoncus enim proin, eu sociis dictumst in rutrum morbi dignissim cras gravida, vestibulum viverra natoque inceptos tortor mus neque.
                        Id dapibus felis phasellus rutrum aenean sollicitudin mus neque, senectus interdum nascetur donec cras cum nostra, malesuada bibendum torquent etiam ullamcorper varius habitasse. Ultrices scelerisque auctor arcu morbi curabitur aenean luctus, porttitor nulla nibh turpis semper interdum aliquam, donec neque in quisque curae odio. Accumsan risus consequat molestie egestas morbi euismod auctor eros quis, faucibus magna pellentesque sed justo mi vehicula diam venenatis a, neque sodales porta hac fames nostra leo nisl. Feugiat integer potenti quisque habitasse hendrerit facilisis porttitor malesuada nullam, conubia proin venenatis dis urna nascetur habitant justo, fames fringilla suscipit scelerisque sed sodales tempus volutpat.
                        Euismod venenatis himenaeos id et cursus erat, aenean pulvinar varius auctor ligula, aliquet parturient iaculis cubilia ad. Magnis lectus pharetra imperdiet odio dignissim cras pellentesque nostra nibh gravida lacus molestie, ligula nec himenaeos commodo proin scelerisque consequat auctor nullam cum. Volutpat posuere leo cum urna eleifend facilisis ad nunc litora mauris est pretium inceptos sagittis, nibh vivamus venenatis platea habitant lobortis elementum eros pellentesque ullamcorper in vehicula.</p>
                    <p className='n-regular'><b>Bibliografía:</b>Hola</p>
                    <p className='n-regular'><b>Compartido por: </b>Hola</p>
                </div>
                <img src="https://via.placeholder.com/100" className='articulo_imagen' />
            </div>
            <Box
                className='flex-center'
            >
                <Button variant="contained" startIcon={<Download />}
                    className='bg-secondary n-regular flex-center'
                    sx={{
                        marginTop: '21px',
                        textTransform: 'none',
                        width: { xs: 'auto', md: 'auto' },
                        height: { xs: '40px', md: '50px' }
                    }}>
                    Descargar
                </Button>
            </Box>
        </Box>
    )
}

export default EntradaArticulo


// 'use client'; // Asegúrate de que este componente funcione como un componente del lado del cliente

// import { useEffect, useState } from 'react';
// import { useParams } from 'next/navigation';

// // Definimos la interfaz para describir las propiedades del artículo
// interface Articulo {
//   id: number;
//   categoria: string;
//   titulo: string;
//   texto: string;
//   imagen: string;
//   bibliografia: string;
//   autor: string;
// }

// const EntradaArticulo = ({}) => {
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

// export default EntradaArticulo;
