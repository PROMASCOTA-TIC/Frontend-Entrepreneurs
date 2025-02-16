"use client";

import React, { useEffect, useState } from "react";
import {
  Checkbox,
  FormControlLabel,
  Typography,
  Box,
  Button,
  Grid2,
  Alert,
  CircularProgress,
} from "@mui/material";
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import { themePalette } from "@/config/theme.config";
import { URL_BASE } from "@/config/config";

const API_GET = `${URL_BASE}users/entrepreneurs`;
const API_PATCH = `${URL_BASE}users/update-entrepreneur`;



type Horario = {
  dia: string;
  horaApertura?: string;
  horaCierre?: string;
  cerrado: string;
};

const diasDeLaSemana = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

const CambiarHoraAtencion: React.FC = () => {
  
  const router = useRouter();

  const [entrepreneurId, setEntrepreneurId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
 
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<{ horario: Horario[] }>({
    defaultValues: {
      horario: diasDeLaSemana.map((dia) => ({
        dia,
        horaApertura: "",
        horaCierre: "",
        cerrado: "0",
      })),
    },
  });


  useEffect(() => {
    const storedEntrepreneurId = localStorage.getItem("entrepreneur_id");
    if (storedEntrepreneurId) {
      setEntrepreneurId(storedEntrepreneurId);
    } else {
      console.warn("⚠️ No se encontró el ID del emprendedor en localStorage.");
      setErrorMsg("No se encontró el ID del emprendedor. Por favor, inicia sesión nuevamente.");
    }
  }, []);
  


  useEffect(() => {
    
    if (!entrepreneurId) return;

    const fetchHorarios = async () => {
      try {
        const response = await fetch(`${API_GET}/${entrepreneurId}`);
        if (!response.ok) throw new Error("Error al obtener datos");

        const data = await response.json();
        const horariosBackend = data.horario || [];

        const horariosFormateados = diasDeLaSemana.map((dia) => {
          const diaData = horariosBackend.find((h: any) => h.dia === dia);
          return {
            dia,
            horaApertura: diaData?.horaApertura || "",
            horaCierre: diaData?.horaCierre || "",
            cerrado: diaData?.cerrado === "1" ? "1" : "0",
          };
        });

        setValue("horario", horariosFormateados);
      } catch (error) {
        console.error("Error cargando horarios:", error);
        setErrorMsg("No se pudieron cargar los horarios.");
      }
    };

    fetchHorarios();
  }, [entrepreneurId, setValue]);


  useEffect(() => {
    const horarios = getValues("horario") || [];
    horarios.forEach((horario, index) => {
      if (horario) {
        setValue(`horario.${index}.cerrado`, horario.cerrado);
      }
    });
  }, [watch("horario")]);


  const onSubmit = async (data: { horario: Horario[] }) => {

    if (!entrepreneurId) {
      setErrorMsg("No se encontró el ID del emprendedor.");
      return;
    }

    setLoading(true);
    setErrorMsg(null);
    setSuccessMessage(null);

    try {
      const response = await fetch(`${API_PATCH}/${entrepreneurId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Error al actualizar los horarios");

      console.log("Horarios actualizados correctamente");
      setSuccessMessage("Los cambios se han actualizado correctamente.");

    } catch (error) {
      console.error("Error:", error);
      setErrorMsg("Hubo un error al actualizar los horarios.");
    } finally {
      setLoading(false);
    }
  };
  if (!entrepreneurId) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
        <CircularProgress size={40} />
      </Box>
    );
  }


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
            <Typography gutterBottom sx={{ fontWeight: "bold", color: themePalette.primary, fontSize: "24px" }}>
                    Editar horarios de atención
                  </Typography>
             <Grid2 size={{ xs: 12 }}>
               <Typography align="center">
                 Indica a los clientes cuándo está abierto tu emprendimiento
               </Typography>
               <Grid2 size={{ xs: 12 }}>
               {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
               {successMessage && <Alert severity="success">{successMessage}</Alert>}
               </Grid2>
             </Grid2>
          {/* Formulario */}
          <form onSubmit={handleSubmit(onSubmit)} style={{ width: "70%" }}>
            {diasDeLaSemana.map((dia, index) => (
              <Grid2 container spacing={20} key={dia} alignItems="center" sx={{ marginBottom: 2 }}>
                <Grid2 
                sx={{xs: 4}}>
                  <Typography variant="h6"
                  sx={{ color: "black", fontWeight: "bold"}}
                  >{dia}</Typography>
                  <Controller
                    name={`horario.${index}.cerrado`}
                    control={control}
                    render={({ field }) => (
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={field.value === "1"}
                            onChange={(e) => {
                              const newValue = e.target.checked ? "1" : "0";
                              setValue(`horario.${index}.cerrado`, newValue);
                              if (newValue === "1") {
                                setValue(`horario.${index}.horaApertura`, "");
                                setValue(`horario.${index}.horaCierre`, "");
                              }
                            }}
                          />
                        }
                        label="Cerrado"
                      />
                    )}
                  />
                </Grid2>
                {watch(`horario.${index}.cerrado`) === "0" && (
                  <>
                    <Grid2 
                    sx={{xs: 4}}>
                      <Controller
                        name={`horario.${index}.horaApertura`}
                        control={control}
                        rules={{ required: "La hora de apertura es obligatoria" }}
                        render={({ field }) => (
                          <TimePicker
                            label="Hora de apertura"
                            value={field.value ? dayjs(field.value, "HH:mm") : null}
                            onChange={(newValue) => field.onChange(newValue ? newValue.format("HH:mm") : "")}
                            ampm={false}
                          />
                        )}
                      />
                    </Grid2>
                    <Grid2 
                    sx={{xs: 4}}>
                      <Controller
                        name={`horario.${index}.horaCierre`}
                        control={control}
                        rules={{ required: "La hora de cierre es obligatoria" }}
                        render={({ field }) => (
                          <TimePicker
                            label="Hora de cierre"
                            value={field.value ? dayjs(field.value, "HH:mm") : null}
                            onChange={(newValue) => field.onChange(newValue ? newValue.format("HH:mm") : "")}
                            ampm={false}
                          />
                        )}
                      />
                    </Grid2>
                  </>
                )}
              </Grid2>
            ))}

        
            <Grid2 
            sx={{xs: 2, padding: "20px 30px 30px 30px "}}
            display="flex" justifyContent="center" gap={2} mt={2}  className="button-is space-x-4">
                <Button variant="contained" onClick={() => router.push("/inicio")} sx={{
                                                       textTransform: "none",
                                                       backgroundColor: themePalette.primary,
                                                       width: "171px",
                                                       height: "50px",
                                                       fontSize: "18px",
                                                       borderRadius: "20px"
                                                     }}>
                  Cancelar
                </Button>

                  <Button variant="contained" type="submit" 
                           sx={{
                                                        textTransform: "none",
                                                        backgroundColor: themePalette.primary,
                                                        width: "171px",
                                                        height: "50px",
                                                        fontSize: "18px",
                                                        borderRadius: "20px"
                                                      }}
                          disabled={loading}>
                            {loading ? <CircularProgress size={24} sx={{ color: "#fff" }} /> : "Guardar"}
                          </Button>
            </Grid2>
          </form>
        </Grid2>
      </Box>
    </LocalizationProvider>
  );
};

export default CambiarHoraAtencion;
