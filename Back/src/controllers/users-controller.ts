import userService, { SignInParams, SignOutParams } from "@/services/users-service";
import { Request, Response } from "express";
import httpStatus from "http-status";

export async function signUp(req: Request, res: Response) {
  const { name, email, password } = req.body;

  try {
    const user = await userService.createUser({ name, email, password });
    return res.status(httpStatus.CREATED).json({
      id: user.id,
      email: user.email,
    });
  } catch (error) {
    if (error.name === "DuplicatedEmailError") {
      return res.status(httpStatus.CONFLICT).send(error);
    }
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
};

export async function signIn(req: Request, res: Response) {
  const { email, password } = req.body as SignInParams;

  try {
    const result = await userService.signIn({ email, password });
    res.locals.token = result.token;
    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    return res.status(httpStatus.UNAUTHORIZED).send({});
  }
};

export async function signOut(req: Request, res: Response) {
  const { userId } = req.body as SignOutParams;

  try {
    await userService.signOut( userId );

    return res.status(httpStatus.OK).send('Sessão finalizada com sucesso');
  } catch (error) {
    return res.status(httpStatus.UNAUTHORIZED).send({});
  }
}

export async function getUserInfo(req: Request, res: Response) {
 
  const {id} = req.params;
  const userId = Number(id);

  try {
    const user = await userService.getUserInfo(userId);
    return res.status(httpStatus.OK).send({
      user
    });
  } catch (error) {
    if (error.name === "DuplicatedEmailError") {
      return res.status(httpStatus.CONFLICT).send(error);
    }
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
};

export async function getUserTypesOptions(req: Request, res: Response) {

  try {
    const userTypes = await userService.getUserTypes();
    return res.status(httpStatus.OK).send({
      userTypes
    });
  } catch (error) {
    return res.status(httpStatus.NOT_FOUND).send(error);
  }
};

export async function getUserStatusOptions(req: Request, res: Response) {

  try {
    const userStatus = await userService.getUserStatus();
    return res.status(httpStatus.OK).send({
      userStatus
    });
  } catch (error) {
    return res.status(httpStatus.NOT_FOUND).send(error);
  }
};

export async function getUserAddressInfo(req: Request, res: Response) {
 
  const {userId} = req.params;
  const id = Number(userId);

  try {
    const userAddress = await userService.getUserAddress(id);
    return res.status(httpStatus.OK).send({
      userAddress
    });
  } catch (error) {
    return res.status(httpStatus.NOT_FOUND).send(error);
  }
};

export async function updateUser(req: Request, res: Response) {
 
  const body = req.body;

  try {
    const user = await userService.updateUser(body);
    return res.status(httpStatus.CREATED).send({
      user
    });
  } catch (error) {
    return res.status(httpStatus.NOT_FOUND).send(error);
  }
};

export async function upsertAddress(req: Request, res: Response) {
 
  const body = req.body;

  try {
    const address = await userService.upsertAddress(body);
    return res.status(httpStatus.CREATED).send({
      address
    });
  } catch (error) {
    return res.status(httpStatus.NOT_FOUND).send(error);
  }
};
