"use client";

import React from "react";
import { Checkbox, FormControlLabel, Grid2, TextField, Typography, Box, Button } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import'@/assets/styles/emprendedores/general.css';
import { themePalette } from "../config/theme.config";


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

const CheackHorarios: React.FC = () => {
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

  const onSubmit = (data: { [key: string]: HorarioDia }) => {
    console.log(data); // Aquí puedes manejar los datos del formulario
  };

  const handleCancel = () => {
    reset(); // Resetea el formulario a los valores por defecto
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        border: "1px solid #ccc",
        padding: 1,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Grid2 sx={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>
        <Grid2 sx={{ flexDirection: "column", alignItems: "center", justifyContent: "center", color:themePalette.primary }}>
          <Typography className="h1SemiBold" align="center">Horarios de atención</Typography>
          <Typography className="normalRegular"  align="center">Indica a los clientes cuándo está abierto tu emprendimiento</Typography>
        </Grid2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {diasDeLaSemana.map((dia) => (
            <Grid2 key={dia} sx={{ marginBottom: 2, color:themePalette.primary }} className="minimaBold">
              <Typography variant="h6">{dia}</Typography>

              <Controller
                name={`${dia}.cerrado`}
                control={control}
                render={({ field }) => (
                  <FormControlLabel control={<Checkbox {...field} checked={field.value} />} label="Cerrado" />
                )}
              />

              {!watch(`${dia}.cerrado`) && (
                <Grid2 container spacing={2} sx={{ width: 500 }}>
                  <Grid2 size={{ xs: 6 }}>
                    <Controller
                      name={`${dia}.apertura`}
                      control={control}
                      rules={{
                        required: "La hora de apertura es obligatoria",
                        validate: (value) => value !== "" || "Debes seleccionar una hora de apertura",
                      }}
                      render={({ field }) => (
                        <TextField
                          label="Hora de Apertura"
                          type="time"
                          fullWidth
                          error={!!errors[dia]?.apertura}
                          helperText={errors[dia]?.apertura?.message}
                          InputLabelProps={{ shrink: true }} // Asegura que la etiqueta no se superponga
                          {...field}
                        />
                      )}
                    />
                  </Grid2>
                  <Grid2 size={{ xs: 6 }}>
                    <Controller
                      name={`${dia}.cierre`}
                      control={control}
                      rules={{
                        required: "La hora de cierre es obligatoria",
                        validate: (value) => value !== "" || "Debes seleccionar una hora de cierre",
                      }}
                      render={({ field }) => (
                        <TextField
                          label="Hora de Cierre"
                          type="time"
                          fullWidth
                          error={!!errors[dia]?.cierre}
                          helperText={errors[dia]?.cierre?.message}
                          InputLabelProps={{ shrink: true }} // Asegura que la etiqueta no se superponga
                          {...field}
                        />
                      )}
                    />
                  </Grid2>
                </Grid2>
              )}
            </Grid2>
          ))}

          <Grid2 container spacing={2} justifyContent="center" sx={{ marginTop: 3 }}>
            <Grid2>
              <Button variant="contained" color="primary" type="submit" className="buttonHorarios">
                Guardar
              </Button>
            </Grid2>
            <Grid2>
              <Button variant="outlined" color="secondary" onClick={handleCancel} className="buttonHorarios">
                Cancelar
              </Button>
            </Grid2>
          </Grid2>
        </form>
      </Grid2>
    </Box>
  );
};

export default CheackHorarios;
