"use client";
import { useState } from "react";
import { Box, Grid2, Typography } from "@mui/material";
import Image from "next/image";
import { icon, fondoDuenos } from "@/assets/images";
import PasswordRecovery from "./recuperarContraseña";

export default function Login() {
  const [preferences, setPreferences] = useState(false);

  return (
   <PasswordRecovery />
  );
}