"use client";

import ArticulosSinFoto from "@/components/gestionContenido/ArticulosSinFoto";
import { CircularProgress } from "@mui/material";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Articulo {
  id: number;
  titulo: string;
  descripcion: string;
}

const ResultadosPage = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  const endpoint = searchParams.get("endpoint") || "";
  const [articulos, setArticulos] = useState<Articulo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await fetch(`${endpoint}?query=${query}`);
        const data = await response.json();

        // Adaptar la respuesta para que coincida con el componente `ArticulosConFoto`
        const articulosAdaptados = data.map((articulo: any) => ({
          id: articulo.id || articulo.faqId, // Asignar `faqId` si `id` no existe
          titulo: articulo.title,
          descripcion: articulo.description,
        }));

        setArticulos(articulosAdaptados);
      } catch (error) {
        console.error("Error al obtener los resultados:", error);
      } finally {
        setLoading(false);
      }
    };

    if (query && endpoint) {
      fetchResults();
    }
  }, [query, endpoint]);

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
      <h1 className="h2-bold txtcolor-primary txt-center">Resultados de búsqueda para: "{query}"</h1>
      {articulos.length === 0 ? (
        <p>No se encontraron resultados.</p>
      ) : (
        <ArticulosSinFoto
          articulos={articulos}
          basePath="/gestion-contenido/preguntas-frecuentes/categorias/articulo"
        />
      )}
    </div>
  );
};

export default ResultadosPage;
