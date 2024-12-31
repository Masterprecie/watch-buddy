/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IResponse {
  error: boolean;
  errorCode: number;
  message: string;
  data: null | any;
}

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface RegisterPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface LoginResponse extends IResponse {
  user: User;
  accessToken: string;
}
export interface LoginPayload {
  email: string;
  password: string;
}
