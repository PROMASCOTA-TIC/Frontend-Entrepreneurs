// CompletionMessage.tsx
import { themePalette } from "@/config/theme.config";
import { Box, Typography, Button } from "@mui/material";
import { FC } from "react";

export const CompletionMessage: FC = () => {
  return (
    <Box
    >
      <Typography sx={{ marginBottom: "24px", alignContent:'center', fontSize:'18px' }}>
       Tu registro en PROMASKOTA ha sido exitoso! Un administrador revisará tu solicitud y pronto 
       recibirás una llamada para acordar los detalles. El proceso de confirmación puede tomar entre 24 y 48 horas. 
       Agradecemos tu paciencia y te damos la bienvenida a nuestra comunidad. 
      </Typography>
      <Typography  sx={{ marginBottom: "24px", alignContent:'center', fontSize:'18px' }}>
        ¡Estamos emocionados de que formes parte de nuestra comunidad! Si necesitas ayuda, no
        dudes en contactarnos. ¡Disfruta de tu experiencia con PROMASKOTA!
      </Typography>
      <Button     variant="contained"
                  className="h-e34 text-white rounded-[20px] normal-case"
                  sx={{
                    backgroundColor: themePalette.primary,
                    width: '171px',
                    height: '50px',
                    fontSize: '18px',
                    marginBottom: '20px',
                  }}
                  onClick={() => (window.location.href = "/auth/login")}
                >
                  Iniciar sesión
      </Button>
    </Box>
  );
};
