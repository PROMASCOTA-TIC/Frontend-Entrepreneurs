"use client";
import React, { useEffect } from "react";
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
  const { register, handleSubmit, setValue, watch } = useForm<Inputs>({
    mode: "onChange",
    defaultValues: formData,
  });

  // Mantener valores previos al actualizar select/radio
  const handleFieldChange = (field: keyof Inputs, value: string) => {
    const currentValues = watch(); // Obtener todos los valores actuales del formulario
    setValue(field, value);
    updateFormData({ ...currentValues, [field]: value }); // Solo actualizar el campo modificado
  };

  // Enviar datos sin validación y avanzar
  const onSubmit = (data: Inputs) => {
    console.log("✅ Datos guardados en formData:", data);
    updateFormData(data);
    console.log("🔄 Avanzando al siguiente paso...");
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl className="form-group">
        <FormLabel htmlFor="nombreEmprendimiento" sx={{ color: "black" }}>
          Nombre del emprendimiento
        </FormLabel>
        <TextField
          id="nombreEmprendimiento"
          placeholder="Ingrese el nombre del emprendimiento"
          {...register("nombreEmprendimiento")}
          defaultValue={formData.nombreEmprendimiento}
        />

        <FormLabel htmlFor="ruc" sx={{ color: "black" }}>RUC/RIMPE</FormLabel>
        <TextField
          id="ruc"
          placeholder="Ingrese el RUC o RIMPE"
          {...register("ruc")}
          defaultValue={formData.ruc}
        />

        <FormLabel htmlFor="numeroCelular" sx={{ color: "black" }}>
          Número celular
        </FormLabel>
        <TextField
          id="numeroCelular"
          placeholder="Ingrese el número celular"
          {...register("numeroCelular")}
          defaultValue={formData.numeroCelular}
        />

        <FormLabel htmlFor="bancoNombre" sx={{ color: "black" }}>Nombre del banco</FormLabel>
        <TextField
          id="bancoNombre"
          select
          value={watch("bancoNombre") || ""}
          onChange={(e) => handleFieldChange("bancoNombre", e.target.value)}
        >
          <MenuItem value="" disabled>Seleccione el banco</MenuItem>
          {[
            "Banco Pichincha", "Banco Guayaquil", "Produbanco", "Banco del Pacífico",
            "Banco Internacional", "Banco Bolivariano", "Banco del Austro",
            "Cooperativa JEP", "Cooperativa Policia Nacional Limitada",
            "Cooperativa Alianza Del Valle", "Cooperativa 29 de Octubre"
          ].map((bank) => (
            <MenuItem key={bank} value={bank}>{bank}</MenuItem>
          ))}
        </TextField>

        <FormLabel sx={{ color: "black" }}>Tipo de cuenta</FormLabel>
        <RadioGroup
          row
          value={watch("bancoTipoCuenta") || ""}
          onChange={(e) => handleFieldChange("bancoTipoCuenta", e.target.value)}
        >
          <FormControlLabel value="Ahorros" control={<Radio />} label="Ahorros" />
          <FormControlLabel value="Corriente" control={<Radio />} label="Corriente" />
        </RadioGroup>

        <FormLabel htmlFor="bancoNumeroCuenta" sx={{ color: "black" }}>
          Número de cuenta
        </FormLabel>
        <TextField
          id="bancoNumeroCuenta"
          placeholder="Ingrese el número de cuenta"
          {...register("bancoNumeroCuenta")}
          defaultValue={formData.bancoNumeroCuenta}
        />

        <FormLabel htmlFor="bancoNombreDuenoCuenta" sx={{ color: "black" }}>
          Nombre del propietario de la cuenta
        </FormLabel>
        <TextField
          id="bancoNombreDuenoCuenta"
          placeholder="Ingrese el nombre del propietario"
          {...register("bancoNombreDuenoCuenta")}
          defaultValue={formData.bancoNombreDuenoCuenta}
        />

        <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
          <Button
            variant="contained"
            onClick={prevStep}
            sx={{ backgroundColor: themePalette.primary }}
          >
            Regresar
          </Button>
          <Button
            variant="contained"
            type="submit"
            sx={{ backgroundColor: themePalette.primary }}
          >
            Siguiente
          </Button>
        </Box>
      </FormControl>
    </form>
  );
};
