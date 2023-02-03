import api from './useApi';

export async function GetAllMessages(userId) {
  try{
    const response = await api.get(`/messages/user/all/${userId}`);
    return response.data;
  } catch (err) {
    return err
  }
}
