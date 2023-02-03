import api from './useApi';

export async function SignUp(user) {
  try{
    const response = await api.post('/users/sign-up', { name: user.name, email: user.email, password: user.password });
    return response.data;
  } catch (err) {
    return err
  }
}
