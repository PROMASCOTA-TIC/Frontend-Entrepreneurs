"use client";

import ArticulosSinFoto from "@/components/gestionContenido/ArticulosSinFoto";
import { URL_BASE } from "@/config/config";
import { CircularProgress } from "@mui/material";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";

const categoryNames: { [key: string]: string } = {
  "1": "Publicar contenido",
  "2": "Registro y Cuenta",
  "3": "Compras y Pagos",
  "4": "Productos y Servicios",
  "5": "Soporte al cliente",
  "6": "Seguridad y Privacidad",
};

const PF_Categorias = () => {
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
        const response = await fetch(`${URL_BASE}faqs/categories/${categoryId}/faqs`);
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

export default PF_Categorias;