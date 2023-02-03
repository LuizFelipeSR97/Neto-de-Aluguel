import servicesService from "@/services/services-service";
import { Request, Response } from "express";
import httpStatus from "http-status";

export async function getServicesByUserId(req: Request, res: Response) {
  const {id} = req.params;
  const userId = Number(id);
  try {
    const result = await servicesService.getServicesByUserId(userId);
    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
};

export async function getAllServicesByUserId(req: Request, res: Response) {
  const {id} = req.params;
  const userId = Number(id);
  console.log('teste')
  try {
    const result = await servicesService.getAllServicesByUserId(userId);
    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
};

export async function getAllOpenServices(req: Request, res: Response) {
  try {
    const result = await servicesService.getAllOpenServices();
    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
};

export async function getServiceById(req: Request, res: Response) {
  const {id} = req.params;
  const serviceId = Number(id);
  try {
    const result = await servicesService.getServiceById(serviceId);
    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
};
