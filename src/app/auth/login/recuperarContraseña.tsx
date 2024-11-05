"use client";
import { useState } from "react";
import { Box, Button, Grid2, Typography, TextField } from "@mui/material";
import Image from "next/image";
import { icon, fondoDuenos } from "@/assets/images";
import { themePalette } from "@/config/theme.config";

export default function PasswordRecovery() {
  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const handleSendEmail = () => {
    // Validate email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setEmailError("Por favor ingrese un correo electrónico válido.");
      return;
    }
    setEmailError(""); // Clear error if validation passes
    setEmailSent(true);
  };

  return (
    <div>
      <Grid2 container
        sx={{
          textAlign: 'center',
          height: '100vh',
        }}
      >
        <Grid2 
          size={{ xs: 12, md: 7 }}
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            padding: { xs: '20px', md: '0' },
            marginBottom: "21px",
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
              marginBottom: { xs: '20px', md: '34px' },
              marginTop: { xs: '10px', md: '21px' },
            }}
          >
            <Typography
              sx={{ fontSize: { xs: '32px', md: '42px' } }}
              className="text-primary"
            >
              PROMASCOTA
            </Typography>
            <Image
              src={icon}
              style={{
                width: '80px',
                height: '80px',
                marginTop: '8px',
              }}
              alt="logo"
              priority
            />
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: 'rgba(70, 218, 105, 0.08)',
              padding: { xs: '10px 20px', md: '5px 30px' },
              width: { xs: '90%', sm: '80%', lg: '60%' },
              borderRadius: '20px',
            }}
          >
            {emailSent ? (
              <Typography
                sx={{
                  fontSize: { xs: '18px', md: '18px' },
                  margin: { xs: '21px 0px', md: '21px 0px' },
                }}
            
              >
                Un correo electrónico con instrucciones para restablecer tu contraseña ha sido enviado a la dirección proporcionada. Por favor, revisa tu bandeja de entrada y sigue los pasos indicados en el correo para completar el proceso.
                <br />
                <br />
                Si no encuentras el correo en tu bandeja de entrada, verifica la carpeta de spam o intenta de nuevo.
              </Typography>
            ) : (
              <>
                <Typography
                  sx={{
                    fontSize: { xs: '28px', md: '36px' },
                    fontWeight: 'bold',
                    margin: { xs: '21px 0px', md: '21px 0px' },
                  }}
                  className="text-primary"
                >
                  Recuperar Clave
                </Typography>
                <Typography
                  sx={{
                    fontSize: { xs: '16px', md: '18px' },
                    color: 'gray',
                    marginBottom: '10px',
                  }}
                >
                  Ingresa el correo electrónico que usas en Promascota para recuperar tu cuenta:
                </Typography>
                <TextField
                  label="Correo Electrónico"
                  variant="outlined"
                  fullWidth
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={!!emailError}
                  helperText={emailError}
                  sx={{ marginBottom: "20px" }}
                />
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Button
                    variant="contained"
                    className="h-e34 text-white rounded-[20px] normal-case"
                    sx={{
                      backgroundColor: themePalette.primary,
                      width: '171px',
                      height: '50px',
                      fontSize: '18px',
                      margin: '20px',
                    }}
                    onClick={handleSendEmail}
                  >
                    Recuperar
                  </Button>
                </Box>
              </>
            )}

            {emailSent && (
              <Box sx={{ display: 'flex', justifyContent: 'center', margin: '20px' }}>
                <Button
                  variant="contained"
                  className="h-e34 text-white rounded-[20px] normal-case"
                  sx={{
                    backgroundColor: themePalette.primary,
                    width: '171px',
                    height: '50px',
                    fontSize: '18px',
                  }}
                  onClick={() => (window.location.href = "/")}
                >
                  Iniciar sesión
                </Button>
              </Box>
            )}
          </Box>
        </Grid2>

        <Grid2
          size={{ xs: 0, md: 5 }}
          sx={{
            display: { xs: 'none', md: 'block' },
            margin: 0,
            padding: 0,
            position: 'relative',
            '::after': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 64, 64, 0.4)',
              pointerEvents: 'none',
            },
          }}
        >
          <Image
            src={fondoDuenos}
            alt="imagen"
            style={{
              margin: 0,
              padding: 0,
              width: '100%',
              height: '100vh',
            }}
            priority
          />
        </Grid2>
      </Grid2>
    </div>
  );
}
