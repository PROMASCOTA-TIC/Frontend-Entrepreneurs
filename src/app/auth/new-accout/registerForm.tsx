"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  Box,
  Button,
  FormLabel,
  TextField,
  Checkbox,
  FormControlLabel,
  Typography,
} from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/validations/registerSchema";
import "@/app/auth/new-accout/Login.css";
import "./Login.css";
import { themePalette } from "@/config/theme.config";
import { useRouter } from "next/navigation";
import TerminosModal from "@/app/(emprendedor)/components/modals/TerminosModal";

type Inputs = {
  name: string;
  email: string;
  emailConfirm: string;
  password: string;
  passwordConfirm: string;
  aceptoTerminos: string;
};

type RegisterFormProps = {
  nextStep: () => void;
  updateFormData: (data: Partial<Inputs>) => void;
  formData: Partial<Inputs>;
};

export const RegisterForm: React.FC<RegisterFormProps> = ({
  nextStep,
  updateFormData,
  formData,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<Inputs>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
    defaultValues: formData,
  });

  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(formData.aceptoTerminos === "1");
  const [openTermsModal, setOpenTermsModal] = useState(false); 

  const handleAcceptTermsChange = (checked: boolean) => {
    setAcceptTerms(checked);
    setValue("aceptoTerminos", checked ? "1" : "0");
    updateFormData({ ...formData, aceptoTerminos: checked ? "1" : "0" });
  };

  const onSubmit = (data: Inputs) => {
    const { emailConfirm, passwordConfirm, ...filteredData } = data;
    console.log("✅ Datos guardados en formData:", filteredData);
    updateFormData(filteredData);
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form-group">
      {[
        { field: "name", label: "Nombre" },
        { field: "email", label: "Correo electrónico" },
        { field: "emailConfirm", label: "Confirmar correo electrónico" },
      ].map(({ field, label }) => (
        <Box key={field} sx={{ display: "flex", flexDirection: "column", mb: 2, width: "100%" }}>
          <FormLabel htmlFor={field} sx={{ color: "black", mb: 1, fontWeight: "bold" }}>
            {label}
          </FormLabel>
          <TextField
            id={field}
            error={!!errors[field as keyof Inputs]}
            placeholder={`Ingrese ${label.toLowerCase()}`}
            {...register(field as keyof Inputs)}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "gray", borderRadius: "10px" },
                "&:hover fieldset": { borderColor: themePalette.secondary },
                "&.Mui-focused fieldset": { borderColor: themePalette.secondary },
              },
              backgroundColor: "white",
              borderRadius: "10px",
            }}
          />
          {errors[field as keyof Inputs] && (
            <p style={{ color: "red", fontSize: "14px", textAlign: "left", marginTop: "5px", width: "100%" }}>
              {errors[field as keyof Inputs]?.message}
            </p>
          )}
        </Box>
      ))}

      {[
        { field: "password", label: "Contraseña", show: showPassword, setShow: setShowPassword },
        { field: "passwordConfirm", label: "Confirmar contraseña", show: showPasswordConfirm, setShow: setShowPasswordConfirm },
      ].map(({ field, label, show, setShow }) => (
        <Box key={field} sx={{ display: "flex", flexDirection: "column", mb: 2, width: "100%" }}>
          <FormLabel htmlFor={field} sx={{ color: "black", mb: 1, fontWeight: "bold" }}>
            {label}
          </FormLabel>
          <OutlinedInput
            id={field}
            type={show ? "text" : "password"}
            error={!!errors[field as keyof Inputs]}
            placeholder={`Ingrese ${label.toLowerCase()}`}
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={() => setShow(!show)}>
                  {show ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            {...register(field as keyof Inputs)}
            sx={{
              "& .MuiOutlinedInput-notchedOutline": { borderColor: "gray", borderRadius: "10px" },
              "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: themePalette.secondary },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: themePalette.secondary },
              backgroundColor: "white",
              borderRadius: "10px",
            }}
          />
          {errors[field as keyof Inputs] && (
            <p style={{ color: "red", fontSize: "14px", textAlign: "left", marginTop: "5px", width: "100%" }}>
              {errors[field as keyof Inputs]?.message}
            </p>
          )}
        </Box>
      ))}

<FormControlLabel
        control={
          <Checkbox
            checked={acceptTerms}
            onChange={(e) => handleAcceptTermsChange(e.target.checked)}
            sx={{ color: themePalette.secondary }}
          />
        }
        label={
          <Typography>
            Acepto los{" "}
            <span
              onClick={() => setOpenTermsModal(true)}
              style={{
                color: themePalette.primary,
                textDecoration: "underline",
                cursor: "pointer",
              }}
            >
              términos y condiciones
            </span>
          </Typography>
        }
        sx={{ color: "black", margin: "10px 0" }}
      />

      {/* Modal de Términos y Condiciones */}
      <TerminosModal open={openTermsModal} onClose={() => setOpenTermsModal(false)} />

      {/* Botones */}
      <Box style={{ margin: "20px 0" }} className="button-is space-x-4">
        <Button
          variant="outlined"
          onClick={() => router.push("/auth/login")}
          sx={{
            backgroundColor: themePalette.primary,
            textTransform: "none",
            color: "white",
            width: "171px",
            height: "50px",
            fontSize: "18px",
            borderRadius: "20px",
          }}
        >
          Regresar
        </Button>
        <Button
          variant="contained"
          type="submit"
          disabled={!acceptTerms}
          sx={{
            textTransform: "none",
            backgroundColor: acceptTerms ? themePalette.primary : "gray",
            width: "171px",
            height: "50px",
            fontSize: "18px",
            borderRadius: "20px",
          }}
        >
          Siguiente
        </Button>
      </Box>
    </form>
  );
};
