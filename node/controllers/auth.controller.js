import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as env from '../config/env.js';
import { hashPasswordInWorker } from '../lib/hashPasswordInWorker.js';
import { UserModel } from '../models/user.model.js';
import { sanitizeUser } from '../utils/sanitizeUser.js';
import { signInSchema, signUpSchema } from '../validators/auth.validator.js';

export const signUp = async (req, res) => {
  const validateData = signUpSchema.safeParse(req.body);

  if (!validateData.success) {
    return res.status(400).json({ errors: validateData.error.errors });
  }

  const { fullName, email, password } = validateData.data;

  try {
    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const hash = await hashPasswordInWorker(password);
    if (!hash) {
      return res.status(500).json({ error: 'Failed to hash password' });
    }

    const user = new UserModel({
      fullName: fullName,
      email: email,
      passwordHash: hash,
    });

    await user.save();

    const sanitizedUser = sanitizeUser(user);

    const token = jwt.sign({ _id: user._id }, env.JWT_SECRET, {
      expiresIn: '14d',
    });

    res.cookie('token', token, {
      httpOnly: true,
      secure: env.NODE_ENV === 'production',
      sameSite: 'Lax',
      maxAge: 14 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      user: sanitizedUser,
      message: 'Registration completed successfully!',
    });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const signIn = async (req, res) => {
  const validateData = signInSchema.safeParse(req.body);

  if (!validateData.success) {
    return res.status(400).json({ errors: validateData.error.errors });
  }

  const { email, password } = validateData.data;

  try {
    const existingUser = await UserModel.findOne({ email });

    if (!existingUser) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, existingUser.passwordHash);

    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const sanitizedUser = sanitizeUser(existingUser);

    const token = jwt.sign({ _id: existingUser._id }, env.JWT_SECRET, {
      expiresIn: '14d',
    });

    res.clearCookie('token');

    res.cookie('token', token, {
      httpOnly: true,
      secure: env.NODE_ENV === 'production',
      sameSite: 'Lax',
      maxAge: 14 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      user: sanitizedUser,
      message: 'Login successful!',
    });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const signOut = (req, res) => {
  res.clearCookie('token');
  res.status(200).json({ message: 'Logout successful!' });
};
