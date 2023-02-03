import api from './useApi';

export async function GetUserServices(userId) {
  try{
    const response = await api.get(`/services/${userId}`);
    return response.data;
  } catch (err) {
    return err
  }
}
