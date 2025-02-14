"use client";

import React, { useEffect, useState } from "react";
import { Box, Typography, RadioGroup, FormControlLabel, Radio, Grid2 } from "@mui/material";
import { Icon } from "@iconify/react";
import { themePalette } from "@/config/theme.config";
import axios from "axios";
import { URL_BASE } from "@/config/config";

interface TipoMascotaProps {
  value: string;
  onChange: (value: string) => void; 
  error?: string;
}

interface PetTypeOption {
  id: string; 
  icon: string; 
  label: string; 
}

const TipoMascota: React.FC<TipoMascotaProps> = ({ value, onChange, error }) => {
  const [options, setOptions] = useState<PetTypeOption[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const petTypeIcons: Record<string, string> = {
    "001P": "mdi:dog",
    "002G": "mdi:cat",
    "003A": "mdi:bird",
    "004PM": "fluent-emoji-high-contrast:hamster",
    "005O": "mdi:paw",
  };

  const fetchPetTypes = async () => {
    try {
      const response = await axios.get(`${URL_BASE}products/register/pet-types`);
      const data = response.data.map((item: { id: string; name: string }) => ({
        id: item.id, 
        icon: petTypeIcons[item.id] || "mdi:alert",
        label: item.name, // Mostrar el nombre como etiqueta
      }));
      setOptions(data);
    } catch (error) {
      console.error("Error fetching pet types:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPetTypes();
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value); // Propaga el id seleccionado al padre
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      sx={{
        border: "1px solid #004040",
        backgroundColor: themePalette.black10,
        width: "100%",
        maxWidth: "1358px",
        height: "auto",
        margin: "0 auto",
        borderRadius: "10px",
        marginTop: "34px",
        padding: "16px",
      }}
    >
      <Typography
        align="left"
        sx={{
          color: themePalette.primary,
          width: "100%",
          fontSize: "24px",
          paddingLeft: "13px",
          fontWeight: "bold",
        }}
      >
        Tipo de mascota:
      </Typography>

      {isLoading ? (
        <Typography sx={{ color: themePalette.primary, marginTop: "16px" }}>
          Cargando tipos de mascotas...
        </Typography>
      ) : options.length === 0 ? (
        <Typography sx={{ color: themePalette.primary, marginTop: "16px" }}>
          No hay tipos de mascotas disponibles.
        </Typography>
      ) : (
        <>
          <RadioGroup value={value} onChange={handleChange} sx={{ width: "100%" }}>
            <Grid2 container spacing={2} justifyContent="center">
              {options.map((option) => (
                <Grid2
                  key={option.id}
                  size={{ xs: 12, sm: 6, md: 4, lg: 2 }}
                  display="flex"
                  justifyContent="center"
                >
                  <FormControlLabel
                    value={option.id} // El value es ahora el id
                    control={<Radio sx={{ display: "none" }} />}
                    label={
                      <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        sx={{ cursor: "pointer" }}
                      >
                        <Box
                          sx={{
                            width: "100px",
                            height: "100px",
                            borderRadius: "50%",
                            backgroundColor:
                              value === option.id
                                ? themePalette.secondary
                                : themePalette.black10,
                            display: "flex",
                            alignItems: "center",
                            justifyContent:"center",
                            marginBottom: "8px",
                          }}
                        >
                          <Icon
                            icon={option.icon}
                            style={{
                              fontSize: "60px",
                              color:
                                value === option.id
                                  ? themePalette.cwhite
                                  : themePalette.primary,
                            }}
                          />
                        </Box>
                        <Typography
                          sx={{
                            color: themePalette.primary,
                            fontSize: "18px",
                            textAlign: "center",
                          }}
                        >
                          {option.label}
                        </Typography>
                      </Box>
                    }
                  />
                </Grid2>
              ))}
            </Grid2>
          </RadioGroup>

          {error && (
            <Typography
              color="error"
              sx={{
                textAlign: "left",
                marginTop: "10px",
                marginLeft: "13px",
                fontSize: "14px",
              }}
            >
              {error}
            </Typography>
          )}
        </>
      )}
    </Box>
  );
};

export default TipoMascota;
