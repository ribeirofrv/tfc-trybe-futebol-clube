/* istanbul ignore file */
import * as jwt from 'jsonwebtoken';
import UnauthorizedError from '../errors/UnauthorizedError';

export interface IPayload {
  id: number;
  username: string;
  email: string;
}

export const SECRET_KEY: jwt.Secret = 'jwt_secret';
export const CONFIG: jwt.SignOptions = {
  algorithm: 'HS256',
};

export const generateToken = (user: IPayload): string => {
  const { id, username, email } = user;
  const token = jwt.sign(
    { id, username, email },
    SECRET_KEY,
    CONFIG,
  );
  return token;
};

export const verifyToken = (token: string) => {
  const result = jwt.verify(token, SECRET_KEY);
  if (!result) throw new UnauthorizedError('Token must be a valid token');
  return result;
};
