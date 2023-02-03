import api from './useApi';

export async function SignIn(user) {
  try{
    const response = await api.post('/users/sign-in', { email: user.email, password: user.password });
    return response.data;
  } catch (err) {
    return err
  }
}
