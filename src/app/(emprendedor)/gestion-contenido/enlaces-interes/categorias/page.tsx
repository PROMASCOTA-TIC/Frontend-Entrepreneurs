"use client";

import ArticulosConFoto from "@/components/gestionContenido/ArticulosConFoto";
import { URL_BASE } from "@/config/config";
import { CircularProgress } from "@mui/material";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";

const categoryNames: { [key: string]: string } = {
  "1": "Higiene",
  "2": "Salud",
  "3": "Adiestramiento",
  "4": "Nutrición",
  "5": "Seguridad",
  "6": "Actividades",
};

const EI_Categorias = () => {
  return (
    <Suspense fallback={<LoadingComponent />}>
      <CategoriasContent />
    </Suspense>
  );
};

const CategoriasContent = () => {
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("categoryId");
  const [articulos, setArticulos] = useState([]);
  const [loading, setLoading] = useState(true);
  const categoryName = categoryId ? categoryNames[categoryId] : "Categoría desconocida";

  useEffect(() => {
    const fetchArticulosPorCategoria = async () => {
      if (!categoryId) return;

      try {
        const response = await fetch(`${URL_BASE}links/categories/${categoryId}/links`);
        const data = await response.json();

        const articulosAprobados = data.filter((articulo: any) => articulo.status === "approved");

        const articulosAdaptados = articulosAprobados.map((articulo: any) => ({
          id: articulo.id || articulo.linkId,
          titulo: articulo.title || "Sin título",
          descripcion: articulo.description || "Sin descripción disponible",
          link: articulo.sourceLink || "#",
          imagen: articulo.imagesUrl ? articulo.imagesUrl.split(",")[0].trim() : "",
        }));

        setArticulos(articulosAdaptados);
      } catch (error) {
        console.error("Error al obtener los resultados:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticulosPorCategoria();
  }, [categoryId]);

  if (loading) {
    return <LoadingComponent />;
  }

  return (
    <div>
      <h1 className="h1-bold txtcolor-primary" style={{ padding: "21px 0px 0px 55px" }}>
        {categoryName}
      </h1>

      {articulos.length === 0 ? (
        <NoResultsComponent />
      ) : (
        <ArticulosConFoto
          articulos={articulos}
          basePath="/gestion-contenido/enlaces-interes/categorias/articulo"
        />
      )}
    </div>
  );
};

const LoadingComponent = () => (
  <div
    className="flex-center"
    style={{
      height: "100vh",
      flexDirection: "column",
      gap: "20px",
    }}
  >
    <CircularProgress style={{ color: "#004040" }} size={60} />
    <h1 className="h1-bold txtcolor-primary">Cargando resultados...</h1>
  </div>
);

const NoResultsComponent = () => (
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
);

export default EI_Categorias;