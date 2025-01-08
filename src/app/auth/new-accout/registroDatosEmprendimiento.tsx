"use client";
import React from 'react';
import { Box, Button, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, TextField, MenuItem } from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registroEmprendimiento } from '@/validations/registroEmprendimiento';
import { themePalette } from '@/config/theme.config';

type Inputs = {
    name: string;
    ruc: string;
    phoneNumber: string;
    businessType: string;
    bankName: string;
    accountType: string;
    accountNumber: string;
    accountHolderName: string;
};

type BusinessDataFormProps = {
    nextStep: () => void;
    prevStep: () => void;
};

export const BusinessDataForm: React.FC<BusinessDataFormProps> = ({ nextStep, prevStep }) => {
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>({
        resolver: zodResolver(registroEmprendimiento),
        mode: 'onChange',
    });

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
                placeholder="Ingrese el nombre del emprendimiento"
                {...register('name')}
                onInput={(e) => {
                    const input = e.target as HTMLInputElement;
                    input.value = input.value.replace(/[^A-Za-z\s]/g, '');
                }}
                sx={{
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': { borderColor: 'gray' },
                        '&:hover fieldset': { borderColor: 'blue' },
                        '&.Mui-focused fieldset': { borderColor: 'blue' },
                    },
                }}
            />
            {errors.name && <p className="text-red-500" style={{ textAlign: 'left' }}>{errors.name.message}</p>}

            <FormLabel htmlFor="ruc" sx={{ color: 'black' }}>RUC/RIMPE</FormLabel>
            <TextField
                id="ruc"
                error={!!errors.ruc}
                placeholder="Ingrese el RUC o RIMPE"
                {...register('ruc')}
                onInput={(e) => {
                    const input = e.target as HTMLInputElement;
                    input.value = input.value.replace(/[^0-9]/g, '');
                }}
                sx={{
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': { borderColor: 'gray' },
                        '&:hover fieldset': { borderColor: 'blue' },
                        '&.Mui-focused fieldset': { borderColor: 'blue' },
                    },
                }}
            />
            {errors.ruc && <p className="text-red-500" style={{ textAlign: 'left' }}>{errors.ruc.message}</p>}

            <FormLabel htmlFor="phoneNumber" sx={{ color: 'black' }}>Número celular</FormLabel>
            <TextField
                id="phoneNumber"
                error={!!errors.phoneNumber}
                placeholder="Ingrese el número celular"
                {...register('phoneNumber')}
                onInput={(e) => {
                    const input = e.target as HTMLInputElement;
                    input.value = input.value.replace(/[^0-9]/g, '');
                }}
                sx={{
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': { borderColor: 'gray' },
                        '&:hover fieldset': { borderColor: 'blue' },
                        '&.Mui-focused fieldset': { borderColor: 'blue' },
                    },
                }}
            />
            {errors.phoneNumber && <p className="text-red-500" style={{ textAlign: 'left' }}>{errors.phoneNumber.message}</p>}


            <FormLabel htmlFor="bankName" sx={{ color: 'black' }}>Nombre del banco</FormLabel>
            <TextField
    id="bankName"
    select
    error={!!errors.bankName}
    {...register('bankName')}
    defaultValue=""
    sx={{
        '& .MuiOutlinedInput-root': {
            '& fieldset': { borderColor: 'gray' },
            '&:hover fieldset': { borderColor: 'blue' },
            '&.Mui-focused fieldset': { borderColor: 'blue' },
        },
    }}
>
    <MenuItem value="" disabled>
        Seleccione el banco
    </MenuItem>
    {[
        "Banco Pichincha", "Banco Guayaquil", "Produbanco", "Banco del Pacífico",
        "Banco Internacional", "Banco Bolivariano", "Banco del Austro",
        "Cooperativa JEP", "Cooperativa Policia Nacional Limitada",
        "Cooperativa Alianza Del Valle", "Cooperativa 29 de Octubre"
    ].map((bank) => (
        <MenuItem key={bank} value={bank}>{bank}</MenuItem>
    ))}
</TextField>

            <FormLabel sx={{ color: 'black' }}>Tipo de cuenta</FormLabel>
            <RadioGroup sx={{justifyContent:'center'}} row aria-label="accountType" {...register('accountType')} defaultValue="">
                <FormControlLabel value="Ahorros" control={<Radio />} label="Ahorros" />
                <FormControlLabel value="Corriente" control={<Radio />} label="Corriente" />
            </RadioGroup>
            {errors.accountType && <p className="text-red-500" style={{ textAlign: 'left' }}>{errors.accountType.message}</p>}

            <FormLabel htmlFor="accountNumber" sx={{ color: 'black' }}>Número de cuenta</FormLabel>
            <TextField
                id="accountNumber"
                error={!!errors.accountNumber}
                placeholder="Ingrese el número de cuenta"
                {...register('accountNumber')}
                onInput={(e) => {
                    const input = e.target as HTMLInputElement;
                    input.value = input.value.replace(/[^0-9]/g, '');
                }}
                sx={{
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': { borderColor: 'gray' },
                        '&:hover fieldset': { borderColor: 'blue' },
                        '&.Mui-focused fieldset': { borderColor: 'blue' },
                    },
                }}
            />
            {errors.accountNumber && <p className="text-red-500" style={{ textAlign: 'left' }}>{errors.accountNumber.message}</p>}

            <FormLabel htmlFor="accountHolderName" sx={{ color: 'black' }}>Nombre del propietario de la cuenta</FormLabel>
            <TextField
                id="accountHolderName"
                error={!!errors.accountHolderName}
                placeholder="Ingrese el nombre del propietario"
                {...register('accountHolderName')}
                onInput={(e) => {
                    const input = e.target as HTMLInputElement;
                    input.value = input.value.replace(/[^A-Za-z\s]/g, '');
                }}
                sx={{
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': { borderColor: 'gray' },
                        '&:hover fieldset': { borderColor: 'blue' },
                        '&.Mui-focused fieldset': { borderColor: 'blue' },
                    },
                }}
            />
            {errors.accountHolderName && <p className="text-red-500" style={{ textAlign: 'left' }}>{errors.accountHolderName.message}</p>}

            <Box style={{ margin: '20px 0' }} className="button-is space-x-4">
                <Button
                    variant="contained"
                    onClick={prevStep}
                    className="h-e34 text-white rounded-[20px] normal-case"
                    sx={{ backgroundColor: themePalette.primary, width: '171px', height: '50px', fontSize: '18px' }}
                >
                    Regresar
                </Button>
                <Button
                    variant="contained"
                    type="submit"
                    className="h-e34 text-white rounded-[20px] normal-case"
                    sx={{ backgroundColor: themePalette.primary, width: '171px', height: '50px', fontSize: '18px' }}
                >
                    Siguiente
                </Button>
            </Box>
        </FormControl>
    );
};
