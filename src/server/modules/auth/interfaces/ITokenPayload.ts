import { IUser } from '../../user/interfaces/IUser';

export interface ITokenPayload {
  user: IUser;
  iat: number;
}
