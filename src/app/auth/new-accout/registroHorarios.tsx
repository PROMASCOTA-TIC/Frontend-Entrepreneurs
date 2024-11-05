"use client";

import React, { useState } from "react";
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
import { useForm, Controller, FieldValues } from "react-hook-form";
import { themePalette } from "@/config/theme.config";

interface HorarioDia {
  apertura: string;
  cierre: string;
  cerrado: boolean;
}

const horarioPorDefecto: HorarioDia = {
  apertura: "",
  cierre: "",
  cerrado: false,
};

const diasDeLaSemana = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

export const RegistroHorarioAtencion: React.FC<{ nextStep: () => void; prevStep: () => void }> = ({
  nextStep,
  prevStep,
}) => {
  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<{ [key: string]: HorarioDia }>({
    defaultValues: diasDeLaSemana.reduce((acc, dia) => {
      acc[dia] = { ...horarioPorDefecto };
      return acc;
    }, {} as { [key: string]: HorarioDia }),
  });

  const [errorGeneral, setErrorGeneral] = useState<string | null>(null);

  const onSubmit = (data: FieldValues) => {
    const algunDiaAbierto = diasDeLaSemana.some(
      (dia) => !data[dia].cerrado && data[dia].apertura && data[dia].cierre
    );

    if (!algunDiaAbierto) {
      setErrorGeneral("Debe haber al menos un día con horario de apertura y cierre.");
      return;
    }

    setErrorGeneral(null);
    console.log(data);
    nextStep();
  };

  const handleCancel = () => {
    reset();
    prevStep();
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

        <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
          {diasDeLaSemana.map((dia) => (
            <Grid2 container spacing={2} key={dia} alignItems="center" style={{ marginBottom: 16 }}>
              <Grid2 size={{ xs: 12, sm: 4 }}>
                <Typography variant="h6">{dia}</Typography>
                <Controller
                  name={`${dia}.cerrado`}
                  control={control}
                  render={({ field }) => (
                    <FormControlLabel
                      control={<Checkbox {...field} checked={field.value} />}
                      label="Cerrado"
                    />
                  )}
                />
              </Grid2>
              {!watch(`${dia}.cerrado`) && (
                <>
                  <Grid2 size={{ xs: 12, sm: 4 }}>
                    <Controller
                      name={`${dia}.apertura`}
                      control={control}
                      rules={{
                        required: "La hora de apertura es obligatoria",
                        validate: (value) => value !== "" || "Debes seleccionar una hora de apertura",
                      }}
                      render={({ field }) => (
                        <TextField
                          type="time"
                          fullWidth
                          error={!!errors[dia]?.apertura}
                          helperText={errors[dia]?.apertura?.message}
                          {...field}
                        />
                      )}
                    />
                  </Grid2>
                  <Grid2 size={{ xs: 12, sm: 4 }}>
                    <Controller
                      name={`${dia}.cierre`}
                      control={control}
                      rules={{
                        required: "La hora de cierre es obligatoria",
                        validate: {
                          noEmpty: (value) => value !== "" || "Debes seleccionar una hora de cierre",
                          validCloseTime: (value) => {
                            const apertura = watch(`${dia}.apertura`);
                            return (
                              apertura === "" ||
                              value > apertura ||
                              "La hora de cierre debe ser mayor a la hora de apertura"
                            );
                          },
                        },
                      }}
                      render={({ field }) => (
                        <TextField
                          type="time"
                          fullWidth
                          error={!!errors[dia]?.cierre}
                          helperText={errors[dia]?.cierre?.message}
                          {...field}
                        />
                      )}
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
                onClick={handleCancel}
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
