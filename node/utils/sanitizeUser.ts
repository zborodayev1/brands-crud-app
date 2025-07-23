import { User } from '../models/user.model';

export const sanitizeUser = (user: User & { _doc?: any }) => {
  const { passwordHash, _id, __v, createdAt, updatedAt, ...sanitizedUser } = user._doc || user;
  return sanitizedUser;
};
