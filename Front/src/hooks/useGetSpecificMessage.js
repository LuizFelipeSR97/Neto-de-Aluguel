import api from './useApi';

export async function GetSpecificMessage(messageId) {
  try{
    const response = await api.get(`/messages/message/${messageId}`);
    return response.data;
  } catch (err) {
    return err
  }
}
