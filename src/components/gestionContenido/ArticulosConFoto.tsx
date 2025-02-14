import { Box } from "@mui/material";
import Link from "next/link";

import "/src/assets/styles/gestionContenido/general.css";
import "/src/assets/styles/gestionContenido/estilos.css";

interface Articulo {
  id: number;
  titulo: string;
  descripcion: string;
  link: string;
  imagen?: string; // Puede ser undefined si no hay imagen
}

interface ArticulosConFotoProps {
  articulos: Articulo[];
  basePath: string;
}

const ArticulosConFoto: React.FC<ArticulosConFotoProps> = ({ articulos, basePath }) => {
  if (!articulos || articulos.length === 0) {
    return <p className="h2-bold txtcolor-primary txt-center">No se encontraron artículos.</p>;
  }

  return (
    <Box className="p-34 flex-column" sx={{ gap: "21px" }}>
      {articulos.map((articulo) => {
        const imagenesArray = articulo.imagen ? articulo.imagen.split(",").map((url) => url.trim()) : [];
        const primeraImagen = imagenesArray.length > 0 ? imagenesArray[0] : null;

        return (
          <div
            key={articulo.id}
            className="categorias_articulo_contenedor"
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-start",
              gap: "16px",
            }}
          >
            {/* 🔹 Contenedor del texto */}
            <div
              className="flex-column"
              style={{
                width: primeraImagen ? "90%" : "100%",
                gap: "8px",
                paddingRight: primeraImagen ? "34px" : "0px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* 🔹 Asegurar que el título tenga un `max-width` dinámico */}
              <h2
                className="h2-semiBold txtcolor-secondary txt-justify"
                style={{
                  wordBreak: "break-word", // Permite que el texto salte de línea
                  overflowWrap: "break-word", // Rompe la palabra si es necesario
                  whiteSpace: "normal", // Asegura que el texto fluya
                }}
              >
                {articulo.titulo || "Sin título"}
              </h2>

              <p className="txt-justify"
                style={{
                  whiteSpace: "pre-line",
                  wordBreak: "break-word",
                  overflowWrap: "break-word",
                }}>
                {articulo.descripcion
                  ? articulo.descripcion.length > 250
                    ? `${articulo.descripcion.substring(0, 250)}...`
                    : articulo.descripcion
                  : "Sin descripción"}
              </p>

              <Link
                className="h2-semiBold txtcolor-secondary"
                style={{ textAlign: "right" }}
                href={`${basePath}/${articulo.id}`}
              >
                Ver más
              </Link>
            </div>

            {/* 🔹 Mostrar imagen solo si existe */}
            {primeraImagen && (
              <img
                src={primeraImagen}
                alt={articulo.titulo}
                className="categorias_articulo_imagen"
                style={{
                  width: "10%",
                  minWidth: "150px",
                  borderRadius: "10px",
                  alignSelf: "flex-start", // Asegura que la imagen no empuje el texto
                }}
              />
            )}
          </div>
        );
      })}
    </Box>
  );
};

export default ArticulosConFoto;