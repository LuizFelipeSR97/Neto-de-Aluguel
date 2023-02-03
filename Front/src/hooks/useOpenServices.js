import api from './useApi';

export async function GetOpenServices() {
  try{
    const response = await api.get(`/services/open`);
    return response.data;
  } catch (err) {
    return err
  }
}
