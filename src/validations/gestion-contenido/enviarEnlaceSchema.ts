import { z } from 'zod';

export const enviarEnlaceSchema = z.object({
    ownerName: z
        .string()
        .min(1, { message: 'El nombre es obligatorio', }),
    ownerEmail: z
        .string()
        .min(1, { message: 'El email es obligatorio', }),
    category: z
        .string()
        .min(1, { message: 'La categoría es obligatorio', }),
    title: z
        .string()
        .min(1, { message: 'El título es obligatorio', }),
    description: z
        .string()
        .min(1, { message: 'La descripción es obligatoria', }),
    sourceLink: z
        .string()
        .min(1, { message: 'La fuente es obligatoria', }),
})