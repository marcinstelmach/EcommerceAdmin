export interface UserForLogin {
  email: string;
  password: string;
}

export interface UserLoginResponseFromApi {
  email: string,
  expires: string,
  refreshToken: string,
  token: string,
  userId: string
}
