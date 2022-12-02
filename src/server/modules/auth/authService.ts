import { compare } from 'bcryptjs';
import ApiError from '../../common/errors/apiError';
import { UserService } from '../user/userService';
import { ILoginUser } from './interfaces/ILoginUser';
import { loginUserValidation } from './validations/loginUserValidation';
import { sign, verify as jwtVerify } from 'jsonwebtoken';
import { exclude } from '../../common/utils/exclude';
import { ITokenPayload } from './interfaces/ITokenPayload';

async function loginUser({ email, password }: ILoginUser) {
  const validation = loginUserValidation.safeParse({
    email,
    password,
  });

  if (!validation.success) {
    throw ApiError.fromZodError(validation.error);
  }

  const user = await UserService.getUserByEmail(email);

  if (!user) {
    throw new ApiError(`User not found.`, 400);
  }

  const passwordIsValid = await compare(password, user.password);
  if (!passwordIsValid) {
    throw new ApiError(`Credentials not valid`, 400);
  }
  const _user = exclude(user, 'password');
  const token = sign(
    {
      user: _user,
    },
    `${process.env.KEY_PRIVATE_SECRET}`
  );

  return {
    user: _user,
    token,
  };
}

async function verify(authorization: string) {
  const token = authorization.split(' ')[1];
  const payload: ITokenPayload = await new Promise((resolve) => {
    jwtVerify(token, `${process.env.KEY_PRIVATE_SECRET}`, (error, decoded) => {
      if (error) {
        throw new ApiError(`Invalid access token`, 400);
      }
      resolve(decoded as ITokenPayload);
    });
  });
  return payload.user;
}

export const AuthService = {
  loginUser,
  verify,
};
