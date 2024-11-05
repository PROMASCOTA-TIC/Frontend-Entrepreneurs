import { z } from 'zod';

export const registroEnvios = z.object({
    deliveryOptions: z.array(z.string()).min(1, "Debe seleccionar al menos una opción de entrega"), // Requerido
    mainStreet: z.string().min(1, "Calle principal es obligatoria"), // Requerido
    secondaryStreet: z.string().min(1, "Calle secundaria es obligatoria"), // Requerido
    addressNumber: z.string().min(1, "Numeración es obligatoria"), // Requerido
    reference: z.string().min(1, "Referencia es obligatoria"), // Requerido
    sector: z.string().min(1, "Sector es obligatorio") // Requerido
});
