"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  MenuItem,
  Typography,
  CircularProgress,
  Alert,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { themePalette } from "@/config/theme.config";
import EditIcon from '@mui/icons-material/Edit';
import { taintObjectReference } from "next/dist/server/app-render/entry-base";
import { URL_BASE } from "@/config/config";

type Inputs = {
  nombreEmprendimiento: string;
  ruc: string;
  numeroCelular: string;
  bancoNombre: string;
  bancoTipoCuenta: string;
  bancoNumeroCuenta: string;
  bancoNombreDuenoCuenta: string;
};

const API_GET = `${URL_BASE}users/entrepreneurs`;
const API_PATCH = `${URL_BASE}users/update-entrepreneur`;

export const CambioDatosEmprendimiento: React.FC = () => {
  const router = useRouter();
  const [entrepreneurId, setEntrepreneurId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<Inputs>({ mode: "onChange" });


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

    const fetchData = async () => {
      try {
        const response = await fetch(`${API_GET}/${entrepreneurId}`);
        if (!response.ok) throw new Error("Error al obtener datos");
        const data = await response.json();

        setValue("nombreEmprendimiento", data.nombreEmprendimiento);
        setValue("ruc", data.ruc);
        setValue("numeroCelular", data.numeroCelular);
        setValue("bancoNombre", data.bancoNombre);
        setValue("bancoTipoCuenta", data.bancoTipoCuenta || "Ahorros");
        setValue("bancoNumeroCuenta", data.bancoNumeroCuenta);
        setValue("bancoNombreDuenoCuenta", data.bancoNombreDuenoCuenta);
      } catch (error) {
        console.error("Error cargando datos:", error);
        setErrorMsg("No se pudieron cargar los datos.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [entrepreneurId, setValue]);

  const onSubmit = async (data: Inputs) => {
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

      if (!response.ok) {
        throw new Error("Error al actualizar los datos");
      }

      console.log("✅ Datos actualizados correctamente");
      setSuccessMessage("Datos actualizados correctamente");
    } catch (error) {
      console.error("Error:", error);
      setErrorMsg("Hubo un error al actualizar los datos.");
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
    <Box sx={{ maxWidth: 500, mx: "auto", mt: 5, textAlign: "center" }}>
      <Typography gutterBottom sx={{ fontWeight: "bold", color: themePalette.primary, fontSize: "24px" }}>
        Editar información del emprendimiento
      </Typography>

      {errorMsg && (
        <Typography sx={{ color: "red", mb: 2, fontWeight: "bold" }}>{errorMsg}</Typography>
      )}
      {successMessage && <Alert severity="success">{successMessage}</Alert>}
      

      <form onSubmit={handleSubmit(onSubmit)}>
        <Box display="flex" flexDirection="column" gap={2}>
         
          <FormControl fullWidth sx={{ mb: 2 }}>
            <FormLabel sx={{ color: "black", fontWeight: "bold", textAlign: "left" }}>Nombre del emprendimiento</FormLabel>
            <TextField
              id="nombreEmprendimiento"
              error={!!errors.nombreEmprendimiento}
              placeholder="Ingrese el nombre del emprendimiento"
              {...register("nombreEmprendimiento", { required: "Campo obligatorio" })}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                        <EditIcon />
                    </InputAdornment>
                  ),
                },
              }}
              sx={{
                "& .MuiOutlinedInput-root": { 
                  borderRadius: "8px", 
                  "& fieldset": { borderColor: "gray" }, 
                  "&:hover fieldset": { borderColor: themePalette.secondary },
                  "&.Mui-focused fieldset": { borderColor: themePalette.secondary }, 
                }
              }}
           />
          </FormControl>


          <FormControl fullWidth sx={{ mb: 2 }}>
  <FormLabel sx={{ color: "black", fontWeight: "bold", textAlign: "left" }}>
    RUC/RIMPE
  </FormLabel>
  <TextField
    id="ruc"
    error={!!errors.ruc}
    helperText={errors.ruc?.message} 
    placeholder="Ingrese el RUC o RIMPE"
    {...register("ruc", { 
      required: "El RUC es obligatorio", 
      pattern: { value: /^[0-9]{13}$/, message: "Debe contener exactamente 13 dígitos numéricos" }
    })}
    type="text"
    inputProps={{
      maxLength: 13, 
      inputMode: "numeric",
    }}
    onInput={(e) => {
      const target = e.target as HTMLInputElement;
      target.value = target.value.replace(/\D/g, "").slice(0, 13); 
    }}
    slotProps={{
      input: {
        endAdornment: (
          <InputAdornment position="end">
            <EditIcon />
          </InputAdornment>
        ),
      },
    }}
    sx={{
      "& .MuiOutlinedInput-root": { 
        borderRadius: "8px", 
        "& fieldset": { borderColor: "gray" }, 
        "&:hover fieldset": { borderColor: themePalette.secondary }, 
        "&.Mui-focused fieldset": { borderColor: themePalette.secondary }, 
      }
    }}
  />
</FormControl>


          <FormControl fullWidth sx={{ mb: 2 }}>
  <FormLabel sx={{ color: "black", fontWeight: "bold", textAlign: "left" }}>
    Número celular
  </FormLabel>
  <TextField
    id="numeroCelular"
    error={!!errors.numeroCelular}
    helperText={errors.numeroCelular?.message} 
    placeholder="Ingrese el número celular"
    {...register("numeroCelular", { 
      required: "El número de celular es obligatorio", 
      pattern: { value: /^09\d{8}$/, message: "Debe comenzar con 09 y tener 10 dígitos" }
    })}
    type="text"
    inputProps={{
      maxLength: 10, 
      inputMode: "numeric", 
    }}
    onInput={(e) => {
      const target = e.target as HTMLInputElement;
      target.value = target.value.replace(/\D/g, "").slice(0, 10);
    }}
    slotProps={{
      input: {
        endAdornment: (
          <InputAdornment position="end">
            <EditIcon />
          </InputAdornment>
        ),
      },
    }}
    sx={{
      "& .MuiOutlinedInput-root": { 
        borderRadius: "8px",
        "& fieldset": { borderColor: "gray" }, 
        "&:hover fieldset": { borderColor: themePalette.secondary }, 
        "&.Mui-focused fieldset": { borderColor: themePalette.secondary },
      }
    }}
  />
</FormControl>



          <FormControl fullWidth sx={{ mb: 2 }}>
            <FormLabel sx={{ color: "black", fontWeight: "bold", textAlign: "left" }}>Nombre del banco</FormLabel>
            <TextField
              id="bancoNombre"
              select
              error={!!errors.bancoNombre}
              {...register("bancoNombre", { required: "Campo obligatorio" })}
              value={watch("bancoNombre") || ""}
              sx={{
                "& .MuiOutlinedInput-root": { 
                  borderRadius: "8px", 
                  "& fieldset": { borderColor: "gray" }, 
                  "&:hover fieldset": { borderColor: themePalette.secondary }, 
                  "&.Mui-focused fieldset": { borderColor: themePalette.secondary }, 
                }
              }}
            >
              {[
                "Banco Pichincha", "Banco Guayaquil", "Produbanco", "Banco del Pacífico",
                "Banco Internacional", "Banco Bolivariano", "Banco del Austro",
                "Cooperativa JEP", "Cooperativa Policia Nacional Limitada",
                "Cooperativa Alianza Del Valle", "Cooperativa 29 de Octubre"
              ].map((bank) => (
                <MenuItem key={bank} value={bank}>
                  {bank}
                </MenuItem>
              ))}
            </TextField>
          </FormControl>

          {/* Tipo de cuenta */}
          <FormControl fullWidth sx={{ mb: 2 }}>
            <FormLabel sx={{ color: "black", fontWeight: "bold", textAlign: "left" }}>Tipo de cuenta</FormLabel>
            <RadioGroup
            sx={{ display: "flex", justifyContent: "center", gap: 3 }}
              row
              value={watch("bancoTipoCuenta") || ""}
              onChange={(e) => setValue("bancoTipoCuenta", e.target.value, { shouldValidate: true })}
            >
              <FormControlLabel value="Ahorros" control={<Radio />} label="Ahorros" />
              <FormControlLabel value="Corriente" control={<Radio />} label="Corriente" />
            </RadioGroup>
          </FormControl>


<FormControl fullWidth sx={{ mb: 2 }}>
  <FormLabel sx={{ color: "black", fontWeight: "bold", textAlign: "left" }}>
    Número de cuenta
  </FormLabel>
  <TextField
    id="bancoNumeroCuenta"
    error={!!errors.bancoNumeroCuenta}
    helperText={errors.bancoNumeroCuenta?.message}
    {...register("bancoNumeroCuenta", { 
      required: "El número de cuenta es obligatorio", 
      pattern: { value: /^\d{10,15}$/, message: "Debe tener entre 10 y 15 dígitos numéricos" }
    })}
    type="text"
    inputProps={{
      maxLength: 15, 
      inputMode: "numeric", 
    }}
    onInput={(e) => {
      const target = e.target as HTMLInputElement;
      target.value = target.value.replace(/\D/g, "").slice(0, 15); 
    }}
    slotProps={{
      input: {
        endAdornment: (
          <InputAdornment position="end">
            <EditIcon />
          </InputAdornment>
        ),
      },
    }}
    sx={{
      "& .MuiOutlinedInput-root": { 
        borderRadius: "8px", 
        "& fieldset": { borderColor: "gray" }, 
        "&:hover fieldset": { borderColor: themePalette.secondary },
        "&.Mui-focused fieldset": { borderColor: themePalette.secondary },
      }
    }}
  />
</FormControl>



          <FormControl fullWidth>
  <FormLabel sx={{ color: "black", fontWeight: "bold", textAlign: "left" }}>
    Nombre del propietario de la cuenta
  </FormLabel>
  <TextField
    id="bancoNombreDuenoCuenta"
    error={!!errors.bancoNombreDuenoCuenta}
    helperText={errors.bancoNombreDuenoCuenta?.message} 
    placeholder="Ingrese el nombre del propietario"
    {...register("bancoNombreDuenoCuenta", { 
      required: "Campo obligatorio", 
      pattern: { value: /^[A-Za-z\s]{5,}$/, message: "Solo letras y mínimo 5 caracteres" }
    })}
    type="text"
    inputProps={{
      maxLength: 50, 
    }}
    onInput={(e) => {
      const target = e.target as HTMLInputElement;
      target.value = target.value.replace(/[^A-Za-z\s]/g, "");
    }}
    InputProps={{
      endAdornment: (
        <InputAdornment position="end">
          <EditIcon />
        </InputAdornment>
      ),
    }}
    sx={{
      "& .MuiOutlinedInput-root": { 
        borderRadius: "8px", 
        "& fieldset": { borderColor: "gray" }, 
        "&:hover fieldset": { borderColor: themePalette.secondary }, 
        "&.Mui-focused fieldset": { borderColor: themePalette.secondary }, 
      }
    }}
  />
</FormControl>



          <Box display="flex" justifyContent="center" gap={2} mt={2}  sx={{ padding: "20px 30px 30px 30px " }}>
            <Button variant="contained" onClick={() => router.push("/inicio")}
            
            sx={{
                                                   textTransform: "none",
                                                   backgroundColor: themePalette.primary,
                                                   width: "171px",
                                                   height: "50px",
                                                   fontSize: "18px",
                                                   borderRadius: "20px"
                                                 }}>
              Cancelar
            </Button>
            <Button variant="contained" type="submit" disabled={loading} 
            sx={{
                                                   textTransform: "none",
                                                   backgroundColor: themePalette.primary,
                                                   width: "171px",
                                                   height: "50px",
                                                   fontSize: "18px",
                                                   borderRadius: "20px"
                                                 }}>
              {loading ? <CircularProgress size={24} sx={{ color: "#fff" }} /> : "Guardar"}
            </Button>
          </Box>
        </Box>
      </form>
    </Box>
  );
};
