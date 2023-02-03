import { prisma } from "@/config";

async function findAllServices(userId: number) {
  return prisma.services.findMany({
    where: {
      OR: [
        {helperId: userId},
        {requesterId: userId}
      ]
    }
  });
}

async function findHelperServices(userId: number) {
  return prisma.services.findMany({
    where: {
      helperId: userId,
      NOT: {
        requesterId: userId
      }
    }
  });
}

async function findRequesterServices(userId: number) {
  return prisma.services.findMany({
    where: {
      requesterId: userId
    }
  });
}

async function findAllOpenServices() {
  return prisma.services.findMany({
    where: {
      statusId: 1
    },
    orderBy: {updatedAt: 'desc'},
    include: {
      helperUser: true,
      requesterUser: true
    }
  });
}

async function findServiceInfo(id: number) {
  return prisma.services.findFirst({
    where: {
      id
    },
    include: {
      requesterUser: true
    }
  });
}

const servicesRepository = {
  findAllServices,
  findHelperServices,
  findRequesterServices,
  findAllOpenServices,
  findServiceInfo
};

export default servicesRepository;
