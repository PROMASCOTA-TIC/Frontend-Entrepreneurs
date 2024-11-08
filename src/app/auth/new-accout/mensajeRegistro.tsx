// CompletionMessage.tsx
import { themePalette } from "@/config/theme.config";
import { Box, Typography, Button } from "@mui/material";
import { FC } from "react";

export const CompletionMessage: FC = () => {
  return (
    <Box
    >
      <Typography sx={{ marginBottom: "24px", alignContent:'center', fontSize:'18px' }}>
        Tu registro en PROMASCOTA se ha completado con éxito. Ahora puedes iniciar sesión y
        disfrutar de todas las increíbles funciones que hemos preparado para ti.
      </Typography>
      <Typography  sx={{ marginBottom: "24px", alignContent:'center', fontSize:'18px' }}>
        ¡Estamos emocionados de que formes parte de nuestra comunidad! Si necesitas ayuda, no
        dudes en contactarnos. ¡Disfruta de tu experiencia con PROMASCOTA!
      </Typography>
      <Button variant="contained"
                    type="submit"
                    className="h-e34 text-white rounded-[20px] normal-case"
                    sx={{ backgroundColor: themePalette.primary, width: '171px', height: '50px', fontSize: '18px' }}>
        Iniciar Sesión
      </Button>
    </Box>
  );
};
