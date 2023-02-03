import { prisma } from "@/config";
import { Prisma } from "@prisma/client";

async function create(data: Prisma.sessionsUncheckedCreateInput) {
  return prisma.sessions.create({
    data,
  });
}

async function findLast(userId: number) {
  return prisma.sessions.findFirst({
    where: {
      userId
    },
    orderBy: {
      updatedAt: 'desc'
    }
  });
}

async function signOutSession(userId: number) {

  const user = await prisma.sessions.updateMany({
    where: {
      userId,
      isActive: true
    },
    data: {
      isActive: false
    },
  })
  return user;
}

const sessionRepository = {
  create,
  findLast,
  signOutSession
};

export default sessionRepository;
