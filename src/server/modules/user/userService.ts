import ApiError from '../../common/errors/apiError';
import { hash } from 'bcryptjs';
import { exclude } from '../../common/utils/exclude';
import { prisma } from '../../db';
import { ICreateUser } from './interfaces/ICreateUser';
import { createUserValidation } from './validations/createUserValidation';

async function createUser(data: ICreateUser) {
  const { name, email, password: _password } = data;

  const validation = createUserValidation.safeParse({
    email,
    name,
    password: _password,
  });

  if (!validation.success) {
    throw ApiError.fromZodError(validation.error);
  }

  const checkUserByEmail = await getUserByEmail(email);

  if (checkUserByEmail) {
    throw new ApiError(`User with the email '${email}' already exist.`, 409);
  }

  const password = await hash(_password, 10);
  const user = await prisma.user.create({
    data: {
      email,
      name,
      password,
    },
  });

  return exclude(user, 'password');
}

async function getUserById(id: string) {
  const user = await prisma.user.findFirst({
    where: {
      id,
    },
  });

  return user;
}

async function getUserByEmail(email: string) {
  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  return user;
}

export const UserService = {
  createUser,
  getUserById,
  getUserByEmail,
};

// const randomName = Array(4)
// .fill(null)
// .map(() => Math.round(Math.random() * 16).toString(16))
// .join('');
