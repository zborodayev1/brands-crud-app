export const sanitizeUser = (user) => {
  const { passwordHash, _id, __v, createdAt, updatedAt, ...sanitizedUser } =
    user._doc || user;
  return sanitizedUser;
};
