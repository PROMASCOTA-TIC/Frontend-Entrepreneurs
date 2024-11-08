import { z } from 'zod';

export const enviarEnlaceSchema = z.object({
    categoria: z
        .string()
        .min(1, { message: 'La categoría es obligatoria', }),
    titulo: z
        .string()
        .min(1, { message: 'El título es obligatorio', }),
    descripcion: z
        .string()
        .min(1, { message: 'La descripción es obligatoria', }),
    fuentes: z
        .string()
        .min(1, { message: 'La fuente es obligatoria', }),
})