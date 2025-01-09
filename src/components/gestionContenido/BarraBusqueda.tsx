"use client"; // Indica que es un componente cliente

import { Search } from "@mui/icons-material";
import { Box, IconButton, TextField } from "@mui/material";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface BarraDeBusquedaProps {
  endpoint: string;  // Propiedad para pasar el endpoint del backend
  seccion: string;
  placeholder?: string;  // Propiedad opcional para personalizar el placeholder
}

const BarraDeBusqueda: React.FC<BarraDeBusquedaProps> = ({ endpoint, seccion, placeholder }) => {
  const [query, setQuery] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSearch = () => {
    if (!query.trim()) {
      setErrorMessage("Por favor, ingresa un término de búsqueda.");
      return;
    }

    // Redirige al usuario a la página de resultados con el endpoint en la query
    router.push(
      `/gestion-contenido/${encodeURIComponent(seccion)}/resultados?query=${encodeURIComponent(
        query.trim()
      )}&endpoint=${encodeURIComponent(endpoint)}`
    );
  };

  return (
    <Box className="bg-tertiary20 p-34 txt-center txtcolor-primary flex-column" sx={{ alignItems: "center", gap: "34px" }}>
      <h1 className="h1-bold">¿En qué podemos ayudarte?</h1>
      <div style={{ display: "flex", alignItems: "center", gap: "21px" }}>
        <TextField
          value={query}
          onChange={handleInputChange}
          variant="outlined"
          placeholder={placeholder || "Escribe palabras de búsqueda"}
          sx={{
            borderRadius: "15px",
            backgroundColor: "white",
            minWidth: {
              xs: "200px",
              md: "300px",
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderRadius: "15px",
              },
            },
            "& .MuiInputBase-input": {
              height: "auto",
              textAlign: "center",
            },
          }}
        />
        <IconButton onClick={handleSearch} className="bg-secondary" sx={{ borderRadius: "100px", color: "white" }}>
          <Search />
        </IconButton>
      </div>
      <h2 className="h2-bold txtcolor-primary flex-center">También puedes revisar los siguientes temas para encontrar la información que buscas.</h2>
      {errorMessage && <p className="error-text">{errorMessage}</p>}
    </Box>
  );
};

export default BarraDeBusqueda;