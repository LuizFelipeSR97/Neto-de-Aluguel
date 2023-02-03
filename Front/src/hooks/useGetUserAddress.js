import api from './useApi';

export async function GetUserAddress(userId) {
  try{
    const response = await api.get(`/users/address/${userId}`);
    return response.data;
  } catch (err) {
    return err
  }
}
