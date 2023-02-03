import api from './useApi';

export async function GetAllConversations(userId) {
  try{
    const response = await api.get(`/messages/all/${userId}`);
    return response.data;
  } catch (err) {
    return err
  }
}
