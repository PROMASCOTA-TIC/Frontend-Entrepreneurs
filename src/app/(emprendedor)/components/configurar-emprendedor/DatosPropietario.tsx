"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Typography,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/validations/registerSchema";
import { useRouter } from "next/navigation";
import "@/app/auth/new-accout/Login.css";
import "./Login.css";
import { themePalette } from "@/config/theme.config";
import { URL_BASE } from "@/config/config";

type Inputs = {
  name?: string;
  email?: string;
  emailConfirm?: string;
  password?: string;
  passwordConfirm?: string;
};

export const RegisterFormCambiar: React.FC = () => {
  const router = useRouter();
  const entrepreneurId = "252cdb28-808e-4fb9-8297-4124ced58d1d"; 
  const {
    register,
    handleSubmit,
    setValue, 
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
  
    const fetchEntrepreneurData = async () => {
      try {
        const response = await axios.get(`${URL_BASE}users/entrepreneurs/${entrepreneurId}`);


        const { name, email } = response.data;

        setValue("name", name);
        setValue("email", email);
        setValue("emailConfirm", email); 

      } catch (error) {
        console.error("Error al cargar los datos del usuario:", error);
        setErrorMessage("Error al cargar la información del usuario.");
      }
    };

    fetchEntrepreneurData();
  }, [entrepreneurId, setValue]);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowPasswordConfirm = () =>
    setShowPasswordConfirm((show) => !show);

  const onSubmit = async (data: Inputs) => {
    setLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    let filteredData = Object.fromEntries(
      Object.entries(data).filter(([_, value]) => value !== undefined && value !== "")
    );


    delete filteredData.emailConfirm;
    delete filteredData.passwordConfirm;

    if (Object.keys(filteredData).length === 0) {
      setErrorMessage("Debe modificar al menos un campo antes de guardar.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.patch(
        `${URL_BASE}users/update-entrepreneur/${entrepreneurId}`,
        filteredData,
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("✅ Emprendedor actualizado:", response.data);
      setSuccessMessage("Los cambios se han actualizado correctamente.");

    } catch (error: any) {
      console.error("Error en la actualización:", error);
      setErrorMessage(
        error.response?.data?.message || "Hubo un problema al actualizar la información."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 5, textAlign: "center" }}>
      <Typography
        gutterBottom
        sx={{ fontWeight: "bold", color: themePalette.primary, fontSize: "24px" }}
      >
        Editar información del propietario
      </Typography>

      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      {successMessage && <Alert severity="success">{successMessage}</Alert>}

      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <FormLabel sx={{ color: "black", fontWeight: "bold", textAlign: "left" }}>
            Nombre
          </FormLabel>
          <OutlinedInput
            placeholder="Ingrese su nombre y apellido"
            {...register("name")}
            endAdornment={
              <InputAdornment position="end">
                  <EditIcon />
              </InputAdornment>
            }
            sx={{ "& .MuiOutlinedInput-notchedOutline": { borderColor: "gray", borderRadius: "8px" } }}
          />
        </FormControl>

        <FormControl fullWidth sx={{ mb: 2 }}>
          <FormLabel sx={{ color: "black", fontWeight: "bold", textAlign: "left" }}>
            Correo electrónico
          </FormLabel>
          <OutlinedInput
            placeholder="Ingrese su correo electrónico"
            {...register("email")}
            endAdornment={
              <InputAdornment position="end">
                  <EditIcon />
              </InputAdornment>
            }
            sx={{ "& .MuiOutlinedInput-notchedOutline": { borderColor: "gray", borderRadius: "8px" } }}
          />
        </FormControl>

        <FormControl fullWidth sx={{ mb: 2 }}>
          <FormLabel sx={{ color: "black", fontWeight: "bold", textAlign: "left" }}>
            Confirmar correo electrónico
          </FormLabel>
          <OutlinedInput
            placeholder="Confirme su correo electrónico"
            {...register("emailConfirm")}
            endAdornment={
              <InputAdornment position="end">
                  <EditIcon />
              </InputAdornment>
            }
            sx={{ "& .MuiOutlinedInput-notchedOutline": { borderColor: "gray", borderRadius: "8px" } }}
          />
        </FormControl>

        <FormControl fullWidth sx={{ mb: 2 }}>
          <FormLabel sx={{ color: "black", fontWeight: "bold", textAlign: "left" }}>
            Contraseña nueva
          </FormLabel>
          <OutlinedInput
            type={showPassword ? "text" : "password"}
            placeholder="Ingrese su contraseña actual"
            {...register("password")}
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={handleClickShowPassword} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            sx={{ "& .MuiOutlinedInput-notchedOutline": { borderColor: "gray", borderRadius: "8px" } }}
          />
        </FormControl>

        <FormControl fullWidth sx={{ mb: 2 }}>
          <FormLabel sx={{ color: "black", fontWeight: "bold", textAlign: "left" }}>
            Confirmar nueva contraseña
          </FormLabel>
          <OutlinedInput
            type={showPasswordConfirm ? "text" : "password"}
            placeholder="Ingresa una nueva contraseña"
            {...register("passwordConfirm")}
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={handleClickShowPasswordConfirm} edge="end">
                  {showPasswordConfirm ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            sx={{ "& .MuiOutlinedInput-notchedOutline": { borderColor: "gray", borderRadius: "8px" } }}
          />
        </FormControl>

        <Box display="flex" justifyContent="center" gap={2} mt={2}  className="button-is space-x-4" >
          <Button variant="contained" 
          sx={{
                                       textTransform: "none",
                                       backgroundColor: themePalette.primary,
                                       width: "171px",
                                       height: "50px",
                                       fontSize: "18px",
                                       borderRadius: "20px"
                                     }}
          onClick={() => router.push("/inicio")}>
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
        </Box>
      </form>
    </Box>
  );
};
