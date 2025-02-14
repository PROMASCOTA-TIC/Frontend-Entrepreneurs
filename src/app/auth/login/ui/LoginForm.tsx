'use client';

import { themePalette } from '@/config/theme.config';
import { loginSchema } from '@/validations/loginSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Box, Button, FormLabel, IconButton, InputAdornment, OutlinedInput, TextField, Typography } from '@mui/material';
import Link from 'next/link';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { URL_BASE } from '@/config/config';
import axios from 'axios';
import Notification from '@/components/ui/notification-lg/Notification';

type Inputs = {
    email: string;
    password: string;
}

export const LoginForm = () => {
    const [notification, setNotification] = useState<{
        open: boolean;
        message: string;
        type: 'success' | 'error' | 'info' | 'warning';
    }>({ open: false, message: '', type: 'info' });

    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>({
        resolver: zodResolver(loginSchema),
        mode: 'onChange',
    });

    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    const handleClickShowPassword = () => setShowPassword(!showPassword);

    const onSubmit = async (data: Inputs) => {
        try {
            const response = await axios.post(`${URL_BASE}auth/login-entrepreneur`,
                data,
                {
                    headers: { 'Content-Type': 'application/json' }
                }
            );

            if (response.status === 200 || response.status === 201) {
                setNotification({
                    open: true,
                    message: 'Inicio de sesión exitoso',
                    type: 'success',
                });

                const expirationTime = new Date(new Date().getTime() + 3600 * 1000);
                document.cookie = `auth_cookie=${response.data.token}; expires=${expirationTime.toUTCString()}; path=/`;
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user_id', response.data.id);
                localStorage.setItem('entrepreneur_id', response.data.idEntrepreneur);
                router.push('/inicio');
            }
        } catch (error: any) {
            if (error.response) {
                const errorMessage = error.response.data.message;
                setNotification({
                    open: true,
                    message: errorMessage.includes("Estado de la cuenta") ? errorMessage : "Credenciales incorrectas",
                    type: error.response.status === 403 ? 'warning' : 'error',
                });
            } else {
                setNotification({
                    open: true,
                    message: 'Error al conectar con el servidor',
                    type: 'error',
                });
            }
        }
    };

    return (
        <>
            <Typography
                sx={{
                    textAlign: 'center',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    marginBottom: '15px',
                    color: themePalette.primary,
                }}
            >
                ¿Eres nuevo?{' '}
                <Link href="/auth/new-accout"
                    style={{
                        color: themePalette.primary,
                        textDecoration: 'underline'
                    }}
                >
                    Crea una cuenta
                </Link>
            </Typography>

            <Box component="form" onSubmit={handleSubmit(onSubmit)}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    width: '100%',
                    marginBottom: '21px',
                }}
                noValidate
            >
                <Notification
                    open={notification.open}
                    onClose={() => setNotification({ ...notification, open: false })}
                    message={notification.message}
                    type={notification.type}
                />

                <Box sx={{ display: "flex", flexDirection: "column", mb: 2, width: "100%" }}>
                    <FormLabel htmlFor="email" sx={{ color: "black", mb: 1, fontWeight: "bold", textAlign: "left" }}>
                        Correo electrónico
                    </FormLabel>
                    <TextField
                        id="email"
                        error={!!errors.email}
                        placeholder="Ingrese su correo electrónico"
                        {...register('email')}
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                "& fieldset": { borderColor: "gray", borderRadius: "10px" },
                                "&:hover fieldset": { borderColor: themePalette.secondary },
                                "&.Mui-focused fieldset": { borderColor: themePalette.secondary },
                            },
                            backgroundColor: "white",
                            borderRadius: "10px",
                        }}
                    />
                    {errors.email && (
                        <Typography sx={{ color: "red", fontSize: "14px", textAlign: "left", mt: 1 }}>
                            {errors.email.message}
                        </Typography>
                    )}
                </Box>

                <Box sx={{ display: "flex", flexDirection: "column", mb: 2, width: "100%" }}>
                    <FormLabel htmlFor="password" sx={{ color: "black", mb: 1, fontWeight: "bold", textAlign: "left" }}>
                        Contraseña
                    </FormLabel>
                    <OutlinedInput
                        id="password"
                        error={!!errors.password}
                        type={showPassword ? "text" : "password"}
                        {...register("password")}
                        placeholder="Ingrese su contraseña"
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton onClick={handleClickShowPassword}>
                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        }
                        sx={{
                            "& .MuiOutlinedInput-notchedOutline": { borderColor: "gray", borderRadius: "10px" },
                            "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: themePalette.secondary },
                            "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: themePalette.secondary },
                            backgroundColor: "white",
                            borderRadius: "10px",
                        }}
                    />
                    {errors.password && (
                        <Typography sx={{ color: "red", fontSize: "14px", textAlign: "left", mt: 1 }}>
                            {errors.password.message}
                        </Typography>
                    )}
                </Box>

                <Link href="/auth/recuperar"
                    style={{
                        color: themePalette.secondary,
                        textDecoration: 'underline',
                        fontSize: '14px',
                        textAlign: 'right',
                        marginTop: '5px',
                        marginBottom: '10px',
                    }}
                >
                    Recuperar contraseña
                </Link>

                <Box sx={{ margin: '10px 0', textAlign: "center" }}>
                    <Button
                        variant="contained"
                        type="submit"
                        sx={{
                            backgroundColor: themePalette.primary,
                            color: themePalette.cwhite,
                            borderRadius: '20px',
                            padding: '5px 0',
                            fontSize: '18px',
                            fontWeight: 'bold',
                            textTransform: 'none',
                            width: { xs: '40%', md: '50%' },
                        }}
                    >
                        Iniciar Sesión
                    </Button>
                </Box>
            </Box>
        </>
    )
}
