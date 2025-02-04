"use client";

import React from "react";
import {
  Checkbox,
  FormControlLabel,
  Typography,
  Box,
  Button,
  Alert,
  Grid2
} from "@mui/material";
import { themePalette } from "@/config/theme.config";
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const diasDeLaSemana = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

type Horario = {
  dia: string;
  horaApertura?: string;
  horaCierre?: string;
  cerrado: string; // "1" para cerrado, "0" para abierto
};

type RegistroHorarioAtencionProps = {
  nextStep: () => void;
  prevStep: () => void;
  updateFormData: (data: { horario: Horario[] }) => void;
  formData: { horario?: Horario[] }; // ✅ Permitir que `horario` sea opcional
};

export const RegistroHorarioAtencion: React.FC<RegistroHorarioAtencionProps> = ({
  nextStep,
  prevStep,
  updateFormData,
  formData
}) => {
  const horario = formData.horario ?? diasDeLaSemana.map((dia) => ({
    dia,
    cerrado: "0",
    horaApertura: "",
    horaCierre: "",
  }));

  const [errorGeneral, setErrorGeneral] = React.useState<string | null>(null);
  const [errores, setErrores] = React.useState<{ [key: string]: string }>({});

  const handleChange = (dia: string, campo: keyof Horario, valor: string) => {
    const updatedHorario = horario.map((h) =>
      h.dia === dia ? { ...h, [campo]: valor } : h
    );
    updateFormData({ horario: updatedHorario });
  };

  const handleCheckboxChange = (dia: string, checked: boolean) => {
    const updatedHorario = horario.map((h) =>
      h.dia === dia
        ? {
            ...h,
            cerrado: checked ? "1" : "0",
            horaApertura: checked ? "" : h.horaApertura ?? "",
            horaCierre: checked ? "" : h.horaCierre ?? "",
          }
        : h
    );
    updateFormData({ horario: updatedHorario });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let nuevoErrores: { [key: string]: string } = {};
    let algunDiaAbierto = false;

    horario.forEach(({ dia, horaApertura, horaCierre, cerrado }) => {
      if (cerrado === "0") {
        if (!horaApertura || !horaCierre) {
          nuevoErrores[dia] = "Debe ingresar ambas horas o marcar como cerrado.";
        } else if (dayjs(horaCierre, "HH:mm").isBefore(dayjs(horaApertura, "HH:mm"))) {
          nuevoErrores[dia] = "La hora de cierre no puede ser menor a la de apertura.";
        } else {
          algunDiaAbierto = true;
        }
      }
    });

    if (!algunDiaAbierto) {
      setErrorGeneral("Debe haber al menos un día con horario de apertura y cierre.");
      return;
    }

    setErrores(nuevoErrores);
    if (Object.keys(nuevoErrores).length === 0) {
      setErrorGeneral(null);
      console.log("✅ Horarios registrados:", horario);
      nextStep();
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        sx={{
     
          border: "1px solid #ccc",
          padding: 1,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Grid2 container spacing={2} justifyContent="center">
          <Grid2 size={{ xs: 12 }}>
            <Typography align="center">
              Indica a los clientes cuándo está abierto tu emprendimiento
            </Typography>
          </Grid2>

          {/* Encabezados de columnas */}
          <Grid2 container spacing={12} justifyContent="center" style={{ marginBottom: 32 }}>
            <Grid2 
            sx={{xs: 12, sm: 4}}
            />
            <Grid2 size={{ xs: 12, sm: 4 }}>
              <Typography variant="subtitle1" align="center" color="textSecondary">
                Hora de Apertura
              </Typography>
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 4 }}>
              <Typography variant="subtitle1" align="center" color="textSecondary">
                Horario de Cierre
              </Typography>
            </Grid2>
          </Grid2>

          <form onSubmit={handleSubmit} style={{ width: "100%" }}>
            {horario.map(({ dia, horaApertura, horaCierre, cerrado }) => (
              <Grid2 container spacing={6} key={dia} alignItems="center" style={{ marginBottom: 25 }}>
                <Grid2 size={{ xs: 12, sm: 4 }}>
                  <Typography variant="h6">{dia}</Typography>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={cerrado === "1"}
                        onChange={(e) => handleCheckboxChange(dia, e.target.checked)}
                        color="primary"
                      />
                    }
                    label="Cerrado"
                  />
                   {errores[dia] && <Alert severity="error">{errores[dia]}</Alert>}
                </Grid2>
                {cerrado === "0" && (
                  <>
                    <Grid2 size={{ xs: 11, sm: 4 }}>
                      <TimePicker
                      label="Apertura"
                        value={horaApertura ? dayjs(horaApertura, "HH:mm") : null}
                        onChange={(newValue) =>
                          handleChange(dia, "horaApertura", newValue ? newValue.format("HH:mm") : "")
                        }
                        ampm={false}
                     
                      />
                    </Grid2>
                    <Grid2 size={{ xs: 12, sm: 4 }}>
                      <TimePicker
                       label="Cierre"
                        value={horaCierre ? dayjs(horaCierre, "HH:mm") : null}
                        onChange={(newValue) =>
                          handleChange(dia, "horaCierre", newValue ? newValue.format("HH:mm") : "")
                        }
                        ampm={false}
        
                      />
                    </Grid2>
                  </>
                )}
              </Grid2>
            ))}

            <Grid2 container spacing={2} justifyContent="center" style={{ marginTop: 20 }}>
              <Grid2>
                <Button
                  variant="contained"
                  onClick={prevStep}
                  sx={{ 
                                                backgroundColor: themePalette.primary, 
                                                textTransform: "none",
                                                color: "white",
                                                width: "171px", 
                                                height: "50px", 
                                                fontSize: "18px",
                                                borderRadius: "20px"
                                              }}
                >
                  Regresar
                </Button>
              </Grid2>
              <Grid2>
                <Button
                  variant="contained"
                  type="submit"
                 sx={{ 
                                               backgroundColor: themePalette.primary, 
                                               textTransform: "none",
                                               color: "white",
                                               width: "171px", 
                                               height: "50px", 
                                               fontSize: "18px",
                                               borderRadius: "20px"
                                             }}
                >
                  Siguiente
                </Button>
              </Grid2>
            </Grid2>
          </form>
          
        </Grid2>
      </Box>
    </LocalizationProvider>
  );
};
