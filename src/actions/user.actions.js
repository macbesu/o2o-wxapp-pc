export const USER_LOGIN = 'USER_LOGIN';

export const login = (login) => {
  return { type: USER_LOGIN, login };
}