import userRepository from "@/repositories/user-repository";
import { addresses, sessions, users } from "@prisma/client";
import bcrypt from "bcrypt";
import { duplicatedEmailError, invalidCredentialsError } from "./errors";
import sessionRepository from "@/repositories/session-repository";
import { exclude } from "@/utils/prisma-utils";
import jwt from "jsonwebtoken";

export async function createUser({ name, email, password }: CreateUserParams): Promise<users> {

  await validateUniqueEmailOrFail(email);

  const hashedPassword = await bcrypt.hash(password, 12);
  return userRepository.create({
    name,
    email,
    password: hashedPassword,
  });
}

async function validateUniqueEmailOrFail(email: string) {
  const userWithSameEmail = await userRepository.findByEmail(email);
  if (userWithSameEmail) {
    throw duplicatedEmailError();
  }
}

async function signIn(params: SignInParams): Promise<SignInResult> {
  const { email, password } = params;

  const user = await getUserOrFail(email);

  await validatePasswordOrFail(password, user.password);

  await sessionRepository.signOutSession(user.id);

  const token = await createSession(user.id);

  await updateUserStatus(user.id);

  return {
    user: exclude(user, "password"),
    token,
  };
}

async function updateUserStatus(userId: number){

  const activeSession = await sessionRepository.findLast(userId);

  if (!activeSession) throw invalidCredentialsError;

  if (activeSession.isActive){
    await userRepository.updateUserStatus(userId, 1);
  } else {
    await userRepository.updateUserStatus(userId, 3);
  }
}

async function getUserOrFail(email: string): Promise<GetUserOrFailResult> {
  const user = await userRepository.findByEmail(email, { id: true, email: true, password: true });
  if (!user) throw invalidCredentialsError();

  return user;
}

async function validatePasswordOrFail(password: string, userPassword: string) {
  const isPasswordValid = await bcrypt.compare(password, userPassword);
  if (!isPasswordValid) throw invalidCredentialsError();
}

async function createSession(userId: number) {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET);
  await sessionRepository.create({
    token,
    userId,
  });

  return token;
}

async function signOut(userId: number) {
  await sessionRepository.signOutSession(userId);

  return;
}

async function getUserInfo(userId: number) {
  const user = await userRepository.getUserInfo(userId);

  return user;
}

async function getUserTypes() {
  const userTypes = await userRepository.getUserTypes();

  return userTypes;
}

async function getUserStatus() {
  const userStatus = await userRepository.getUserStatus();

  return userStatus;
}

async function getUserAddress(userId: number) {
  const userAddress = await userRepository.getUserAddress(userId);

  return userAddress;
}

async function updateUser(body: users) {
  const userAddress = await userRepository.updateUser(body);

  return userAddress;
}

async function upsertAddress(body: addresses) {
  const userAddress = await userRepository.upsertAddress(body);

  return userAddress;
}

export type CreateUserParams = Pick<users, "email" | "password" | "name">;

export type SignInParams = Pick<users, "email" | "password">;

export type SignOutParams = Pick<sessions, "userId">;

type SignInResult = {
  user: Pick<users, "id" | "email">;
  token: string;
};

type GetUserOrFailResult = Pick<users, "id" | "email" | "password">;

const userService = {
  createUser,
  signIn, 
  signOut,
  getUserInfo,
  getUserTypes,
  getUserStatus,
  getUserAddress,
  updateUser, 
  upsertAddress
};

export * from "./errors";
export default userService;
