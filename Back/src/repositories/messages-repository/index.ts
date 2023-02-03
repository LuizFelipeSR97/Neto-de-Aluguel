import { prisma } from "@/config";

async function findAllConversationsByUserId(userId: number) {

  const conversations = await prisma.conversations.findMany({
    where: {
      OR: [
        {helperId: userId},
        {requesterId: userId}
      ]      
    },
    include: {
      helper: true,
      requester: true
    }
  })

  return conversations;
}

async function findAllMessagesByUserId(userId: number) {

  const conversations = await prisma.messages.findMany({
    where: {
      OR: [
        {senderId: userId},
        {recipientId: userId}
      ]      
    },
    include: {
      recipientUser: true,
      senderUser: true
    }
  })

  return conversations;
}

async function findConversationById(conversationId: number) {

  const conversation = await prisma.conversations.findFirst({
    where: {
      id: conversationId
    },
    include: {
      messages: true
    }
  })

  return conversation;
}

async function findConversationByBothUsersId(senderId: number, recipientId: number) {

  const conversations = await prisma.conversations.findFirst({
    where: {
      OR: [
        {helperId: senderId,
        requesterId: recipientId},
        {helperId: recipientId,
        requesterId: senderId},
      ]      
    }
  })

  return conversations;
}

async function findAllMessagesByConversationId(conversationId: number) {

  const messages = await prisma.messages.findMany({
    where: {
      conversationId
    },
    include: {
      senderUser: true,
      recipientUser: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  return messages;
}

async function findMessageById(messageId: number) {

  const message = await prisma.messages.findFirst({
    where: {
      id: messageId
    }
  })

  return message;
}

async function createNewConversation(helperId: number, requesterId: number) {
  const createdConversation = await prisma.conversations.create({
    data:{
      helperId,
      requesterId
    }
  });
  return createdConversation
}

async function createNewMessage(conversationId: number, senderId: number, recipientId: number, text: string) {
  const createMessage = await prisma.messages.create({
    data: {
      senderId,
      recipientId,
      conversationId,
      statusId: 2,
      text,
    }
  });
  return createMessage
}

async function updateStatusMessage(messageId: number) {

  const updatedMessage = await prisma.messages.update({
    where: {
      id: messageId,
    },
    data: {
      statusId: 1
    },
  })

  return updatedMessage;
}

const messagesRepository = {
  findAllConversationsByUserId,
  findConversationById,
  findConversationByBothUsersId,
  findAllMessagesByConversationId,
  findMessageById,
  createNewConversation,
  createNewMessage,
  updateStatusMessage,
  findAllMessagesByUserId
};

export default messagesRepository;
