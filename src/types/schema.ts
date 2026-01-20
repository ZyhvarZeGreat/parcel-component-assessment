import { z } from 'zod';

export const parcelSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters').max(50, 'Name too long'),
    description: z.string().min(5, 'Description needs more detail').max(200, 'Description too long'),
    quantity: z.number().int().min(1, 'Quantity must be at least 1'),
    weight: z.number().min(0.1, 'Weight must be at least 0.1kg'),
});

export type ParcelFormData = z.infer<typeof parcelSchema>;
