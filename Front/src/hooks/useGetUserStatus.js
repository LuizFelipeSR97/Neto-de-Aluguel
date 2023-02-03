import api from './useApi';

export async function GetUserStatus() {
  try{
    const response = await api.get(`/users/status`);
    return response.data;
  } catch (err) {
    return err
  }
}
