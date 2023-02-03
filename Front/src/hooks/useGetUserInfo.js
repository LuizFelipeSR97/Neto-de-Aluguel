import api from './useApi';

export async function GetUserInfo(userId) {
  try{
    const response = await api.get(`/users/${userId}`);
    return response.data;
  } catch (err) {
    return err
  }
}
