import React from "react";
import { Box, Button, Typography, Grid2 } from "@mui/material";
import { Icon } from "@iconify/react";
import { themePalette } from "@/config/theme.config";

interface TipoPublicacionProps {
  value: string; // Valor actual del tipo de publicación
  onChange: (value: string) => void; // Función para actualizar el valor
  error?: string; // Mensaje de error opcional
}

const TipoPublicacion: React.FC<TipoPublicacionProps> = ({ value, onChange, error }) => {
  const handleSelect = (option: string) => {
    onChange(option); // Notifica al padre sobre el cambio
  };

  return (
    <>
      <Typography
        sx={{
          marginBottom: "20px",
          textAlign: "left",
          fontSize: "24px",
          fontWeight: "bold",
          color: themePalette.primary,
          padding: "15px",
        }}
      >
        Registrar información
      </Typography>

      <Box
        sx={{
          border: "1px solid #004040",
          backgroundColor: themePalette.black10,
          width: "100%",
          maxWidth: "1358px",
          height: "auto",
          margin: "0 auto",
          borderRadius: "10px",
          marginTop: "34px",
          padding: "20px",
        }}
      >
        <Typography
          align="left"
          sx={{
            color: themePalette.primary,
            width: "100%",
            fontSize: "24px",
            paddingLeft: "30px",
            fontWeight: "bold",
            marginBottom: "16px",
          }}
        >
          Tipo de publicación:
        </Typography>

        <Grid2 container spacing={2} justifyContent="space-evenly" alignItems="center">
          <Grid2
            size={{ xs: 12, sm: 6, md: 3 }}
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <Icon
              icon="material-symbols-light:pet-supplies-outline"
              style={{ fontSize: "60px", color: themePalette.primary }}
            />
            <Button
              onClick={() => handleSelect("1")} // Cambiar a "1" para Producto
              sx={{
                background: value === "1" ? themePalette.secondary: themePalette.primary,
                color: value === "1" ? themePalette.cwhite : themePalette.cwhite,
                textTransform: "none",
                width: "213px",
                height: "34px",
                borderRadius: "20px",
                fontSize: "18px",
                marginTop: "10px",
              }}
            >
              Producto
            </Button>
          </Grid2>

          {/* Botón Servicio con icono arriba */}
          <Grid2
            size={{ xs: 12, sm: 6, md: 3 }}
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <Icon
              icon="healthicons:guide-dog-outline"
              style={{ fontSize: "60px", color: themePalette.primary }}
            />
            <Button
              onClick={() => handleSelect("0")} // Cambiar a "0" para Servicio
              sx={{
                background: value === "0" ? themePalette.secondary : themePalette.primary,
                color: value === "0" ? themePalette.cwhite : themePalette.cwhite,
                textTransform: "none",
                width: "213px",
                height: "34px",
                borderRadius: "20px",
                fontSize: "18px",
                marginTop: "10px",
              }}
            >
              Servicio
            </Button>
          </Grid2>
        </Grid2>

        {/* Mostrar mensaje de error si existe */}
        {error && (
          <Typography
            color="error"
            sx={{
              textAlign: "left",
              marginTop: "10px",
              marginLeft: "30px",
              fontSize: "14px",
            }}
          >
            {error}
          </Typography>
        )}
      </Box>
    </>
  );
};

export default TipoPublicacion;
