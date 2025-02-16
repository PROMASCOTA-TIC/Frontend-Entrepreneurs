"use client";

import { useEffect, useState } from 'react';
import ArticulosConFoto from '@/components/gestionContenido/ArticulosConFoto';
import PR_Filtro from './PR_Filtro';
import PR_CompartirContenido from './PR_CompartirContenido';
import { CircularProgress } from '@mui/material';
import { URL_BASE } from '@/config/config';

const PR_Categorias = () => {
  const [articulos, setArticulos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // ** Función para obtener todos los publireportajes aprobados **
  const fetchAllAdvertorials = async () => {
    try {
      const response = await fetch(`${URL_BASE}advertorials/status/approved`);
      const data = await response.json();
      console.log('Datos recibidos:', data); // Log para ver los datos de la API

      // Filtrar solo los que tengan estado "approved"
      const aprobados = data.filter((articulo: any) => articulo.status === "approved");

      // Adaptar los datos para el componente
      const articulosAdaptados = aprobados.map((articulo: any) => ({
        id: articulo.id || articulo.advertorialId,
        titulo: articulo.title || "Sin título",
        descripcion: articulo.description || "Sin descripción",
        link: articulo.link || "#",
        imagen: articulo.imagesUrl
          ? articulo.imagesUrl.split(",")[0].trim() // Tomar solo la primera imagen
          : [],
      }));

      setArticulos(articulosAdaptados);
    } catch (error) {
      console.error('Error al obtener los publireportajes aprobados:', error);
      setArticulos([]); // Si hay error, se limpia la lista
    } finally {
      setLoading(false);
    }
  };

  // ** Función para obtener publireportajes por categoría **
  const fetchAdvertorialsByCategory = async (categoryId: string | null) => {
    if (categoryId === "none" || categoryId === null) {
      fetchAllAdvertorials();
      return;
    }

    try {
      const response = await fetch(`${URL_BASE}advertorials/categories/${categoryId}/advertorials`);
      const data = await response.json();
      console.log(`Publireportajes de la categoría ${categoryId}:`, data);

      // Filtrar solo los que tengan estado "approved"
      const aprobados = data.filter((articulo: any) => articulo.status === "approved");

      const articulosAdaptados = aprobados.map((articulo: any) => ({
        id: articulo.id || articulo.advertorialId,
        titulo: articulo.title || "Sin título",
        descripcion: articulo.description || "Sin descripción",
        link: articulo.link || "#",
        imagen: articulo.imagesUrl
          ? articulo.imagesUrl.split(",")[0].trim() // Tomar solo la primera imagen
          : [],
      }));

      setArticulos(articulosAdaptados);
    } catch (error) {
      console.error(`Error al obtener publireportajes de la categoría ${categoryId}:`, error);
      setArticulos([]);
    }
  };

  // ** Cargar todos los publireportajes aprobados al abrir la página **
  useEffect(() => {
    fetchAllAdvertorials();
  }, []);

  // ** Manejar cambio de categoría **
  const handleCategoryChange = (categoryId: string | null) => {
    fetchAdvertorialsByCategory(categoryId);
  };

  // ** Render de carga **
  if (loading) {
    return (
      <div
        className="flex-center"
        style={{
          height: "66vh",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <CircularProgress style={{ color: "#004040" }} size={60} />
        <h1 className="h1-bold txtcolor-primary">Cargando...</h1>
      </div>
    );
  }

  return (
    <div>
      <PR_Filtro onChangeCategory={handleCategoryChange} defaultCategory="none" />
      <div
        style={{
          height: "406px",   // el alto máximo que desees
          overflowY: "auto",    // scroll en vertical
          overflowX: "hidden",  // si no quieres scroll horizontal
        }}
      >
        <ArticulosConFoto
          articulos={articulos}
          basePath="/gestion-contenido/publireportajes/articulo"
        />
      </div>
      <PR_CompartirContenido />
    </div>
  );
};

export default PR_Categorias;