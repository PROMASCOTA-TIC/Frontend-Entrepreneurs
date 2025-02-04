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
} from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/validations/registerSchema";
import "@/app/auth/new-accout/Login.css";
import "./Login.css";
import { themePalette } from "@/config/theme.config";
import { useRouter } from "next/navigation";

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
  const [acceptTerms, setAcceptTerms] = useState(
    formData.aceptoTerminos === "1"
  );

  const handleAcceptTermsChange = (checked: boolean) => {
    setAcceptTerms(checked);
    setValue("aceptoTerminos", checked ? "1" : "0");
    updateFormData({ ...formData, aceptoTerminos: checked ? "1" : "0" });
  };

  const onSubmit = (data: Inputs) => {
    const { emailConfirm, passwordConfirm, ...filteredData } = data; // ⚡ Excluir emailConfirm y passwordConfirm
    console.log("✅ Datos guardados en formData:", filteredData);
    updateFormData(filteredData);
    console.log("🔄 Avanzando al siguiente paso...");
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form-group">
      <FormLabel htmlFor="name" sx={{ color: "black" }}>
        Nombre
      </FormLabel>
      <TextField
        id="name"
        error={!!errors.name}
        placeholder="Ingrese su nombre"
        {...register("name")}
        sx={{
          "& .MuiOutlinedInput-root": {
            "& fieldset": { borderColor: "gray" },
            "&:hover fieldset": { borderColor: "blue" },
            "&.Mui-focused fieldset": { borderColor: "blue" },
          },
        }}
      />
      {errors.name && <p className="text-red-500">{errors.name.message}</p>}

      <FormLabel htmlFor="email" sx={{ color: "black" }}>
        Correo electrónico
      </FormLabel>
      <TextField
        id="email"
        error={!!errors.email}
        placeholder="Ingrese su correo electrónico"
        {...register("email")}
        sx={{
          "& .MuiOutlinedInput-root": {
            "& fieldset": { borderColor: "gray" },
            "&:hover fieldset": { borderColor: "blue" },
            "&.Mui-focused fieldset": { borderColor: "blue" },
          },
        }}
      />
      {errors.email && <p className="text-red-500">{errors.email.message}</p>}

      {/* Solo se usa para validación, pero no se envía */}
      <FormLabel htmlFor="emailConfirm" sx={{ color: "black" }}>
        Confirmar correo electrónico
      </FormLabel>
      <TextField
        id="emailConfirm"
        error={!!errors.emailConfirm}
        placeholder="Confirme su correo electrónico"
        {...register("emailConfirm")}
        sx={{
          "& .MuiOutlinedInput-root": {
            "& fieldset": { borderColor: "gray" },
            "&:hover fieldset": { borderColor: "blue" },
            "&.Mui-focused fieldset": { borderColor: "blue" },
          },
        }}
      />
      {errors.emailConfirm && (
        <p className="text-red-500">{errors.emailConfirm.message}</p>
      )}

      <FormLabel htmlFor="password" sx={{ color: "black" }}>
        Contraseña
      </FormLabel>
      <OutlinedInput
        id="password"
        type={showPassword ? "text" : "password"}
        error={!!errors.password}
        placeholder="Ingrese una contraseña mínimo 8 caracteres"
        endAdornment={
          <InputAdornment position="end">
            <IconButton onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        {...register("password")}
        sx={{
          "& .MuiOutlinedInput-notchedOutline": { borderColor: "gray" },
          "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "blue" },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "blue",
          },
        }}
      />
      {errors.password && (
        <p className="text-red-500">{errors.password.message}</p>
      )}

      {/* Solo se usa para validación, pero no se envía */}
      <FormLabel htmlFor="passwordConfirm" sx={{ color: "black" }}>
        Confirmar contraseña
      </FormLabel>
      <OutlinedInput
        id="passwordConfirm"
        type={showPasswordConfirm ? "text" : "password"}
        error={!!errors.passwordConfirm}
        placeholder="Ingrese una contraseña mínimo 8 caracteres"
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
            >
              {showPasswordConfirm ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        {...register("passwordConfirm")}
        sx={{
          "& .MuiOutlinedInput-notchedOutline": { borderColor: "gray" },
          "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "blue" },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "blue",
          },
        }}
      />
      {errors.passwordConfirm && (
        <p className="text-red-500">{errors.passwordConfirm.message}</p>
      )}

      <FormControlLabel
        control={
          <Checkbox
            checked={acceptTerms}
            onChange={(e) => handleAcceptTermsChange(e.target.checked)}
            color="primary"
          />
        }
        label="Acepto los términos y condiciones"
        sx={{ color: "black", margin: "10px 0" }}
      />

      <Box style={{ margin: "20px 0" }} className="button-is space-x-4">
        <Button
          variant="contained"
          className="h-e34 text-white rounded-[20px] normal-case"
          sx={{
            backgroundColor: themePalette.primary,
            width: "171px",
            height: "50px",
            fontSize: "18px",
          }}
          onClick={() => router.push("/auth/login")}
        >
          Regresar
        </Button>
        <Button
          variant="contained"
          type="submit"
          disabled={!acceptTerms}
          className="h-e34 text-white rounded-[20px] normal-case"
          sx={{
            backgroundColor: acceptTerms ? themePalette.primary : "gray",
            width: "171px",
            height: "50px",
            fontSize: "18px",
          }}
        >
          Siguiente
        </Button>
      </Box>
    </form>
  );
};
