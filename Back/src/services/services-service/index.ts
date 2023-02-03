import userRepository from "@/repositories/user-repository";
import servicesRepository from "@/repositories/services-repository";
import { services, users } from "@prisma/client";

export async function getServicesByUserId(userId: number) {

  const user = await userRepository.getUserInfo(userId);
  const services = {
    helper: await servicesRepository.findHelperServices(userId),
    requester: await servicesRepository.findRequesterServices(userId)
  }
  return services
}

async function getAllServicesByUserId(userId: number): Promise<services[]> {

  const result = await servicesRepository.findAllServices(userId);
  return result
}

async function getAllOpenServices(): Promise<services[]> {

  const result = await servicesRepository.findAllOpenServices();
  return result
}

async function getServiceById(id: number): Promise<services> {

  const result = await servicesRepository.findServiceInfo(id);
  return result
}

const servicesService = {
  getServicesByUserId,
  getAllServicesByUserId,
  getAllOpenServices,
  getServiceById
};

export * from "./errors";
export default servicesService;
