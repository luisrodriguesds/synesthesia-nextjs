import { NextApiRequest, NextApiResponse } from 'next';
import { ZodError } from 'zod';

export default class ApiError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(message: string, statusCode: number, isOperational = true) {
    super(message);

    this.statusCode = statusCode;
    this.isOperational = isOperational;

    Error.captureStackTrace(this, this.constructor);

    Object.setPrototypeOf(this, ApiError.prototype);
  }

  static fromZodError(error: ZodError): ApiError {
    const issue = error.issues[0];
    const messageName = `The field '${issue.path[0]}' say '${issue.message}'`;
    return new this(messageName, 400);
  }
}

export const handleApiError = (
  error: any,
  req: NextApiRequest,
  res: NextApiResponse
) => {
  console.error('handled API error: ', error);
  const isProd = process.env.NODE_ENV === 'production';

  const response = {
    ...(!isProd && { stack: error.stack }),
    message: error.message,
    statusCode: error.statusCode,
    isOperational: error.isOperational,
  };
  // if status > 399 => error
  res.status(error.statusCode || 500).json(response);
};
