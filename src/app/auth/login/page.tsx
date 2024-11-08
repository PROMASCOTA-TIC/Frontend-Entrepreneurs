import { theme } from '@/app/config/theme.config';
import { Box, Grid2, Typography } from "@mui/material";
import Image from "next/image";
import LogoVerde from "@/assets/images/logoVerde.png";
import Imagen from "@/assets/images/Foto.png";
import { LoginForm } from "./ui/LoginForm";

export default function Login() {
  return (
    <div>
      <Grid2 container
        sx={{
          textAlign: 'center',
          height: '100vh',
          fontFamily: theme.typography.fontFamily,
        }} >
        <Grid2 size={{ xs: 12, md: 7 }}
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            padding: { xs: '20px', md: '0' },
          }} >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
              marginBottom: { xs: '20px', md: '34px' },
              marginTop: { xs: '10px', md: '21px' }
            }} >
            <Typography
              sx={{
                fontSize: { xs: '32px', md: '42px' },
                color: theme.palette.primary.main,
              }}>
              PROMASCOTA
            </Typography>
            <Image src={LogoVerde}
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
            }}>
            <Typography
              sx={{
                fontSize: { xs: '28px', md: '36px' },
                fontWeight: 'bold',
                margin: { xs: '20px 0px', md: '34px 0px' },
                color: theme.palette.primary.main,
              }}
            >
              Inicio de sesión
            </Typography>
            <LoginForm />
          </Box>
        </Grid2>
        <Grid2 size={{ xs: 0, md: 5 }}
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
            }
          }}>
          <Image src={Imagen} alt="imagen"
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
