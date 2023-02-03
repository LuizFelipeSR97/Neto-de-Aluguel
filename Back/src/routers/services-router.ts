import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getServicesByUserId, getAllServicesByUserId, getAllOpenServices, getServiceById } from "@/controllers";

const servicesRouter = Router();

servicesRouter
    //.all("/*", authenticateToken)
    .get("/open", getAllOpenServices)
    .get("/:id", getServicesByUserId)
    .get("/:id/info", getServiceById)
    .get("/:id/all", getAllServicesByUserId)

export { servicesRouter };
