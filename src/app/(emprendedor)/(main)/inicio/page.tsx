"use client";
import React from 'react'
import Carousel from '../../components/inicio-emprendedor/CarruselProductos';
import ProductTable from '../../components/inicio-emprendedor/TablaProductosTerminarStock';

const products = [
    {
      name: 'Producto 1',
      imageUrl: 'https://example.com/image1.jpg',
      description: 'Descripción del producto 1',
      price: 100,
    },
    {
      name: 'Producto 2',
      imageUrl: 'https://example.com/image2.jpg',
      description: 'Descripción del producto 2',
      price: 150,
    },
    {
        name: 'Producto 2',
        imageUrl: 'https://example.com/image2.jpg',
        description: 'Descripción del producto 2',
        price: 150,
      },
      {
        name: 'Producto 2',
        imageUrl: 'https://example.com/image2.jpg',
        description: 'Descripción del producto 2',
        price: 150,
      },
      {
        name: 'Producto 2',
        imageUrl: 'https://example.com/image2.jpg',
        description: 'Descripción del producto 2',
        price: 150,
      },
      {
        name: 'Producto 2',
        imageUrl: 'https://example.com/image2.jpg',
        description: 'Descripción del producto 2',
        price: 150,
      },
      {
        name: 'Producto 2',
        imageUrl: 'https://example.com/image2.jpg',
        description: 'Descripción del producto 2',
        price: 150,
      },
      {
        name: 'Producto 2',
        imageUrl: 'https://example.com/image2.jpg',
        description: 'Descripción del producto 2',
        price: 150,
      },
  ];

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
products={products}     
onEdit={handleEdit}     
onDelete={handleDelete} 
/>
<ProductTable/>
</>

  )
}