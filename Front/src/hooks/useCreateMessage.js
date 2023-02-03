import api from './useApi';

export async function CreateMessage(body) {

  try{
    const response = await api.post('/messages/message/new', body);
    return response.data;
  } catch (err) {
    return err
  }
}
