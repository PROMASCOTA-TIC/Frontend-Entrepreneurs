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

type Inputs = {
  nombreEmprendimiento: string;
  ruc: string;
  numeroCelular: string;
  bancoNombre: string;
  bancoTipoCuenta: string;
  bancoNumeroCuenta: string;
  bancoNombreDuenoCuenta: string;
};

const API_GET = "http://localhost:3001/api/users/entrepreneurs";
const API_PATCH = "http://localhost:3001/api/users/update-entrepreneur";
const idEntrepreneur = "252cdb28-808e-4fb9-8297-4124ced58d1d"; // ID del emprendimiento

export const CambioDatosEmprendimiento: React.FC = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    mode: "onChange",
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Obtener datos actuales del emprendimiento
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_GET}/${idEntrepreneur}`);
        if (!response.ok) throw new Error("Error al obtener datos");
        const data = await response.json();

        // Precargar los valores en los campos del formulario
        setValue("nombreEmprendimiento", data.nombreEmprendimiento);
        setValue("ruc", data.ruc);
        setValue("numeroCelular", data.numeroCelular);
        setValue("bancoNombre", data.bancoNombre);
        setValue("bancoTipoCuenta", data.bancoTipoCuenta || "Ahorros"); // Asegurar que tenga un valor
        setValue("bancoNumeroCuenta", data.bancoNumeroCuenta);
        setValue("bancoNombreDuenoCuenta", data.bancoNombreDuenoCuenta);
      } catch (error) {
        console.error("Error cargando datos:", error);
        setErrorMsg("No se pudieron cargar los datos.");
      }
    };

    fetchData();
  }, [setValue]);

  // Enviar los datos al backend
  const onSubmit = async (data: Inputs) => {
    setLoading(true);
    setErrorMsg(null);
    setSuccessMessage(null);

    try {
      const response = await fetch(`${API_PATCH}/${idEntrepreneur}`, {
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
          {/* Nombre del emprendimiento */}
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
                "& .MuiOutlinedInput-root": { // Aplica estilos al contenedor principal
                  borderRadius: "8px", // Bordes redondeados
                  "& fieldset": { borderColor: "gray" }, // Color del borde normal
                  "&:hover fieldset": { borderColor: themePalette.secondary }, // Color al pasar el mouse
                  "&.Mui-focused fieldset": { borderColor: themePalette.secondary }, // Color cuando está enfocado
                }
              }}
           />
          </FormControl>

          {/* RUC */}
          <FormControl fullWidth sx={{ mb: 2 }}>
  <FormLabel sx={{ color: "black", fontWeight: "bold", textAlign: "left" }}>
    RUC/RIMPE
  </FormLabel>
  <TextField
    id="ruc"
    error={!!errors.ruc}
    helperText={errors.ruc?.message} // 🔹 Muestra el mensaje de error
    placeholder="Ingrese el RUC o RIMPE"
    {...register("ruc", { 
      required: "El RUC es obligatorio", 
      pattern: { value: /^[0-9]{13}$/, message: "Debe contener exactamente 13 dígitos numéricos" }
    })}
    type="text"
    inputProps={{
      maxLength: 13, // 🔹 Restringe la cantidad máxima de caracteres permitidos
      inputMode: "numeric", // 🔹 Asegura que en móviles aparezca el teclado numérico
    }}
    onInput={(e) => {
      const target = e.target as HTMLInputElement;
      target.value = target.value.replace(/\D/g, "").slice(0, 13); // 🔹 Permite solo números y recorta a 13 caracteres
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
        borderRadius: "8px", // Bordes redondeados
        "& fieldset": { borderColor: "gray" }, // Color del borde normal
        "&:hover fieldset": { borderColor: themePalette.secondary }, // Color al pasar el mouse
        "&.Mui-focused fieldset": { borderColor: themePalette.secondary }, // Color cuando está enfocado
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
    helperText={errors.numeroCelular?.message} // 🔹 Muestra el mensaje de error si existe
    placeholder="Ingrese el número celular"
    {...register("numeroCelular", { 
      required: "El número de celular es obligatorio", 
      pattern: { value: /^09\d{8}$/, message: "Debe comenzar con 09 y tener 10 dígitos" }
    })}
    type="text"
    inputProps={{
      maxLength: 10, // 🔹 Máximo de 10 caracteres
      inputMode: "numeric", // 🔹 Asegura el teclado numérico en móviles
    }}
    onInput={(e) => {
      const target = e.target as HTMLInputElement;
      target.value = target.value.replace(/\D/g, "").slice(0, 10); // 🔹 Solo números y recorta a 10 caracteres
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
        borderRadius: "8px", // Bordes redondeados
        "& fieldset": { borderColor: "gray" }, // Color del borde normal
        "&:hover fieldset": { borderColor: themePalette.secondary }, // Color al pasar el mouse
        "&.Mui-focused fieldset": { borderColor: themePalette.secondary }, // Color cuando está enfocado
      }
    }}
  />
</FormControl>


          {/* Banco */}
          <FormControl fullWidth sx={{ mb: 2 }}>
            <FormLabel sx={{ color: "black", fontWeight: "bold", textAlign: "left" }}>Nombre del banco</FormLabel>
            <TextField
              id="bancoNombre"
              select
              error={!!errors.bancoNombre}
              {...register("bancoNombre", { required: "Campo obligatorio" })}
              value={watch("bancoNombre") || ""}
              sx={{
                "& .MuiOutlinedInput-root": { // Aplica estilos al contenedor principal
                  borderRadius: "8px", // Bordes redondeados
                  "& fieldset": { borderColor: "gray" }, // Color del borde normal
                  "&:hover fieldset": { borderColor: themePalette.secondary }, // Color al pasar el mouse
                  "&.Mui-focused fieldset": { borderColor: themePalette.secondary }, // Color cuando está enfocado
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

          {/* Número de cuenta */}
      {/* Número de cuenta */}
<FormControl fullWidth sx={{ mb: 2 }}>
  <FormLabel sx={{ color: "black", fontWeight: "bold", textAlign: "left" }}>
    Número de cuenta
  </FormLabel>
  <TextField
    id="bancoNumeroCuenta"
    error={!!errors.bancoNumeroCuenta}
    helperText={errors.bancoNumeroCuenta?.message} // 🔹 Muestra el mensaje de error si existe
    placeholder="Ingrese el número de cuenta"
    {...register("bancoNumeroCuenta", { 
      required: "El número de cuenta es obligatorio", 
      pattern: { value: /^\d{10,15}$/, message: "Debe tener entre 10 y 15 dígitos numéricos" }
    })}
    type="text"
    inputProps={{
      maxLength: 15, // 🔹 Máximo de 15 caracteres
      inputMode: "numeric", // 🔹 Asegura el teclado numérico en móviles
    }}
    onInput={(e) => {
      const target = e.target as HTMLInputElement;
      target.value = target.value.replace(/\D/g, "").slice(0, 15); // 🔹 Solo números y recorta a 15 caracteres
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
        borderRadius: "8px", // Bordes redondeados
        "& fieldset": { borderColor: "gray" }, // Color del borde normal
        "&:hover fieldset": { borderColor: themePalette.secondary }, // Color al pasar el mouse
        "&.Mui-focused fieldset": { borderColor: themePalette.secondary }, // Color cuando está enfocado
      }
    }}
  />
</FormControl>


          {/* Propietario de la cuenta */}
          <FormControl fullWidth>
  <FormLabel sx={{ color: "black", fontWeight: "bold", textAlign: "left" }}>
    Nombre del propietario de la cuenta
  </FormLabel>
  <TextField
    id="bancoNombreDuenoCuenta"
    error={!!errors.bancoNombreDuenoCuenta}
    helperText={errors.bancoNombreDuenoCuenta?.message} // 🔹 Muestra el mensaje de error si existe
    placeholder="Ingrese el nombre del propietario"
    {...register("bancoNombreDuenoCuenta", { 
      required: "Campo obligatorio", 
      pattern: { value: /^[A-Za-z\s]{5,}$/, message: "Solo letras y mínimo 5 caracteres" }
    })}
    type="text"
    inputProps={{
      maxLength: 50, // 🔹 Evita que ingresen más de 50 caracteres
    }}
    onInput={(e) => {
      const target = e.target as HTMLInputElement;
      target.value = target.value.replace(/[^A-Za-z\s]/g, ""); // 🔹 Solo permite letras y espacios
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
        borderRadius: "8px", // Bordes redondeados
        "& fieldset": { borderColor: "gray" }, // Color del borde normal
        "&:hover fieldset": { borderColor: themePalette.secondary }, // Color al pasar el mouse
        "&.Mui-focused fieldset": { borderColor: themePalette.secondary }, // Color cuando está enfocado
      }
    }}
  />
</FormControl>


          {/* Botones */}
          <Box display="flex" justifyContent="center" gap={2} mt={2}  className="button-is space-x-4">
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
