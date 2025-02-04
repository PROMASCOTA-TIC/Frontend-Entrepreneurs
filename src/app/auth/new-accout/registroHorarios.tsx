"use client";

import React from "react";
import {
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
  Box,
  Button,
  Alert,
  Grid2
} from "@mui/material";
import { themePalette } from "@/config/theme.config";

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

  // Función para actualizar un día específico
  const handleChange = (dia: string, campo: keyof Horario, valor: string) => {
    const updatedHorario = horario.map((h) =>
      h.dia === dia ? { ...h, [campo]: valor } : h
    );
    updateFormData({ horario: updatedHorario });
  };

  // Función para manejar el checkbox de "cerrado"
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

    // Validar que al menos un día tenga apertura y cierre
    const algunDiaAbierto = horario.some((h) => h.cerrado === "0" && h.horaApertura && h.horaCierre);

    if (!algunDiaAbierto) {
      setErrorGeneral("Debe haber al menos un día con horario de apertura y cierre.");
      return;
    }

    setErrorGeneral(null);
    console.log("✅ Horarios registrados:", horario);
    nextStep();
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        border: "1px solid #ccc",
        padding: 2,
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

        {/* Encabezados de columnas */}
        <Grid2 container spacing={7} justifyContent="center" style={{ marginBottom: 16 }}>
          <Grid2 size={{ xs: 12, sm: 4 }} />
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
            <Grid2 container spacing={2} key={dia} alignItems="center" style={{ marginBottom: 16 }}>
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
                  <Grid2 size={{ xs: 12, sm: 4 }}>
                    <TextField
                      type="time"
                      fullWidth
                      value={horaApertura ?? ""}
                      onChange={(e) => handleChange(dia, "horaApertura", e.target.value)}
                      placeholder="Hora de Apertura"
                    />
                  </Grid2>
                  <Grid2 size={{ xs: 12, sm: 4 }}>
                    <TextField
                      type="time"
                      fullWidth
                      value={horaCierre ?? ""}
                      onChange={(e) => handleChange(dia, "horaCierre", e.target.value)}
                      placeholder="Hora de Cierre"
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
                className="h-e34 text-white rounded-[20px] normal-case"
                sx={{
                  backgroundColor: themePalette.primary,
                  width: "171px",
                  height: "50px",
                  fontSize: "18px",
                }}
              >
                Regresar
              </Button>
            </Grid2>
            <Grid2>
              <Button
                variant="contained"
                type="submit"
                className="h-e34 text-white rounded-[20px] normal-case"
                sx={{
                  backgroundColor: themePalette.primary,
                  width: "171px",
                  height: "50px",
                  fontSize: "18px",
                }}
              >
                Siguiente
              </Button>
            </Grid2>
          </Grid2>
        </form>
      </Grid2>
    </Box>
  );
};
