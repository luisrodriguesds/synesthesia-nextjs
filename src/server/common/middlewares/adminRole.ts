import { NextApiResponse } from 'next';
import { NextApiRequestExtend } from '../../main';
import ApiError from '../errors/apiError';

type NextHandler = (err?: Error) => void;

export const adminRoleMiddleware = async (
  req: NextApiRequestExtend,
  res: NextApiResponse,
  next: NextHandler
) => {
  if (req.auth && req.auth.role === 'admin') {
    next();
    return;
  }

  throw new ApiError('You are not authorized', 401);
};
