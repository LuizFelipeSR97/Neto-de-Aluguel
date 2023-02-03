import messagesService from "@/services/messages-service";
import { Request, Response } from "express";
import httpStatus from "http-status";

export async function getAllConversationsByUserId(req: Request, res: Response) {
  const {userId} = req.params;
  const id = Number(userId);
  try {
    const result = await messagesService.getAllConversationsByUserId(id);
    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
};

export async function getAllMessagesByUserId(req: Request, res: Response) {
  const {userId} = req.params;
  const id = Number(userId);
  try {
    const result = await messagesService.getAllMessagesByUserId(id);
    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
};


export async function getMessagesByConversationId(req: Request, res: Response) {
  const {conversationId} = req.params;
  const id = Number(conversationId);
  try {
    const result = await messagesService.getMessagesByConversationId(id);
    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
};

export async function getMessageById(req: Request, res: Response) {
  const {messageId} = req.params;
  const id = Number(messageId);
  try {
    const result = await messagesService.getMessageById(id);
    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
};

export async function createNewConversation(req: Request, res: Response) {
  const {senderId, recipientId} = req.body;
  try {
    const result = await messagesService.createNewConversation(senderId, recipientId);
    return res.status(httpStatus.CREATED).send(result);
  } catch (error) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
};

export async function updateMessage(req: Request, res: Response) {
  const {messageId} = req.body;
  const id = Number(messageId);
  try {
    const result = await messagesService.updateMessage(messageId);
    return res.status(httpStatus.CREATED).send(result);
  } catch (error) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
};

export async function createMessage(req: Request, res: Response) {
  const {conversationId, senderId, text, recipientId } = req.body;
  try {
    const result = await messagesService.createMessage(conversationId, senderId, recipientId, text);
    return res.status(httpStatus.CREATED).send(result);
  } catch (error) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
};
