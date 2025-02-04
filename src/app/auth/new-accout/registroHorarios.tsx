"use client";

import React from "react";
import {
  Checkbox,
  FormControlLabel,
  Typography,
  Box,
  Button,
  FormHelperText,
  Alert,
  Grid2
} from "@mui/material";
import { themePalette } from "@/config/theme.config";
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";

const diasDeLaSemana = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

type Horario = {
  dia: string;
  horaApertura?: Dayjs | null;
  horaCierre?: Dayjs | null;
  cerrado: string;
};

type RegistroHorarioAtencionProps = {
  nextStep: () => void;
  prevStep: () => void;
  updateFormData: (data: { horario: Horario[] }) => void;
  formData: { horario?: Horario[] };
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
    horaApertura: null,
    horaCierre: null,
  }));

  const [errorGeneral, setErrorGeneral] = React.useState<string | null>(null);
  const [errores, setErrores] = React.useState<{ [key: string]: { apertura?: string; cierre?: string } }>({});

  const validarHorario = () => {
    let nuevoErrores: { [key: string]: { apertura?: string; cierre?: string } } = {};
    let algunDiaAbierto = false;

    horario.forEach(({ dia, horaApertura, horaCierre, cerrado }) => {
      if (cerrado === "0") {
        if (!horaApertura) {
          nuevoErrores[dia] = { ...nuevoErrores[dia], apertura: "Debe ingresar la hora de apertura." };
        }
        if (!horaCierre) {
          nuevoErrores[dia] = { ...nuevoErrores[dia], cierre: "Debe ingresar la hora de cierre." };
        }
        if (horaApertura && horaCierre && horaCierre.isBefore(horaApertura)) {
          nuevoErrores[dia] = { ...nuevoErrores[dia], cierre: "La hora de cierre no puede ser menor a la de apertura." };
        }
        if (horaApertura && horaCierre) {
          algunDiaAbierto = true;
        }
      }
    });

    setErrores(nuevoErrores);

    if (!algunDiaAbierto) {
      setErrorGeneral("Debe haber al menos un día con horario de apertura y cierre.");
    } else {
      setErrorGeneral(null);
    }

    return algunDiaAbierto;
  };

  const handleChange = (dia: string, campo: keyof Horario, valor: Dayjs | null) => {
    const updatedHorario = horario.map((h) =>
      h.dia === dia ? { ...h, [campo]: valor } : h
    );
    updateFormData({ horario: updatedHorario });

    // Validación en tiempo real
    validarHorario();
  };

  const handleCheckboxChange = (dia: string, checked: boolean) => {
    const updatedHorario = horario.map((h) =>
      h.dia === dia
        ? {
            ...h,
            cerrado: checked ? "1" : "0",
            horaApertura: checked ? null : h.horaApertura,
            horaCierre: checked ? null : h.horaCierre,
          }
        : h
    );
    updateFormData({ horario: updatedHorario });

    // Si se marca como cerrado, limpiar errores de ese día
    if (checked) {
      setErrores((prev) => {
        const newErrors = { ...prev };
        delete newErrors[dia];
        return newErrors;
      });
    }

    validarHorario();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validarHorario()) {
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

          {errorGeneral && (
            <Grid2 size={{ xs: 12 }}>
              <Alert severity="error" sx={{ mb: 2 }}>
                {errorGeneral}
              </Alert>
            </Grid2>
          )}

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
                </Grid2>
                {cerrado === "0" && (
                  <>
                    <Grid2 size={{ xs: 11, sm: 4 }}>
                      <TimePicker
                        label="Apertura"
                        value={horaApertura ? dayjs(horaApertura) : null}
                        onChange={(newValue) => handleChange(dia, "horaApertura", newValue)}
                        ampm={false}
                        sx={{ width: "100%" }}
                      />
                      {errores[dia]?.apertura && (
                        <FormHelperText sx={{ color: "red" }}>{errores[dia].apertura}</FormHelperText>
                      )}
                    </Grid2>
                    <Grid2 size={{ xs: 12, sm: 4 }}>
                      <TimePicker
                        label="Cierre"
                        value={horaCierre ? dayjs(horaCierre) : null}
                        onChange={(newValue) => handleChange(dia, "horaCierre", newValue)}
                        ampm={false}
                        sx={{ width: "100%" }}
                      />
                      {errores[dia]?.cierre && (
                        <FormHelperText sx={{ color: "red" }}>{errores[dia].cierre}</FormHelperText>
                      )}
                    </Grid2>
                  </>
                )}
              </Grid2>
            ))}

            <Grid2 container spacing={2} justifyContent="center" style={{ marginTop: 20 }}>
              <Grid2>
                <Button variant="contained" onClick={prevStep}  sx={{
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
                <Button variant="contained" type="submit"  sx={{
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
