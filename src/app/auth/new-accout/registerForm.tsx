import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Box, Button, FormControl, FormControlLabel, FormLabel, TextField, Checkbox } from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from '@/validations/registerSchema';
import '@/app/auth/new-accout/Login.css';
import "./Login.css";
import { themePalette } from '@/config/theme.config';
import { useRouter } from 'next/navigation';

type Inputs = {
    name: string;
    email: string;
    emailConfirm: string;
    password: string;
    passwordConfirm: string;
};

type RegisterFormProps = {
    nextStep: () => void;
};

export const RegisterForm: React.FC<RegisterFormProps> = ({ nextStep }) => {
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>({
        resolver: zodResolver(registerSchema),
        mode: 'onChange',
    });
    const router = useRouter(); 

    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
    const [acceptTerms, setAcceptTerms] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowPasswordConfirm = () => setShowPasswordConfirm((show) => !show);

    const onSubmit = (data: Inputs) => {
        if (acceptTerms) {
            console.log(data);
            nextStep();
        } else {
            alert('Debe aceptar los términos y condiciones para continuar.');
        }
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

            {/* Checkbox para aceptar términos y condiciones */}
            <FormControlLabel
                control={
                    <Checkbox
                        checked={acceptTerms}
                        onChange={(e) => setAcceptTerms(e.target.checked)}
                        color="primary"
                    />
                }
                label="Acepto los términos y condiciones"
                sx={{ color: 'black', margin: '10px 0' }}
            />

            <Box style={{ margin: '20px 0' }} className="button-is space-x-4">
                <Button variant="contained" className="h-e34 text-white rounded-[20px] normal-case"
                    sx={{ backgroundColor: themePalette.primary, width: '171px', height: '50px', fontSize: '18px' }}
                    onClick={() => router.push('/auth/login')} 
                >
                    Regresar
                </Button>
                <Button 
                    variant="contained" 
                    type="submit" 
                    disabled={!acceptTerms}  
                    className="h-e34 text-white rounded-[20px] normal-case"
                    sx={{ backgroundColor: acceptTerms ? themePalette.primary : 'gray', width: '171px', height: '50px', fontSize: '18px' }}
                >
                    Siguiente
                </Button>
            </Box>
        </FormControl>
    );
};
