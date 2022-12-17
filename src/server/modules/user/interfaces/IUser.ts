export interface IUser {
  id: string;
  name: string;
  email: string;
  role: 'guest' | 'admin';
  createdAt: Date;
  updatedAt: Date;
  password: string;
}
