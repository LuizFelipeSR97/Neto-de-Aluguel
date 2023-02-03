import api from './useApi';

export async function SignOut(user) {
  try {
    const response = await api.post('/users/sign-out', { userId: user.id });
    return response.data;
  } catch (err) {
    return err
  }
}
