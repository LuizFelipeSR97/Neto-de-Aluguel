import { Router } from "express";
import { createUserSchema, signInSchema, signOutSchema, updateUserSchema, upsertAddressSchema } from "@/schemas";
import { authenticateToken, validateBody } from "@/middlewares";
import { signUp, signIn, signOut, getUserInfo, getUserTypesOptions, getUserStatusOptions, getUserAddressInfo, updateUser, upsertAddress } from "@/controllers";

const usersRouter = Router();

usersRouter
    .post("/sign-up", validateBody(createUserSchema), signUp)
    .post("/sign-in", validateBody(signInSchema), signIn)
    //.all("/*", authenticateToken)
    .post("/sign-out", validateBody(signOutSchema), signOut)
    .get("/types", getUserTypesOptions)
    .get("/status", getUserStatusOptions)
    .get("/:id", getUserInfo)
    .get("/address/:userId", getUserAddressInfo)
    .post("/update/", validateBody(updateUserSchema), updateUser)
    .post("/address/upsert", validateBody(upsertAddressSchema), upsertAddress)

export { usersRouter };
