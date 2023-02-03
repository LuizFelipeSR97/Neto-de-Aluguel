import api from './useApi';

export async function CreateConversation(body) {

  try{
    const response = await api.post('/messages/newConversation', body);
    return response.data;
  } catch (err) {
    return err
  }
}
