import { NextApiResponse } from 'next';
import { NextApiRequestExtend } from '../../main';
import ApiError from '../errors/apiError';

type NextHandler = (err?: Error) => void;

export const ensureAuthMiddleware = async (
  req: NextApiRequestExtend,
  res: NextApiResponse,
  next: NextHandler
) => {
  if (req.auth) {
    next();
    return;
  }

  throw new ApiError('You are not authorized', 401);
};
