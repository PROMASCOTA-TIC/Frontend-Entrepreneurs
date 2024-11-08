import { z } from 'zod';

export const registroEmprendimiento = z.object({
    name: z.string()
        .min(3, { message: 'Ingresa el nombre del emprendimiento' })
        .max(200, { message: 'Nombre demasiado largo' })
        .regex(/^[A-Za-z\s]+$/, { message: 'El nombre solo debe contener letras' }),
    
    ruc: z.string()
        .length(13, { message: 'El RUC o RIMPE debe tener exactamente 13 dígitos' })
        .regex(/^[0-9]+$/, { message: 'El RUC o RIMPE solo debe contener números' }),
    
    phoneNumber: z.string()
        .length(10, { message: 'El número celular debe tener exactamente 10 dígitos' })
        .regex(/^[0-9]+$/, { message: 'El número celular solo debe contener números' }),

    businessType: z.string()
        .nonempty({ message: 'Selecciona lo que vende tu emprendimiento' }),
    
    bankName: z.string()
        .nonempty({ message: 'Selecciona un banco' }),

    accountType: z.string()
        .nonempty({ message: 'Selecciona un tipo de cuenta' }),

    accountNumber: z.string()
        .min(10, { message: 'El número de cuenta debe tener al menos 10 dígitos' })
        .max(15, { message: 'El número de cuenta no puede exceder los 15 dígitos' })
        .regex(/^[0-9]+$/, { message: 'El número de cuenta solo debe contener números' }),

    accountHolderName: z.string()
        .min(8, { message: 'Ingresa tu nombre y apellido' })
        .max(200, { message: 'Tu nombre es muy largo' })
        .regex(/^[A-Za-z\s]+$/, { message: 'El nombre del propietario solo debe contener letras' }),
});
