import { Request, Response, NextFunction } from 'express';
import UnauthorizedError from '../errors/UnauthorizedError';
import { verifyToken } from '../auth/jwt.auth';

export default async function authentication(
  request: Request,
  _response: Response,
  next: NextFunction,
) {
  const { authorization } = request.headers;

  if (!authorization) throw new UnauthorizedError('Token must be a valid token');

  verifyToken(authorization);

  next();
}
