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
import { UploadImagesForm } from "./subirImagenes";



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

const diasDeLaSemana = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];


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
    sectorLocal: "",
    horario: diasDeLaSemana.map((dia) => ({ dia, cerrado: "0", horaApertura: "", horaCierre: "" })), // Inicialización de horarios
    fotosLocal: [],
    fotosLogotipo: [],
  });


  const updateFormData = (data: Partial<FormDataType>) => {
    setFormData((prev) => {
      let updatedData = { ...prev, ...data };

      if (data.horario) {
        updatedData.horario = data.horario.map((dia) => ({
          dia: dia.dia,
          cerrado: dia.cerrado,
          ...(dia.cerrado === "0" ? { horaApertura: dia.horaApertura, horaCierre: dia.horaCierre } : {}),
        }));
      }

      console.log("🔹 Datos actualizados en formData:", updatedData);
      return updatedData;
    });
  };




  const nextStep = () => {
    console.log("🔄 Avanzando al siguiente paso...");
    setCurrentStep((prev) => prev + 1);
};

  const prevStep = () => setCurrentStep((prev) => prev - 1);

  const handleSuccessfulSubmit = () => {
    console.log("✅ Registro finalizado correctamente.");
    nextStep();
  };



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
        return (
          <RegistroHorarioAtencion
            nextStep={nextStep}
            prevStep={prevStep}
            updateFormData={updateFormData}
            formData={{
              horario: formData.horario?.map((h) => ({
                dia: h.dia,
                cerrado: h.cerrado ?? "0",  // ✅ Asegurar que siempre tenga un valor
                horaApertura: h.horaApertura ?? "",
                horaCierre: h.horaCierre ?? ""
              })) ?? diasDeLaSemana.map((dia) => ({
                dia,
                cerrado: "0",  // ✅ Siempre definir "cerrado" correctamente
                horaApertura: "",
                horaCierre: ""
              }))
              
            }}
          />
        );
        
        case 5:
          
          return (
          <UploadImagesForm
            formData={formData} 
            updateFormData={updateFormData}
            onSubmit={handleSuccessfulSubmit} 
            prevStep={prevStep}
          />
        );
      case 6:
    return <CompletionMessage/>;
      default:
        return <RegisterForm nextStep={nextStep} updateFormData={updateFormData} formData={formData} />;

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
              width: { xs: "90%", sm: "80%", lg: "75%" },
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
                : currentStep === 5
                ? "Subir imágenes"
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
