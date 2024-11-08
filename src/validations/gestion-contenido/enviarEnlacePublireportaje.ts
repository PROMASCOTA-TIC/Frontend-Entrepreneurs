import { z } from 'zod';

export const enviarEnlacePublireportaje = z.object({
    categoria: z
        .string()
        .min(1, { message: 'La categoría es obligatoria', }),
    subcategoria: z
        .string()
        .min(1, { message: 'La subcategoría es obligatoria', }),
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