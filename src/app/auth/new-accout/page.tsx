"use client";
import { useState } from "react";
import { Box, Grid2, Typography } from "@mui/material";
import Image from "next/image";
import { icon, fondoDuenos } from "@/assets/images";
import { themePalette } from "@/config/theme.config";
import { RegisterForm } from "./registerForm";
import { BusinessDataForm } from "./registroDatosEmprendimiento";
import { ShippingDetailsForm } from "./registroEnvios";
import { RegistroHorarioAtencion } from "./registroHorarios";
import { CompletionMessage } from "./mensajeRegistro";

type FormDataType = {
  email: string;
  password: string;
  name: string;
  aceptoTerminos: string;
  nombreEmprendimiento?: string;
  ruc?: string;
  numeroCelular?: string;
  bancoNombre?: string;
  bancoTipoCuenta?: string;
  bancoNumeroCuenta?: string;
  bancoNombreDuenoCuenta?: string;
  realizaEnvios?: string;
  soloRetiraEnTienda?: string;
  callePrincipal?: string;
  calleSecundaria?: string;
  numeracion?: string;
  referencia?: string;
  sectorLocal?: string;
  horario?: Array<{
    dia: string;
    horaApertura?: string;
    horaCierre?: string;
    cerrado?: string;
  }>;
  fotosLocal?: string[];
  fotosLogotipo?: string[];
};


export default function RegisterPage() {
  const [currentStep, setCurrentStep] = useState(1);

  
  const [formData, setFormData] = useState<FormDataType>({
    email: "",
    password: "",
    name: "",
    aceptoTerminos: "0",
    nombreEmprendimiento: "",
    ruc: "",
    numeroCelular: "",
    bancoNombre: "",
    bancoTipoCuenta: "",
    bancoNumeroCuenta: "",
    bancoNombreDuenoCuenta: "",
    realizaEnvios: "0",
    soloRetiraEnTienda: "0",
    callePrincipal: "",
    calleSecundaria: "",
    numeracion: "",
    referencia: "",
    sectorLocal: ""
  });

  const updateFormData = (data: Partial<FormDataType>) => {
    setFormData((prev) => {
      const updatedData = { ...prev, ...data };
      console.log("🔹 Datos actualizados en formData:", updatedData);
      return updatedData;  // ⚠️ No es necesario retornar el estado en `setFormData`
    });
  };

  const nextStep = () => {
    console.log("🔄 Avanzando al siguiente paso...");
    setCurrentStep((prev) => prev + 1);
};

  const prevStep = () => setCurrentStep((prev) => prev - 1);

  // Función para renderizar el componente correspondiente según el paso actual
  const renderFormComponent = () => {
    switch (currentStep) {
      case 1:
        return <RegisterForm nextStep={nextStep} updateFormData={updateFormData} formData={formData} />;
      case 2:
        case 2:
          return <BusinessDataForm 
              nextStep={nextStep} 
              prevStep={prevStep} 
              updateFormData={updateFormData} 
              formData={formData} 
          />;
      case 3:

      return <ShippingDetailsForm nextStep={nextStep} prevStep={prevStep} updateFormData={updateFormData} formData={formData} />;
      case 4:
     //   return <RegistroHorarioAtencion nextStep={nextStep} prevStep={prevStep} updateFormData={updateFormData} />;
      case 5:
      //  return <CompletionMessage formData={formData} />;
      default:
    //    return <RegisterForm nextStep={nextStep} updateFormData={updateFormData} />;
    }
  };

  return (
    <div>
      <Grid2 container sx={{ textAlign: "center", height: "100vh" }}>
        <Grid2 size={{ xs: 12, md: 7 }}
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            padding: { xs: "20px", md: "0" },
            marginBottom: "21px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              marginBottom: { xs: "20px", md: "34px" },
              marginTop: { xs: "10px", md: "21px" },
            }}
          >
            <Typography
              sx={{ fontSize: { xs: "32px", md: "42px", color: themePalette.primary } }}
            >
              PROMASKOTA
            </Typography>
            <Image
              src={icon}
              style={{
                width: "80px",
                height: "80px",
                marginTop: "8px",
              }}
              alt="logo"
              priority
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              backgroundColor: "rgba(70, 218, 105, 0.08)",
              padding: { xs: "10px 20px", md: "5px 30px" },
              width: { xs: "90%", sm: "80%", lg: "60%" },
              borderRadius: "20px",
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: "28px", md: "36px" },
                fontWeight: "bold",
                margin: { xs: "21px 0px", md: "21px 0px" },
              }}
              className="text-primary"
            >
              {currentStep === 1
                ? "Datos del dueño del negocio"
                : currentStep === 2
                ? "Datos del emprendimiento"
                : currentStep === 3
                ? "Envíos y entregas"
                : currentStep === 4
                ? "Horario de atención"
                : "Registro completado"}
            </Typography>
            
            {renderFormComponent()}
          </Box>
        </Grid2>
        
        <Grid2 size={{ xs: 0, md: 5 }}
          sx={{
            display: { xs: "none", md: "block" },
            margin: 0,
            padding: 0,
            position: "relative",
            "::after": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 64, 64, 0.4)",
              pointerEvents: "none",
            },
          }}
        >
          <Image
            src={fondoDuenos}
            alt="imagen"
            style={{
              margin: 0,
              padding: 0,
              width: "100%",
              height: "auto",
            }}
            priority
          />
        </Grid2>
      </Grid2>
    </div>
  );
}
