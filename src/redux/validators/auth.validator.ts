import { z } from 'zod';

export const userSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string(),
});

export const signUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  fullName: z.string().min(1),
});

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const signInResponseSchema = z.object({
  user: userSchema,
  token: z.string(),
});

export const signUpResponseSchema = z.object({
  user: userSchema,
  token: z.string(),
});
