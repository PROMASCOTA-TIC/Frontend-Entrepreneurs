"use client";
import React from 'react'
import Carousel from '../../components/inicio-emprendedor/CarruselProductos';
import ListaProductosSinStock from '../../components/inicio-emprendedor/TablaProductosTerminarStock';


  const handleEdit = (index: number) => {
    console.log(`Editar producto en índice ${index}`);
  };
  
  const handleDelete = (index: number) => {
    console.log(`Eliminar producto en índice ${index}`);
  };
  

export default function ListasProductos() {
  return (
    <>
<Carousel
/>

<ListaProductosSinStock/>
</>

  )
}