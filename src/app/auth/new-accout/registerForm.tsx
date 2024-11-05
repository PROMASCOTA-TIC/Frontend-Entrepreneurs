"use client";
import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Box, Button, FormControl, FormLabel, TextField } from '@mui/material';
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

type RegisterFormProps = {
    nextStep: () => void;  // Nueva prop para avanzar al siguiente paso
};

export const RegisterForm: React.FC<RegisterFormProps> = ({ nextStep }) => {
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>({
        resolver: zodResolver(registerSchema),
        mode: 'onChange',
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowPasswordConfirm = () => setShowPasswordConfirm((show) => !show);

    // Avanza solo si las validaciones son exitosas
    const onSubmit = (data: Inputs) => {
        console.log(data);
        nextStep();  // Avanza al siguiente paso después de una validación exitosa
    };

    return (
        <FormControl className="form-group" component="form" onSubmit={handleSubmit(onSubmit)}>
            <FormLabel htmlFor="name" sx={{ color: 'black' }}>Nombre</FormLabel>
            <TextField
                id="name"
                error={!!errors.name}
                placeholder="Ingrese su nombre"
                {...register('name')}
                sx={{
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: 'gray',
                        },
                        '&:hover fieldset': {
                            borderColor: 'blue',
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: 'blue',
                        },
                    },
                }}
            />
            {errors.name && <p className="text-red-500" style={{ textAlign: 'left' }}>{errors.name.message}</p>}

            <FormLabel htmlFor="email" sx={{ color: 'black' }}>Correo electrónico</FormLabel>
            <TextField
                id="email"
                error={!!errors.email}
                placeholder="Ingrese su correo electrónico"
                {...register('email')}
                sx={{
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: 'gray',
                        },
                        '&:hover fieldset': {
                            borderColor: 'blue',
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: 'blue',
                        },
                    },
                }}
            />
            {errors.email && <p className="text-red-500" style={{ textAlign: 'left' }}>{errors.email.message}</p>}

            <FormLabel htmlFor="emailConfirm" sx={{ color: 'black' }}>Confirmar correo electrónico</FormLabel>
            <TextField
                id="emailConfirm"
                error={!!errors.emailConfirm}
                placeholder="Confirme su correo electrónico"
                {...register('emailConfirm')}
                sx={{
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: 'gray',
                        },
                        '&:hover fieldset': {
                            borderColor: 'blue',
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: 'blue',
                        },
                    },
                }}
            />
            {errors.emailConfirm && <p className="text-red-500" style={{ textAlign: 'left' }}>{errors.emailConfirm.message}</p>}

            <FormLabel htmlFor="password" sx={{ color: 'black' }}>Contraseña</FormLabel>
            <OutlinedInput
                id="password"
                placeholder="Ingrese una contraseña minimo 8 caracteres"
                error={!!errors.password}
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            onClick={handleClickShowPassword}
                            edge="end"
                        >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                }
                {...register('password')}
                sx={{
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'gray',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'blue',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'blue',
                    },
                }}
            />
            {errors.password && <p className="text-red-500" style={{ textAlign: 'left' }}>{errors.password.message}</p>}

            <FormLabel htmlFor="passwordConfirm" sx={{ color: 'black' }}>Confirmar contraseña</FormLabel>
            <OutlinedInput
                id="passwordConfirm"
                error={!!errors.passwordConfirm}
                placeholder="Ingrese una contraseña minimo 8 caracteres"
                type={showPasswordConfirm ? 'text' : 'password'}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            onClick={handleClickShowPasswordConfirm}
                            edge="end"
                        >
                            {showPasswordConfirm ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                }
                {...register('passwordConfirm')}
                sx={{
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'gray',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'blue',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'blue',
                    },
                }}
            />
            {errors.passwordConfirm && <p className="text-red-500" style={{ textAlign: 'left' }}>{errors.passwordConfirm.message}</p>}

            <Box style={{ margin: '20px 0' }} className="button-is space-x-4">
                <Button variant="contained" className="h-e34 text-white rounded-[20px] normal-case"
                    sx={{ backgroundColor: themePalette.primary, width: '171px', height: '50px', fontSize: '18px' }}
                >
                    Regresar                </Button>
                <Button variant="contained" type="submit" className="h-e34 text-white rounded-[20px] normal-case"
                    sx={{ backgroundColor: themePalette.primary, width: '171px', height: '50px', fontSize: '18px' }}
                >
                    Siguiente
                </Button>
            </Box>
        </FormControl>
    );
};
