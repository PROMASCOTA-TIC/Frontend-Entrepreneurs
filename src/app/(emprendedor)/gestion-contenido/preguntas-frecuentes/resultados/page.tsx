"use client";

import ArticulosSinFoto from "@/components/gestionContenido/ArticulosSinFoto";
import { CircularProgress } from "@mui/material";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";

interface Articulo {
  id: number;
  titulo: string;
  descripcion: string;
}

const ResultadosPage = () => {
  return (
    <Suspense fallback={<LoadingComponent />}>
      <ResultadosContent />
    </Suspense>
  );
};

const ResultadosContent = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  const endpoint = searchParams.get("endpoint") || "";
  const [articulos, setArticulos] = useState<Articulo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      if (!query || !endpoint) return;

      try {
        const response = await fetch(`${endpoint}?query=${query}`);
        const data = await response.json();

        const articulosAdaptados = data.map((articulo: any) => ({
          id: articulo.id || articulo.faqId,
          titulo: articulo.title || "Sin título",
          descripcion: articulo.description || "Sin descripción disponible",
        }));

        setArticulos(articulosAdaptados);
      } catch (error) {
        console.error("Error al obtener los resultados:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query, endpoint]);

  if (loading) {
    return <LoadingComponent />;
  }

  return (
    <div>
      <h1 className="h2-bold txtcolor-primary txt-center" style={{ paddingTop: "21px" }}>
        Resultados de búsqueda para: "{query}"
      </h1>
      {articulos.length === 0 ? (
        <NoResultsComponent />
      ) : (
        <ArticulosSinFoto
          articulos={articulos}
          basePath="/gestion-contenido/preguntas-frecuentes/categorias/articulo"
        />
      )}
    </div>
  );
};

const LoadingComponent = () => (
  <div
    className="flex-center"
    style={{
      height: "66vh",
      flexDirection: "column",
      gap: "20px",
    }}
  >
    <CircularProgress style={{ color: "#004040" }} size={60} />
    <h1 className="h1-bold txtcolor-primary">Cargando resultados...</h1>
  </div>
);

const NoResultsComponent = () => (
  <p className="n-bold" style={{ textAlign: "center", padding: "30px", height: "58vh" }}>
    No se encontraron resultados.
  </p>
);

export default ResultadosPage;