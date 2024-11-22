const BaseEndpoint = 'https://todo-redev.herokuapp.com/api';

export const LoginEndpoint = `${BaseEndpoint}/auth/login`;
export const RegEndpoint = `${BaseEndpoint}/users/register`;

export type User = {
  id?: number;
  username: string;
  email: string;
  password: string;
  gender: string;
  age: number;
};
