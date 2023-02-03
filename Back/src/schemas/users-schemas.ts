import { CreateUserParams, SignInParams, SignOutParams } from "@/services/users-service";
import { users, addresses } from "@prisma/client";
import Joi from "joi";

export const createUserSchema = Joi.object<CreateUserParams>({
  name: Joi.string().max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

export const signInSchema = Joi.object<SignInParams>({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

export const signOutSchema = Joi.object<SignOutParams>({
  userId: Joi.number().required()
});

export const updateUserSchema = Joi.object<users>({
  id: Joi.number().required(),
  name: Joi.string(),
  surname: Joi.string(),
  photoUrl: Joi.string(),
  birthday: Joi.string(),
  email: Joi.string(),
  password: Joi.string(),
  typeId: Joi.number(),
  statusId: Joi.number()
});

export const upsertAddressSchema = Joi.object<addresses>({
  id: Joi.number(),
  userId: Joi.number().required(),
  name: Joi.string(),
  country: Joi.string(),
  state: Joi.string(),
  city: Joi.string(),
  district: Joi.string(),
  street: Joi.string(),
  number: Joi.string(),
  complement: Joi.string()
});