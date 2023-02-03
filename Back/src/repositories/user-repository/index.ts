import { prisma } from "@/config";
import { addresses, Prisma, users } from "@prisma/client";

async function findByEmail(email: string, select?: Prisma.usersSelect) {

  const user = await prisma.users.findFirst({
    where: {
      email,
    }
  })

  return user;
}

async function create(data: Prisma.usersCreateInput) {
  const {name, email, password} = data;
  const user = await prisma.users.create({
    data:{
      name,
      email,
      password
    }
  });
  console.log(user)
  return user
}

async function updateUserStatus(userId: number, statusId: number) {

  const user = await prisma.users.update({
    where: {
      id: userId,
    },
    data: {
      statusId,
    },
  })

  return user;
}

async function getUserInfo(userId: number) {
  const user = await prisma.users.findFirst({
    where: {
      id: userId
    },
    include: {
      userTypes: true,
      usersStatus: true
    }
  });
  return user
}

async function getUserTypes() {
  const userTypes = await prisma.userTypes.findMany();
  return userTypes
}

async function getUserStatus() {
  const userStatus = await prisma.usersStatus.findMany();
  return userStatus
}

async function getUserAddress(userId: number) {
  const userAddress = await prisma.addresses.findFirst({
    where: {
      userId: userId
    }
  });
  return userAddress
}

async function updateUser(body: users) {
  const {id, name, surname, photoUrl, birthday, email, password, typeId, statusId} = body;
  const userAddress = await prisma.users.update({
    where: {
      id
    },
    data: {
      name,
      surname,
      photoUrl,
      birthday,
      email,
      password,
      typeId,
      statusId      
    }
  });
  return userAddress
}

async function upsertAddress(body: addresses) {
  const { id, userId, name, country, state, city, district, street, number, complement } = body;
  const userAddress = await prisma.addresses.upsert({
    where: {
      id
    },
    create: {
      id,
      userId,
      name,
      country,
      state,
      city,
      district,
      street,
      number,
      complement
    },
    update: {
      id,
      userId,
      name,
      country,
      state,
      city,
      district,
      street,
      number,
      complement
    }
  });
  return userAddress
}

const userRepository = {
  findByEmail,
  create,
  updateUserStatus,
  getUserInfo,
  getUserStatus,
  getUserTypes,
  getUserAddress,
  updateUser,
  upsertAddress
};

export default userRepository;
