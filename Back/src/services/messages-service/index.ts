import userRepository from "@/repositories/user-repository";
import messagesRepository from "@/repositories/messages-repository";
import { messages, conversations } from "@prisma/client";
import { badRequestError, notFoundError } from "./errors";

export async function getAllConversationsByUserId( userId: number): Promise<conversations[]> {

  const existingUser = await userRepository.getUserInfo(userId);

  if (!existingUser) throw notFoundError();

  const conversations = await messagesRepository.findAllConversationsByUserId(userId);

  if (!conversations) throw notFoundError();

  return conversations;
}

export async function getAllMessagesByUserId( userId: number): Promise<messages[]> {

  const existingUser = await userRepository.getUserInfo(userId);

  if (!existingUser) throw notFoundError();

  const messages = await messagesRepository.findAllMessagesByUserId(userId);

  if (!messages) throw notFoundError();

  return messages;
}

export async function getMessagesByConversationId( conversationId: number): Promise<messages[]> {

  const existingConversation = await messagesRepository.findConversationById(conversationId);

  if (!existingConversation) throw notFoundError();

  const conversationMessages = await messagesRepository.findAllMessagesByConversationId(conversationId);

  if (!conversationMessages) throw notFoundError();
  
  return conversationMessages;
}

export async function getMessageById( messageId: number): Promise<messages> {

  const existingMessage = await messagesRepository.findMessageById(messageId);

  if (!existingMessage) throw notFoundError();

  return existingMessage;
}

export async function createNewConversation( senderId: number, recipientId: number): Promise<conversations> {

  if (senderId === recipientId) throw badRequestError();
  
  let existingUser = await userRepository.getUserInfo(senderId);

  if (!existingUser) throw notFoundError();

  existingUser = await userRepository.getUserInfo(recipientId);

  if (!existingUser) throw notFoundError();

  const existingConversation = await messagesRepository.findConversationByBothUsersId(senderId, recipientId);

  if (existingConversation) return existingConversation;

  const createdConversation = await messagesRepository.createNewConversation(senderId, recipientId);

  if (!createdConversation) throw badRequestError();

  return createdConversation;
}

export async function updateMessage( messageId: number): Promise<messages> {

  const existingMessage = messagesRepository.findMessageById(messageId);

  if (!existingMessage) throw notFoundError();

  const updatedMessage = await messagesRepository.updateStatusMessage(messageId);

  if (!updatedMessage) throw badRequestError();

  return updatedMessage
}

export async function createMessage( conversationId: number, senderId: number, recipientId: number, text: string): Promise<messages> {

  if (text === '') throw badRequestError();

  const existingConversation = await messagesRepository.findConversationById(conversationId);

  if (!existingConversation) throw notFoundError();

  let existingUser = await userRepository.getUserInfo(senderId);

  if (!existingUser) throw notFoundError();

  existingUser = await userRepository.getUserInfo(recipientId);

  if (!existingUser) throw notFoundError();

  if((existingConversation.helperId !== senderId &&  existingConversation.helperId !== recipientId) || (existingConversation.requesterId !== senderId &&  existingConversation.requesterId !== recipientId)){
    throw notFoundError();
  }

  const createdMessage = await messagesRepository.createNewMessage(conversationId, senderId, recipientId, text);

  if (!createdMessage) throw badRequestError();

  return createdMessage;
}

const messagesService = {
  getAllConversationsByUserId,
  getAllMessagesByUserId,
  getMessagesByConversationId,
  getMessageById,
  createNewConversation,
  updateMessage,
  createMessage
};

export * from "./errors";
export default messagesService;
