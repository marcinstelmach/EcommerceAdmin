export interface UserData {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    confirmPassword: string;
}

export interface UserLogin {
    email: string;
    password: string;
}

export interface UserLoginResponseFromApi {
    email: string;
    expires: string;
    refreshToken: string;
    token: string;
    userId: string;
}

export interface UserDisplayData {
    email: string;
    name: string;
    dateTime: string;
    id: string;
}

export interface User  {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    creationDateTime: Date;
  }
