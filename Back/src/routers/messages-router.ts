import { Router } from "express";
import { authenticateToken, validateBody } from "@/middlewares";
import { newConversationSchema, updateMessageSchema, newMessageSchema } from "@/schemas/messages-schemas";
import { getAllConversationsByUserId, getAllMessagesByUserId, getMessagesByConversationId, getMessageById, createNewConversation, updateMessage, createMessage } from "@/controllers";

const messagesRouter = Router();

messagesRouter
    //.all("/*", authenticateToken)
    .get("/all/:userId", getAllConversationsByUserId)
    .get("/user/all/:userId", getAllMessagesByUserId)
    .get("/:conversationId", getMessagesByConversationId)
    .get("/message/:messageId", getMessageById)
    .post("/newConversation", validateBody(newConversationSchema), createNewConversation)
    .post("/message/update", validateBody(updateMessageSchema), updateMessage)
    .post("/message/new", validateBody(newMessageSchema), createMessage) //nao ta criando a mensagem

export { messagesRouter };
