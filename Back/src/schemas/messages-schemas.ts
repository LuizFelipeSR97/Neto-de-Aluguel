import Joi from "joi";

export const newConversationSchema = Joi.object({
  senderId: Joi.number().required(),
  recipientId: Joi.number().required()
});

export const updateMessageSchema = Joi.object({
  messageId: Joi.number().required()
});

export const newMessageSchema = Joi.object({
  conversationId: Joi.number().required(),
  senderId: Joi.number().required(),
  recipientId: Joi.number().required(),
  text: Joi.string().required()
});