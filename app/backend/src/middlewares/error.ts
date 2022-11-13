import { ErrorRequestHandler } from 'express';
import { JsonWebTokenError } from 'jsonwebtoken';

const ErrorMiddleware: ErrorRequestHandler = (error, _request, response, _next) => {
  const { status, message } = error;
  // console.log(':: ', error);
  if (error instanceof JsonWebTokenError) {
    return response.status(401).json({ message: 'Token must be a valid token' });
  }

  return response.status(status || 500).json({ message });
};

export default ErrorMiddleware;
