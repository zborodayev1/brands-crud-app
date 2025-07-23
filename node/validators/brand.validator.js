import { z } from 'zod';

export const createBrandSchema = z.object({
  name: z.string().min(1, 'Brand name is required'),
  description: z.string().optional(),
  logoUrl: z.string().url('Invalid URL format').optional(),
});

export const updateBrandSchema = z
  .object({
    name: z.string().min(1, 'Brand name is required').optional(),
    description: z.string().optional(),
    logoUrl: z.string().url('Invalid URL format').optional(),
  })
  .partial();

export const brandIdSchema = z.object({
  id: z.string().regex(/^[0-9a-fA-F]{24}/, 'Invalid brand ID format'),
});

export const brandQuerySchema = z
  .object({
    page: z.number().int().min(1).default(1),
    limit: z.number().int().min(1).max(100).default(10),
    sortBy: z.enum(['name', 'createdAt', 'updatedAt']).default('createdAt'),
    sortOrder: z.enum(['asc', 'desc']).default('desc'),
    search: z.string().optional(),
  })
  .partial();
