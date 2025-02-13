"use client";
import React from "react";
import {
  Box,
  Button,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  MenuItem,
  FormControl,
  Select,
  FormHelperText,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { themePalette } from "@/config/theme.config";

type Inputs = {
  nombreEmprendimiento: string;
  ruc: string;
  numeroCelular: string;
  bancoNombre: string;
  bancoTipoCuenta: string;
  bancoNumeroCuenta: string;
  bancoNombreDuenoCuenta: string;
};

type BusinessDataFormProps = {
  nextStep: () => void;
  prevStep: () => void;
  updateFormData: (data: Partial<Inputs>) => void;
  formData: Partial<Inputs>;
};


export const BusinessDataForm: React.FC<BusinessDataFormProps> = ({
  nextStep,
  prevStep,
  updateFormData,
  formData,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<Inputs>({
    mode: "onChange",
    defaultValues: formData,
  });


  const handleFieldChange = (field: keyof Inputs, value: string) => {
    const currentValues = watch();
    setValue(field, value);
    updateFormData({ ...currentValues, [field]: value });
  };

  const onSubmit = (data: Inputs) => {
    console.log("✅ Datos guardados en formData:", data);
    updateFormData(data);
    console.log("🔄 Avanzando al siguiente paso...");
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
       
      <FormControl className="form-group" sx={{ width: "100%" }}>
        {/* Nombre del Emprendimiento */}
        <FormLabel sx={{ color: "black", mb: 1, fontWeight: "bold" }}>
  Nombre del emprendimiento
</FormLabel>
<TextField
  id="nombreEmprendimiento"
  placeholder="Ingrese el nombre del emprendimiento"
  {...register("nombreEmprendimiento", {
    required: "Este campo es obligatorio",
    pattern: {
      value: /^[A-Za-z0-9ÁÉÍÓÚáéíóúÑñ ]+$/,
      message: "Solo se permiten letras y números",
    },
  })}
  error={!!errors.nombreEmprendimiento}
  onInput={(e) => {
    const target = e.target as HTMLInputElement;
    target.value = target.value.replace(/[^A-Za-z0-9ÁÉÍÓÚáéíóúÑñ ]/g, ""); // 🔥 Bloquea caracteres especiales
  }}
  sx={{
    "& .MuiOutlinedInput-root": {
      "& fieldset": { borderColor: "gray", borderRadius: "10px" },
      "&:hover fieldset": { borderColor: themePalette.secondary },
      "&.Mui-focused fieldset": { borderColor: themePalette.secondary },
    },
    backgroundColor: "white",
    borderRadius: "10px",
    mb: 1,
  }}
/>
{errors.nombreEmprendimiento && (
  <FormHelperText sx={{ color: "red", margin: 0 }}>
    {errors.nombreEmprendimiento.message}
  </FormHelperText>
)}

{/* RUC/RIMPE */}
<FormLabel htmlFor="ruc" sx={{ color: "black", mb: 1, fontWeight: "bold" }}>
  RUC/RIMPE
</FormLabel>
<TextField
  id="ruc"
  placeholder="Ingrese el RUC o RIMPE"
  {...register("ruc", {
    required: "Este campo es obligatorio",
    pattern: { value: /^[0-9]{13}$/, message: "Debe tener 13 dígitos numéricos" },
  })}
  error={!!errors.ruc}
  onInput={(e) => {
    const target = e.target as HTMLInputElement;
    target.value = target.value.replace(/[^0-9]/g, "").slice(0, 13); // 🔥 Solo permite números y máximo 13 caracteres
  }}
  sx={{
    "& .MuiOutlinedInput-root": {
      "& fieldset": { borderColor: "gray", borderRadius: "10px" },
      "&:hover fieldset": { borderColor: themePalette.secondary },
      "&.Mui-focused fieldset": { borderColor: themePalette.secondary },
    },
    backgroundColor: "white",
    borderRadius: "10px",
    mb: 2,
  }}
/>
{errors.ruc && <FormHelperText sx={{ color: "red", margin: 0 }}>{errors.ruc.message}</FormHelperText>}


        {/* Número Celular */}
<FormLabel htmlFor="numeroCelular" sx={{ color: "black", mb: 1, fontWeight: "bold" }}>
  Número celular
</FormLabel>
<TextField
  id="numeroCelular"
  placeholder="Ingrese el número celular"
  {...register("numeroCelular", {
    required: "Este campo es obligatorio",
    pattern: { value: /^09[0-9]{8}$/, message: "Debe empezar con 09 y tener 10 dígitos" },
  })}
  error={!!errors.numeroCelular}
  onInput={(e) => {
    const target = e.target as HTMLInputElement;
    target.value = target.value.replace(/[^0-9]/g, "").slice(0, 10); // 🔥 Solo números, máximo 10 caracteres
  }}
  sx={{
    "& .MuiOutlinedInput-root": {
      "& fieldset": { borderColor: "gray", borderRadius: "10px" },
      "&:hover fieldset": { borderColor: themePalette.secondary },
      "&.Mui-focused fieldset": { borderColor: themePalette.secondary },
    },
    backgroundColor: "white",
    borderRadius: "10px",
    mb: 2,
  }}
/>
{errors.numeroCelular && (
  <FormHelperText sx={{ color: "red", margin: 0 }}>
    {errors.numeroCelular.message}
  </FormHelperText>
)}

{/* Nombre del Banco */}
<FormLabel htmlFor="bancoNombre" sx={{ color: "black", mb: 1, fontWeight: "bold" }}>
  Nombre del banco
</FormLabel>
<FormControl fullWidth sx={{ mb: 2 }} error={!!errors.bancoNombre}>
  <Select
    labelId="bancoNombre-label"
    id="bancoNombre"
    {...register("bancoNombre", { required: "Debe seleccionar un banco" })}
    value={watch("bancoNombre") || ""}
    onChange={(e) => handleFieldChange("bancoNombre", e.target.value)}
    displayEmpty
    sx={{
      backgroundColor: "white",  
      borderRadius: "10px",      
      "&.MuiOutlinedInput-root": {   
        "&:hover fieldset": { borderColor: themePalette.secondary }, 
        "&.Mui-focused fieldset": { borderColor: themePalette.secondary } 
      }
    }}
  >
    <MenuItem value="" disabled>
      Seleccione un banco
    </MenuItem>
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
  </Select>
  {errors.bancoNombre && (
    <FormHelperText sx={{ color: "red", margin: 0 }}>{errors.bancoNombre.message}</FormHelperText>
  )}
</FormControl>


{/* Tipo de Cuenta */}
<FormControl component="fieldset" sx={{ width: "100%" }} error={!!errors.bancoTipoCuenta}>
  <FormLabel sx={{ color: "black", mb: 1, fontWeight: "bold", textAlign: "center" }}>
    Tipo de cuenta
  </FormLabel>
  <RadioGroup
    row
    {...register("bancoTipoCuenta", { required: "Debe seleccionar un tipo de cuenta" })}
    value={watch("bancoTipoCuenta") || ""}
    onChange={(e) => handleFieldChange("bancoTipoCuenta", e.target.value)}
    sx={{ display: "flex", justifyContent: "center", gap: 3 }}
  >
    <FormControlLabel
      value="Ahorros"
      control={
        <Radio
          sx={{
            color: "black",
            "&.Mui-checked": { color: themePalette.primary }
          }}
        />
      }
      label="Ahorros"
      sx={{
        "& .MuiTypography-root": { color: "black" }
      }}
    />
    <FormControlLabel
      value="Corriente"
      control={
        <Radio
          sx={{
            color: "black",
            "&.Mui-checked": { color: themePalette.primary }
          }}
        />
      }
      label="Corriente"
      sx={{
        "& .MuiTypography-root": { color: "black" }
      }}
    />
  </RadioGroup>
  {errors.bancoTipoCuenta && (
    <FormHelperText sx={{ color: "red", textAlign: "center", marginTop: "5px" }}>
      {errors.bancoTipoCuenta.message}
    </FormHelperText>
  )}
</FormControl>

        

{/* Número de Cuenta */}
<FormLabel htmlFor="bancoNumeroCuenta" sx={{ color: "black", mb: 1, fontWeight: "bold" }}>
  Número de cuenta
</FormLabel>
<TextField
  id="bancoNumeroCuenta"
  placeholder="Ingrese el número de cuenta"
  {...register("bancoNumeroCuenta", {
    required: "Este campo es obligatorio",
    pattern: { value: /^[0-9]{10,15}$/, message: "Debe tener entre 10 y 15 dígitos" },
  })}
  error={!!errors.bancoNumeroCuenta}
  onInput={(e) => {
    const target = e.target as HTMLInputElement;
    target.value = target.value.replace(/[^0-9]/g, "").slice(0, 15); // 🔥 Solo números, máximo 15 caracteres
  }}
  sx={{
    "& .MuiOutlinedInput-root": {
      "& fieldset": { borderColor: "gray", borderRadius: "10px" },
      "&:hover fieldset": { borderColor: themePalette.secondary },
      "&.Mui-focused fieldset": { borderColor: themePalette.secondary },
    },
    backgroundColor: "white",
    borderRadius: "10px",
    mb: 2,
  }}
/>
{errors.bancoNumeroCuenta && (
  <FormHelperText sx={{ color: "red", margin: 0 }}>
    {errors.bancoNumeroCuenta.message}
  </FormHelperText>
)}

{/* Nombre del Propietario de la Cuenta */}
<FormLabel htmlFor="bancoNombreDuenoCuenta" sx={{ color: "black", mb: 1, fontWeight: "bold" }}>
  Nombre del propietario de la cuenta
</FormLabel>
<TextField
  id="bancoNombreDuenoCuenta"
  placeholder="Ingrese el nombre del propietario"
  {...register("bancoNombreDuenoCuenta", {
    required: "Este campo es obligatorio",
    pattern: { value: /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/, message: "Solo se permiten letras" },
  })}
  error={!!errors.bancoNombreDuenoCuenta}
  onInput={(e) => {
    const target = e.target as HTMLInputElement;
    target.value = target.value.replace(/[^A-Za-zÁÉÍÓÚáéíóúÑñ\s]/g, ""); // 🔥 Bloquea números y caracteres especiales
  }}
  sx={{
    "& .MuiOutlinedInput-root": {
      "& fieldset": { borderColor: "gray", borderRadius: "10px" },
      "&:hover fieldset": { borderColor: themePalette.secondary },
      "&.Mui-focused fieldset": { borderColor: themePalette.secondary },
    },
    backgroundColor: "white",
    borderRadius: "10px",
    mb: 2,
  }}
/>
{errors.bancoNombreDuenoCuenta && (
  <FormHelperText sx={{ color: "red", margin: 0 }}>
    {errors.bancoNombreDuenoCuenta.message}
  </FormHelperText>
)}


       

        {/* Botones */}
        <Box  style={{ margin: "20px 0" }} className="button-is space-x-4">
          <Button variant="contained" onClick={prevStep} 
          sx={{ 
                      backgroundColor: themePalette.primary, 
                      textTransform: "none",
                      color: "white",
                      width: "171px", 
                      height: "50px", 
                      fontSize: "18px",
                      borderRadius: "20px"
                    }}>
            Regresar
          </Button>
          <Button variant="contained" type="submit" 
          sx={{
                      textTransform: "none",
                      backgroundColor: themePalette.primary,
                      width: "171px",
                      height: "50px",
                      fontSize: "18px",
                      borderRadius: "20px"
                    }}>
            Siguiente
          </Button>
        </Box>
      </FormControl>
    </form>
  );
};
