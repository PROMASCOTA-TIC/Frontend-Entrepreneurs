import { z } from 'zod';

export const registerSchema = z.object({
    name: z
        .string()
        .min(8, { message: 'Ingresa tu nombre y apellido', })
        .max(200, { message: 'Tu nombre es muy largo', }),
    email: z
        .string()
        .email({ message: 'Ingresa un correo válido', }),
    emailConfirm: z
        .string()
        .email({ message: 'Ingresa un correo válido', }),
    password: z
        .string()
        .min(8, { message: 'La contraseña debe tener al menos 8 caracteres', })
        .regex(/[a-z]/, { message: "La contraseña debe contener al menos una letra minúscula" })
        .regex(/[A-Z]/, { message: "La contraseña debe contener al menos una letra mayúscula" })
        .regex(/[0-9]/, { message: "La contraseña debe contener al menos un número" })
        .regex(/[^a-zA-Z0-9]/, { message: "La contraseña debe contener al menos un carácter especial" }),
    passwordConfirm: z.string().min(8, { message: 'La contraseña debe tener al menos 8 caracteres', }),
}).refine(data => data.password === data.passwordConfirm, {
    message: 'Las contraseñas no coinciden',
    path: ['passwordConfirm'],
}).refine(data => data.email === data.emailConfirm, {
    message: 'Los correos electrónicos no coinciden',
    path: ['emailConfirm'],
});
