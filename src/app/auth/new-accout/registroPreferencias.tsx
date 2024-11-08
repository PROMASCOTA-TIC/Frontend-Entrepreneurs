import BlindIcon from '@mui/icons-material/Blind';
import { Box, Button } from "@mui/material";

const preferenciasDueños = [
    {
        id: 1,
        name: "Paseos",
        icon: <BlindIcon className='text-secondary' />
    },
    {
        id: 2,
        name: "Adopciones",
        icon: <BlindIcon className='text-secondary' />
    },
    {
        id: 3,
        name: "Adiestramiento",
        icon: <BlindIcon className='text-secondary' />
    },
    {
        id: 4,
        name: "Entrenamiento",
        icon: <BlindIcon className='text-secondary' />
    },
    {
        id: 5,
        name: "Tiendas Afiliadas",
        icon: <BlindIcon className='text-secondary' />
    },
    {
        id: 6,
        name: "Lugares Pet Friendly",
        icon: <BlindIcon className='text-secondary' />
    },
];

const preferenciasMascotas = [
    {
        id: 1,
        name: "Salud",
        icon: <BlindIcon className='text-secondary' />
    },
    {
        id: 2,
        name: "Peluquería",
        icon: <BlindIcon className='text-secondary' />
    },
    {
        id: 3,
        name: "Nutrición",
        icon: <BlindIcon className='text-secondary' />
    },
    {
        id: 4,
        name: "Vida Saludable",
        icon: <BlindIcon className='text-secondary' />
    },
    {
        id: 5,
        name: "Servicios de Transporte",
        icon: <BlindIcon className='text-secondary' />
    },
    {
        id: 6,
        name: "Guardería y Cuidado",
        icon: <BlindIcon className='text-secondary' />
    },
]; 

interface RegistroPreferenciasProps {
    setPreferences: (preferences: any) => void;
}

export const RegistroPreferencias = ({ setPreferences }: RegistroPreferenciasProps) => {

    return (
        <div>
            <h2 className="font-semibold mb-[21px]">Para ti como dueño de mascotas:</h2>
           
            <h2 className="font-semibold my-[21px]">Para tus mascotas:</h2>
 
            <Box style={{ margin: '20px 0' }} className="button-is space-x-e21">
                <Button
                    variant="contained"
                    color="primary"
                    className="h-e34 bg-primary text-white rounded-b20 normal-case"
                    onClick={() => setPreferences(false)}
                >
                    Regresar
                </Button>
                
                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    className="h-e34 bg-primary text-white rounded-b20 normal-case"
                >
                    Registrar
                </Button>
            </Box>
        </div>

    )
}
