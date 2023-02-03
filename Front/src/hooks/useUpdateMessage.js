import api from './useApi';

export async function UpdateMessage(messageId) {

  const body = {messageId}

  try{
    const response = await api.post(`/messages/message/update`, body);
    return response.data;
  } catch (err) {
    return err
  }
}
