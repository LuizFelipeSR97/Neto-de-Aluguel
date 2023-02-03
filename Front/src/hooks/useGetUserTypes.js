import api from './useApi';

export async function GetUserTypes() {
  try{
    const response = await api.get(`/users/types`);
    return response.data;
  } catch (err) {
    return err
  }
}
