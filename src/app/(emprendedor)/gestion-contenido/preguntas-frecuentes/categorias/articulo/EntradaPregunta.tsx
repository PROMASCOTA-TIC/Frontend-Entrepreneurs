"use client";

import React, { useEffect, useState } from "react";
import { Box, Button, CircularProgress, Divider } from "@mui/material";
import { green, red } from "@mui/material/colors";
import { Check, Close } from "@mui/icons-material";
import { useParams } from "next/navigation";

import EncuestaPositiva from "./EncuestaPositiva";
import EncuestaNegativa from "./EncuestaNegativa";

import '/src/assets/styles/gestionContenido/general.css';
import '/src/assets/styles/gestionContenido/estilos.css';

// Interfaz del artículo (FAQ)
interface Articulo {
  id: string;
  categoria: string;
  titulo: string;
  descripcion: string;
}

const EntradaPregunta: React.FC = () => {
  const { id } = useParams(); // string | string[]
  const singleId = Array.isArray(id) ? id[0] : id;

  const [articulo, setArticulo] = useState<Articulo | null>(null);
  const [loading, setLoading] = useState(true);

  // Control de los modales
  const [openPositive, setOpenPositive] = useState(false);
  const [openNegative, setOpenNegative] = useState(false);

  // Guardar el feedbackId devuelto por el backend
  const [feedbackId, setFeedbackId] = useState<string | null>(null);

  // 1. Manejo de clic en "positivo"
  const handleOpenPositive = async () => {
    try {
      // Crea feedback con response: "positivo"
      const res = await fetch(`http://localhost:3001/api/faqs/feedback/${singleId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ response: "positivo" }),
      });
      if (!res.ok) {
        throw new Error(`Error al crear feedback positivo (status: ${res.status})`);
      }

      const data = await res.json();
      // data debería contener feedbackId
      setFeedbackId(data.feedbackId);

      // Abre modal de encuesta
      setOpenPositive(true);
    } catch (err) {
      console.error(err);
    }
  };

  // 2. Manejo de clic en "negativo"
  const handleOpenNegative = async () => {
    try {
      // Crea feedback con response: "negativo"
      const res = await fetch(`http://localhost:3001/api/faqs/feedback/${singleId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ response: "negativo" }),
      });
      if (!res.ok) {
        throw new Error(`Error al crear feedback negativo (status: ${res.status})`);
      }

      const data = await res.json();
      setFeedbackId(data.feedbackId);

      // Abre modal de encuesta
      setOpenNegative(true);
    } catch (err) {
      console.error(err);
    }
  };

  // 3. Cargar la info del artículo (FAQ)
  useEffect(() => {
    const fetchArticulo = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/faqs/detail/${singleId}`);
        if (!response.ok) throw new Error("Error al obtener datos del artículo");
        const data = await response.json();

        setArticulo({
          id: data.faqId,
          categoria: data.category?.name || "Sin categoría",
          titulo: data.title || "Título no disponible",
          descripcion: data.description || "Descripción no disponible",
        });
      } catch (error) {
        console.error("Error al obtener los datos del artículo:", error);
      } finally {
        setLoading(false);
      }
    };

    if (singleId) {
      fetchArticulo();
    }
  }, [singleId]);

  // Render de carga o error
  if (loading) {
    return (
      <div
        className="flex-center"
        style={{
          height: "100vh",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <CircularProgress style={{ color: "#004040" }} size={60} />
        <h1 className="h1-bold txtcolor-primary">Cargando artículo...</h1>
      </div>
    );
  }

  if (!articulo) {
    return <p>No se encontró el artículo.</p>;
  }

  // Render principal
  return (
    <Box className="flex-column" sx={{ padding: "34px 55px", gap: "21px" }}>
      {/* Encabezado del artículo */}
      <div>
        <h1 className="h1-bold txtcolor-primary" style={{ padding: "21px 0px" }}>
          {articulo.categoria}
        </h1>
        <div className="flex-column txt-justify" style={{ gap: "21px", paddingRight: "34px" }}>
          <h2
            className="h2-semiBold txtcolor-secondary txt-justify"
            style={{
              wordBreak: "break-word", // Permite que el texto salte de línea
              overflowWrap: "break-word", // Rompe la palabra si es necesario
              whiteSpace: "normal", // Asegura que el texto fluya
            }}
          >
            {articulo?.titulo}
          </h2>

          <p
            className="n-regular"
            style={{
              whiteSpace: "pre-line",
              wordBreak: "break-word",
              overflowWrap: "break-word",
            }}
          >{articulo?.descripcion}
          </p>
        </div>
      </div>

      {/* Línea divisoria */}
      <Divider sx={{ marginY: "21px", borderColor: "#00AA28" }} />

      {/* Sección de evaluación */}
      <Box
        className="flex-column"
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "21px",
        }}
      >
        <h2 className="h2-semiBold txtcolor-secondary txt-center">
          ¿Te resultó útil esta respuesta?
        </h2>
        <p className="n-regular txt-center">
          Tu opinión es importante para nosotros. Por favor, indícanos si esta guía te ha sido útil.
        </p>
        <Box
          className="flex-spaceBetween"
          sx={{
            gap: {
              xs: "15px",
              md: "100px",
            },
          }}
        >
          <Button
            variant="contained"
            onClick={handleOpenPositive}
            sx={{
              backgroundColor: green[500],
              color: "white",
              borderRadius: "8px",
              "&:hover": {
                backgroundColor: green[700],
              },
              padding: "8px 12px",
            }}
          >
            <Check />
          </Button>

          <Button
            variant="contained"
            onClick={handleOpenNegative}
            sx={{
              backgroundColor: red[500],
              color: "white",
              borderRadius: "8px",
              "&:hover": {
                backgroundColor: red[700],
              },
              padding: "8px 12px",
            }}
          >
            <Close />
          </Button>
        </Box>
        <p className="n-regular txt-center">
          ¡Gracias por tu feedback! Tu participación nos ayuda a mejorar y ofrecer mejores recursos para todos nuestros usuarios.
        </p>
      </Box>

      {/* Modales de Encuesta: les pasamos el feedbackId recién creado */}
      <EncuestaPositiva
        open={openPositive}
        handleClose={() => setOpenPositive(false)}
        feedbackId={feedbackId}
      />
      <EncuestaNegativa
        open={openNegative}
        handleClose={() => setOpenNegative(false)}
        feedbackId={feedbackId}
      />
    </Box>
  );
};

export default EntradaPregunta;