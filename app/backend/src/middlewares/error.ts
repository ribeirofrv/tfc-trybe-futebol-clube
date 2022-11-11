import { ErrorRequestHandler } from 'express';
import { JsonWebTokenError } from 'jsonwebtoken';

const ErrorMiddleware: ErrorRequestHandler = (error, _request, response, _next) => {
  const { status, message } = error;
  console.log(':: ', error);
  if (message) {
    return response.status(status).json({ message });
  }

  if (error instanceof JsonWebTokenError) {
    return response.status(401).json({ message: 'Invalid token' });
  }

  return response.status(500).json({ message: 'Something went wrong!' });
};

export default ErrorMiddleware;
