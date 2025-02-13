"use client";

import ArticulosConFoto from '@/components/gestionContenido/ArticulosConFoto';
import { CircularProgress } from '@mui/material';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const categoryNames: { [key: string]: string } = {
  "1": "Higiene",
  "2": "Salud",
  "3": "Adiestramiento",
  "4": "Nutrición",
  "5": "Seguridad",
  "6": "Actividades",
};

const EI_Categorias = () => {
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("categoryId"); // Obtener el ID de la categoría desde la URL
  const [articulos, setArticulos] = useState([]);
  const [loading, setLoading] = useState(true);
  const categoryName = categoryId ? categoryNames[categoryId] : "Categoría desconocida";

  useEffect(() => {
    const fetchArticulosPorCategoria = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/links/categories/${categoryId}/links`);
        const data = await response.json();

        // Filtrar solo los artículos con estado "approved"
        const articulosAprobados = data.filter((articulo: any) => articulo.status === "approved");

        // Adaptar la respuesta para que coincida con el componente `ArticulosConFoto`
        const articulosAdaptados = articulosAprobados.map((articulo: any) => ({
          id: articulo.id || articulo.linkId, // Asignar `linkId` si `id` no existe
          titulo: articulo.title || "Sin título",
          descripcion: articulo.description || "Sin descripción disponible",
          link: articulo.sourceLink || "#", // Si no hay un enlace, se deja vacío
          imagen: articulo.image || "/default-image.jpg", // Imagen por defecto si no tiene imagen
        }));

        setArticulos(articulosAdaptados);
      } catch (error) {
        console.error("Error al obtener los resultados:", error);
      } finally {
        setLoading(false);
      }
    };

    if (categoryId) {
      fetchArticulosPorCategoria();
    }
  }, [categoryId]);

  if (loading) {
    return (
      <div
        className="flex-center"
        style={{
          height: "100vh", // Ocupa el 100% del alto de la pantalla
          flexDirection: "column", // Coloca el icono y el texto uno debajo del otro
          gap: "20px", // Espacio entre el ícono y el texto
        }}
      >
        <CircularProgress style={{ color: "#004040" }} size={60} /> {/* Ícono de carga */}
        <h1 className="h1-bold txtcolor-primary">
          Cargando resultados...
        </h1>
      </div>
    );
  }

  return (
    <div>
      <h1 className="h1-bold txtcolor-primary" style={{ padding: "21px 0px 0px 55px" }}>
        Categoría: {categoryName}
      </h1>

      {/* Mostrar mensaje si no hay artículos */}
      {articulos.length === 0 ? (
        <div
          className="flex-center"
          style={{
            height: "50vh",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <h2 className="h2-semiBold txtcolor-primary">No existen artículos en esta categoría.</h2>
        </div>
      ) : (
        <ArticulosConFoto
          articulos={articulos}
          basePath="/gestion-contenido/enlaces-interes/categorias/articulo"
        />
      )}
    </div>
  );
};

export default EI_Categorias;
