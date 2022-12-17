import { NextApiResponse } from 'next';
import { NextApiRequestExtend } from '../../main';
import { AuthService } from '../../modules/auth/authService';

type NextHandler = (err?: Error) => void;

export const AuthMiddleware = async (
  req: NextApiRequestExtend,
  res: NextApiResponse,
  next: NextHandler
) => {
  const { authorization } = req.headers;
  if (!authorization) {
    req.auth = null;
    next();
    return;
  }

  const result = await AuthService.verify(authorization);
  req.auth = result;
  next();
};
