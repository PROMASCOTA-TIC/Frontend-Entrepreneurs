"use client";

import { Box, Button, CircularProgress } from '@mui/material'
import React, { useEffect, useState } from 'react'

import '/src/assets/styles/gestionContenido/general.css';
import '/src/assets/styles/gestionContenido/estilos.css';

import { useParams } from 'next/navigation';

interface Articulo {
    id: string;
    categoria: string;
    titulo: string;
    descripcion: string;
    imagen: string;
    bibliografia: string;
    autor: string;
}

const EntradaPubliReportaje: React.FC = () => {
    const { id } = useParams(); // Obtiene el ID del artículo desde la URL
    const [articulo, setArticulo] = useState<Articulo | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchArticulo = async () => {
            try {
                const response = await fetch(`http://localhost:3001/api/advertorials/detail/${id}`);
                const data = await response.json();
                console.log("Datos del artículo:", data); // Log de verificación

                // Adaptación de las propiedades del backend al formato esperado en el frontend
                setArticulo({
                    id: data.linkId, // Propiedad `linkId` del backend
                    categoria: data.category?.name || "Sin categoría", // Nombre de la categoría
                    titulo: data.title || "Título no disponible",
                    descripcion: data.description || "Descripción no disponible",
                    bibliografia: data.sourceLink || "No especificada",
                    autor: data.ownerName || "Desconocido",
                    imagen: data.image || "https://via.placeholder.com/200",
                });
            } catch (error) {
                console.error("Error al obtener los datos del artículo:", error);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchArticulo(); // Ejecuta la función solo si el ID está definido
        }
    }, [id]); // El efecto se ejecuta cada vez que cambia el ID

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

    return (
        <Box sx={{ padding: "34px 55px", gap: "21px" }}>
            <h1 className="h1-bold txtcolor-primary" style={{ padding: '21px 0px' }}>{articulo?.categoria}</h1>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div className="flex-column txt-justify" style={{ width: "80%", gap: "21px", paddingRight: "34px" }}>
                    <h2 className="h2-semiBold txtcolor-secondary">{articulo?.titulo}</h2>
                    <p className="n-regular">{articulo?.descripcion}</p>
                    <p className="n-regular">
                        <b>Bibliografía:</b> {articulo?.bibliografia}
                    </p>
                    <p className="n-regular">
                        <b>Compartido por:</b> {articulo?.autor}
                    </p>
                </div>
                <img
                    src={articulo?.imagen}
                    className="articulo_imagen"
                    alt={articulo?.titulo}
                    style={{ width: "200px", borderRadius: "10px" }}
                />
            </div>

        </Box>
    );
};

export default EntradaPubliReportaje;