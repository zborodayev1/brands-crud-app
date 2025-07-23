import z from 'zod';

export const createBrandSchema = z.object({
  name: z.string(),
  description: z.string(),
  logoUrl: z.string().url(),
});

export const updateBrandSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  logoUrl: z.string().url().optional(),
});

export const createBrandResponseSchema = z.object({
  brand: z.object({
    _id: z.string(),
    name: z.string(),
    description: z.string(),
    logoUrl: z.string().url(),
    createdAt: z.string(),
    updatedAt: z.string(),
    __v: z.number(),
  }),
  message: z.string().optional(),
});

export const updateBrandResponseSchema = z.object({
  brand: z.object({
    _id: z.string(),
    name: z.string(),
    description: z.string(),
    logoUrl: z.string().url(),
    createdAt: z.string(),
    updatedAt: z.string(),
    __v: z.number(),
  }),
  message: z.string().optional(),
});

export const getBrandsResponseSchema = z.object({
  data: z.array(
    z.object({
      _id: z.string(),
      name: z.string(),
      description: z.string(),
      logoUrl: z.string().url(),
      createdAt: z.string(),
      updatedAt: z.string(),
      __v: z.number(),
    }),
  ),
  pagination: z.object({
    total: z.number(),
    page: z.number(),
    limit: z.number(),
    totalPages: z.number(),
  }),
});

export const getOneBrandResponseSchema = z.object({
  brand: z.object({
    _id: z.string(),
    name: z.string(),
    description: z.string(),
    logoUrl: z.string().url(),
    createdAt: z.string(),
    updatedAt: z.string(),
    __v: z.number(),
  }),
});
