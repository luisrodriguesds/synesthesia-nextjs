import { NextApiResponse } from 'next';
import { NextHandler } from 'next-connect';
import { NextApiRequestExtend } from '../../main';
import { AuthService } from '../../modules/auth/authService';

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
