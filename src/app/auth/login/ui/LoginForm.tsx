'use client';

import { theme } from '@/app/config/theme.config';
import { loginSchema } from '@/validations/loginSchema';
import { themePalette } from '@/config/theme.config';
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


    const handleClickShowPassword: () => void = () => setShowPassword((show) => !show);

    const onSubmit = async (data: Inputs) => {
        try {
            const response = await axios.post(`${URL_BASE}auth/login-entrepreneur`,
                data,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
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
                router.push('/inicio');
            }
        } catch (error: any) {
            if (error.response) {
                const errorMessage = error.response.data.message;
    
                if (error.response.status === 403 && errorMessage.includes("Estado de la cuenta")) {
                    setNotification({
                        open: true,
                        message: errorMessage,
                        type: 'warning',
                    });
                } else if (error.response.status === 401) {
                    setNotification({
                        open: true,
                        message: 'Contraseña incorrecta',
                        type: 'error',
                    });
                } else {
                    setNotification({
                        open: true,
                        message: 'Credenciales incorrectas',
                        type: 'error',
                    });
                }
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
        <FormLabel htmlFor="email"
            sx={{
                color: themePalette.black,
                textAlign: 'left',
                fontSize: '18px',
                fontWeight: 'bold',
                marginBottom: '10px',
            }}
        >
            Correo electrónico
        </FormLabel>
        <TextField
            id="email"
            error={!!errors.email}
            placeholder="Ingrese su correo electrónico"
            {...register('email')}
        />
        {errors.email &&
            <Typography className="text-red-500 text-fs12"
                style={{ textAlign: 'left' }}>{errors.email.message}
            </Typography>
        }
        <FormLabel htmlFor="password"
            sx={{
                color: themePalette.black,
                textAlign: 'left',
                fontSize: '18px',
                fontWeight: 'bold',
                marginBottom: '10px',
                marginTop: '20px',
            }}
        >
            Contraseña
        </FormLabel>
        <OutlinedInput
            id="password"
            error={!!errors.password}
            type={showPassword ? 'text' : 'password'}
            {...register('password')}
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
            inputProps={{ placeholder: "Ingrese su contraseña" }}
        />
        {errors.password &&
            <Typography className="text-red-500 text-fs12"
                style={{ textAlign: 'left' }}>{errors.password.message}
            </Typography>
        }
        <Link href="/auth/forgot-password"
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
        <Box
            sx={{
                margin: '10px 0',
            }}
        >
            <Button
                variant="contained"
                type="submit"
                sx={
                    {
                        backgroundColor: theme.palette.primary.main,
                        color: themePalette.cwhite,
                        borderRadius: '20px',
                        padding: '5px 0',
                        fontSize: '18px',
                        fontWeight: 'bold',
                        textTransform: 'none',
                        width: { xs: '40%', md: '50%' },
                    }
                }
            >
                Iniciar Sesión
            </Button>
        </Box>
    </Box>
    </>
)

}