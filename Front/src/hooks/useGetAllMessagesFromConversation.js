import api from './useApi';

export async function GetAllMessagesFromConversation(conversationId) {
  try{
    const response = await api.get(`/messages/${conversationId}`);
    return response.data;
  } catch (err) {
    return err
  }
}
