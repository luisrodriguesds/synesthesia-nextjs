import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import { handleApiError } from './common/errors/apiError';
import { AuthMiddleware } from './common/middlewares/auth';
import { IUser } from './modules/user/interfaces/IUser';

export interface NextApiRequestExtend extends NextApiRequest {
  auth: IUser | null;
}

export const optionsHandler = {
  onError: (error: Error, req: NextApiRequestExtend, res: NextApiResponse) => {
    handleApiError(error, req, res);
  },
  onNoMatch: (req: NextApiRequestExtend, res: NextApiResponse) => {
    res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  },
};

export const apiHandler = () => {
  return nextConnect<NextApiRequestExtend, NextApiResponse>(optionsHandler).use(
    AuthMiddleware
  );
};
