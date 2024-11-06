"use client";

import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Button, FormControl, FormLabel, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from '@/validations/registerSchema';
import '@/app/auth/new-accout/Login.css';
import "./Login.css";
import { themePalette } from '@/config/theme.config';

type Inputs = {
    name: string;
    email: string;
    emailConfirm: string;
    password: string;
    passwordConfirm: string;
};

export const RegisterFormCambiar: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>({
        resolver: zodResolver(registerSchema),
        mode: 'onChange',
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowPasswordConfirm = () => setShowPasswordConfirm((show) => !show);

    const onSubmit = (data: Inputs) => {
        console.log(data);
    };

    return (
        <Box sx={{ maxWidth: 400, mx: 'auto', mt: 5, textAlign: 'center' }}>
            <Typography gutterBottom sx={{ fontWeight: 'bold', color: themePalette.primary, fontSize:'24px' }}>
                Editar información del propietario
            </Typography>
            
            <FormControl fullWidth sx={{ mb: 2 }}>
                <FormLabel sx={{ color: 'black', fontWeight: 'bold', textAlign: 'left' }}>Nombre</FormLabel>
                <OutlinedInput
                    placeholder="Ingrese su nombre y apellido"
                    {...register('name')}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton edge="end">
                                <EditIcon />
                            </IconButton>
                        </InputAdornment>
                    }
                    sx={{
                        '& .MuiOutlinedInput-notchedOutline': { borderColor: 'gray', borderRadius: '8px' },
                    }}
                />
                {errors.name && <Typography color="error" sx={{ textAlign: 'left' }}>{errors.name.message}</Typography>}
            </FormControl>

            <FormControl fullWidth sx={{ mb: 2 }}>
                <FormLabel sx={{ color: 'black', fontWeight: 'bold', textAlign: 'left' }}>Correo electrónico</FormLabel>
                <OutlinedInput
                    placeholder="Ingrese su correo electrónico"
                    {...register('email')}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton edge="end">
                                <EditIcon />
                            </IconButton>
                        </InputAdornment>
                    }
                    sx={{
                        '& .MuiOutlinedInput-notchedOutline': { borderColor: 'gray', borderRadius: '8px' },
                    }}
                />
                {errors.email && <Typography color="error" sx={{ textAlign: 'left' }}>{errors.email.message}</Typography>}
            </FormControl>

            <FormControl fullWidth sx={{ mb: 2 }}>
                <FormLabel sx={{ color: 'black', fontWeight: 'bold', textAlign: 'left' }}>Confirmar correo electrónico</FormLabel>
                <OutlinedInput
                    placeholder="Confirme su correo electrónico"
                    {...register('emailConfirm')}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton edge="end">
                                <EditIcon />
                            </IconButton>
                        </InputAdornment>
                    }
                    sx={{
                        '& .MuiOutlinedInput-notchedOutline': { borderColor: 'gray', borderRadius: '8px' },
                    }}
                />
                {errors.emailConfirm && <Typography color="error" sx={{ textAlign: 'left' }}>{errors.emailConfirm.message}</Typography>}
            </FormControl>

            <FormControl fullWidth sx={{ mb: 2 }}>
                <FormLabel sx={{ color: 'black', fontWeight: 'bold', textAlign: 'left' }}>Contraseña actual</FormLabel>
                <OutlinedInput
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Ingrese su contraseña actual"
                    {...register('password')}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton onClick={handleClickShowPassword} edge="end">
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    }
                    sx={{
                        '& .MuiOutlinedInput-notchedOutline': { borderColor: 'gray', borderRadius: '8px' },
                    }}
                />
                {errors.password && <Typography color="error" sx={{ textAlign: 'left' }}>{errors.password.message}</Typography>}
            </FormControl>

            <FormControl fullWidth sx={{ mb: 2 }}>
                <FormLabel sx={{ color: 'black', fontWeight: 'bold', textAlign: 'left' }}>Confirmar nueva contraseña</FormLabel>
                <OutlinedInput
                    type={showPasswordConfirm ? 'text' : 'password'}
                    placeholder="Ingresa una nueva contraseña"
                    {...register('passwordConfirm')}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton onClick={handleClickShowPasswordConfirm} edge="end">
                                {showPasswordConfirm ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    }
                    sx={{
                        '& .MuiOutlinedInput-notchedOutline': { borderColor: 'gray', borderRadius: '8px' },
                    }}
                />
                {errors.passwordConfirm && <Typography color="error" sx={{ textAlign: 'left' }}>{errors.passwordConfirm.message}</Typography>}
            </FormControl>

            <Box display="flex" justifyContent="space-between" mt={3}>
            <Button variant="contained" className="h-e34 text-white rounded-[20px] normal-case"
                    sx={{ backgroundColor: themePalette.primary, width: '171px', height: '50px', fontSize: '18px' }}
                >
                    Cancelar
                </Button>
                <Button
                    variant="contained" className="h-e34 text-white rounded-[20px] normal-case"
                    sx={{ backgroundColor: themePalette.primary, width: '171px', height: '50px', fontSize: '18px' }}
                    onClick={handleSubmit(onSubmit)}
                >
                    Guardar
                </Button>
            </Box>
        </Box>
    );
};
