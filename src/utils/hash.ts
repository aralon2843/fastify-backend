import crypto from 'node:crypto';

export const hashPassword = (password: string) => {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return { hash, salt };
};

export const verifyPassword = (candidate: string, salt: string, hash: string) => {
  const candidateHash = crypto.pbkdf2Sync(candidate, salt, 1000, 64, 'sha512').toString('hex');
  return candidateHash === hash;
};