"use client";
import React from 'react';
import { Box, Button, FormLabel, Checkbox, TextField, MenuItem, FormControlLabel, Typography, InputAdornment } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registroEnvios } from '@/validations/registroEnvios';
import { themePalette } from '@/config/theme.config';
import { GoogleMap, LoadScript, Polygon } from '@react-google-maps/api';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';

const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

type Inputs = {
    deliveryOptions: string[];
    mainStreet: string;
    secondaryStreet: string;
    addressNumber: string;
    reference: string;
    sector: string;
};

const zonas = [
    {
        nombre: "Norte-1",
        color: "green",
        path: [
            { lat: -0.0369258, lng: -78.4567455 },
            { lat: -0.0367541, lng: -78.4358029 },
            { lat: 0.0210958, lng: -78.4249882 },
            { lat: 0.0228124, lng: -78.4562306 },
            { lat: 0.014401, lng: -78.4687618 },
            { lat: 0.0049596, lng: -78.4711651 },
            { lat: -0.0019069, lng: -78.4639553 },
            { lat: -0.0132365, lng: -78.4572605 },
            { lat: -0.0245662, lng: -78.4548573 },
            { lat: -0.0369258, lng: -78.4567455 }
        ]
    },
    {
        nombre: "Norte-2",
        color: "green",
        path: [
            { lat: -0.0367541, lng: -78.4358029 },
            { lat: -0.0412022, lng: -78.4610793 },
            { lat: -0.0836025, lng: -78.5189292 },
            { lat: -0.179561, lng: -78.5249374 },
            { lat: -0.1902039, lng: -78.4756706 },
            { lat: -0.1321826, lng: -78.4456298 },
            { lat: -0.1352725, lng: -78.4135291 },
            { lat: -0.0654065, lng: -78.38469 },
            { lat: -0.0367541, lng: -78.4358029 }
        ]
    },
    {
        nombre: "Centro",
        color: "orange",
        path: [
            { lat: -0.179561, lng: -78.5249374 },
            { lat: -0.2185585, lng: -78.534955 },
            { lat: -0.2427626, lng: -78.5171022 },
            { lat: -0.2455091, lng: -78.5013094 },
            { lat: -0.2171853, lng: -78.4779635 },
            { lat: -0.1989893, lng: -78.4630289 },
            { lat: -0.1843981, lng: -78.4731569 },
            { lat: -0.1902039, lng: -78.4756706 },
            { lat: -0.179561, lng: -78.5249374 }
        ]
    },
    {
        nombre: "Valle-Cumbaya-Tumbaco",
        color: "purple",
        path: [
            { lat: -0.1520223, lng: -78.4440787 },
            { lat: -0.1896159, lng: -78.4595282 },
            { lat: -0.2302994, lng: -78.4761794 },
            { lat: -0.2562201, lng: -78.3283789 },
            { lat: -0.1527089, lng: -78.2916434 },
            { lat: -0.1386327, lng: -78.3321555 },
            { lat: -0.1520223, lng: -78.4440787 }
        ]
    },
    {
        nombre: "Sur",
        color: "red",
        path: [
            { lat: -0.2185585, lng: -78.534955 },
            { lat: -0.2801331, lng: -78.584337 },
            { lat: -0.3738586, lng: -78.5743806 },
            { lat: -0.3549763, lng: -78.5091493 },
            { lat: -0.2455091, lng: -78.5013094 },
            { lat: -0.2427626, lng: -78.5171022 },
            { lat: -0.2185585, lng: -78.534955 }
        ]
    },
    {
        nombre: "Valle Chillos",
        color: "yellow",
        path: [
            { lat: -0.2010492, lng: -78.4628842 },
            { lat: -0.2455091, lng: -78.5013094 },
            { lat: -0.301782, lng: -78.5039086 },
            { lat: -0.3424966, lng: -78.49138 },
            { lat: -0.3507362, lng: -78.4549877 },
            { lat: -0.3404367, lng: -78.425462 },
            { lat: -0.3218976, lng: -78.3897564 },
            { lat: -0.2992386, lng: -78.4055493 },
            { lat: -0.2786395, lng: -78.4433148 },
            { lat: -0.2621602, lng: -78.4546444 },
            { lat: -0.241561, lng: -78.4642575 },
            { lat: -0.2010492, lng: -78.4628842 }
        ]
    }
];

const containerStyle = {
    width: '100%',
    height: '300px',
};

const center = {
    lat: -0.180653,
    lng: -78.467834,
};

export const CambioDatosEnvio: React.FC = () => {
    const { register, handleSubmit, control, formState: { errors } } = useForm<Inputs>({
        resolver: zodResolver(registroEnvios),
        mode: 'onChange',
    });

    const onSubmit = (data: Inputs) => {
        console.log(data);
    };

    return (
        <Box sx={{ maxWidth: 600, mx: 'auto', mt: 5, textAlign: 'left', padding: 3, borderRadius: 2 }}>
            <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ textAlign: 'center' }}>
                Editar envíos y entregas
            </Typography>
            <Typography sx={{ fontSize: '16px', mb: 2, textAlign: 'center' }}>
                ¿Cómo desea ofrecer la entrega de sus productos o servicios?
            </Typography>
            
            <Box display="flex" justifyContent="center" gap={2} mb={2}>
                <Controller
                    name="deliveryOptions"
                    control={control}
                    defaultValue={[]}
                    render={({ field }) => (
                        <>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        {...field}
                                        value="Domicilio"
                                        checked={field.value.includes("Domicilio")}
                                        onChange={(e) => {
                                            const checked = e.target.checked;
                                            const newValue = checked
                                                ? [...field.value, "Domicilio"]
                                                : field.value.filter((option) => option !== "Domicilio");
                                            field.onChange(newValue);
                                        }}
                                    />
                                }
                                label="Domicilio"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        {...field}
                                        value="Retiro en tienda"
                                        checked={field.value.includes("Retiro en tienda")}
                                        onChange={(e) => {
                                            const checked = e.target.checked;
                                            const newValue = checked
                                                ? [...field.value, "Retiro en tienda"]
                                                : field.value.filter((option) => option !== "Retiro en tienda");
                                            field.onChange(newValue);
                                        }}
                                    />
                                }
                                label="Retiro en tienda"
                            />
                        </>
                    )}
                />
            </Box>
            {errors.deliveryOptions && <p className="text-red-500" style={{ textAlign: 'left' }}>{errors.deliveryOptions.message}</p>}

            <FormLabel sx={{ color: 'black', textAlign: 'left', display: 'block', mb: 1 }}>Calle Principal</FormLabel>
            <TextField
                placeholder="Ingrese la calle"
                {...register('mainStreet')}
                error={!!errors.mainStreet}
                fullWidth
                sx={{ mb: 2 }}
            />
            {errors.mainStreet && <p className="text-red-500" style={{ textAlign: 'left' }}>{errors.mainStreet.message}</p>}

            <FormLabel sx={{ color: 'black', textAlign: 'left', display: 'block', mb: 1 }}>Calle Secundaria</FormLabel>
            <TextField
                placeholder="Ingrese la calle"
                {...register('secondaryStreet')}
                error={!!errors.secondaryStreet}
                fullWidth
                sx={{ mb: 2 }}
            />
            {errors.secondaryStreet && <p className="text-red-500" style={{ textAlign: 'left' }}>{errors.secondaryStreet.message}</p>}

            <FormLabel sx={{ color: 'black', textAlign: 'left', display: 'block', mb: 1 }}>Numeración</FormLabel>
            <TextField
                placeholder="Ingrese la numeración"
                {...register('addressNumber')}
                error={!!errors.addressNumber}
                fullWidth
                sx={{ mb: 2 }}
            />
            {errors.addressNumber && <p className="text-red-500" style={{ textAlign: 'left' }}>{errors.addressNumber.message}</p>}

            <FormLabel sx={{ color: 'black', textAlign: 'left', display: 'block', mb: 1 }}>Referencia</FormLabel>
            <TextField
                placeholder="Ingrese la referencia"
                {...register('reference')}
                error={!!errors.reference}
                fullWidth
                sx={{ mb: 2 }}
            />
            {errors.reference && <p className="text-red-500" style={{ textAlign: 'left' }}>{errors.reference.message}</p>}

            <FormLabel sx={{ color: 'black', textAlign: 'left', display: 'block', mb: 1 }}>Sector</FormLabel>
            <TextField
                select
                placeholder="Seleccione el sector"
                {...register('sector')}
                error={!!errors.sector}
                fullWidth
                sx={{ mb: 2 }}
            >
                <MenuItem value="" disabled>Seleccione el sector de su emprendimiento</MenuItem>
                {["Norte - Verde", "Sur - Rojo", "Centro - Naranja", "Valle Cumbaya - Morado", "Valle Chillos - Amarillo"].map((sector) => (
                    <MenuItem key={sector} value={sector}>{sector}</MenuItem>
                ))}
            </TextField>
            {errors.sector && <p className="text-red-500" style={{ textAlign: 'left' }}>{errors.sector.message}</p>}

            <FormLabel sx={{ color: 'black', textAlign: 'left', display: 'block', mb: 1 }}>Mapa de sectorización</FormLabel>
            <LoadScript googleMapsApiKey={apiKey || ''}>
                <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
                    {zonas.map((zona, index) => (
                        <Polygon
                            key={index}
                            paths={zona.path}
                            options={{
                                fillColor: zona.color,
                                fillOpacity: 0.2,
                                strokeColor: zona.color,
                                strokeOpacity: 0.5,
                                strokeWeight: 2,
                            }}
                        />
                    ))}
                </GoogleMap>
            </LoadScript>

            <Box display="flex" justifyContent="space-between" mt={3}>
                <Button
                    variant="outlined"
                    className="h-e34 text-white rounded-[20px] normal-case"
                    sx={{ backgroundColor: themePalette.primary, width: '171px', height: '50px', fontSize: '18px' }}
                >
                    Cancelar
                </Button>
                <Button
                    variant="contained"
                    type="submit"
                    className="h-e34 text-white rounded-[20px] normal-case"
                    sx={{ backgroundColor: themePalette.primary, width: '171px', height: '50px', fontSize: '18px' }}
                    onClick={handleSubmit(onSubmit)}
                >
                    Guardar
                </Button>
            </Box>
        </Box>
    );
};
