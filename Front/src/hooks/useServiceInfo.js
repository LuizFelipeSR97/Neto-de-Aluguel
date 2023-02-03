import api from './useApi';

export async function GetServiceInfo(id) {
  try{
    const response = await api.get(`/services/${id}/info`);
    return response.data;
  } catch (err) {
    return err
  }
}
