export interface User {
  _id: string,
  email: string,
  displayName: string,
  token: string,
  role: string,
  avatar: string,
}

export interface RegisterUserData {
  [key: string]: any,

  email: string,
  password: string,
  displayName: string,
  avatar: null | File,
}

export interface LoginUserData {
  email: string,
  password: string,
}

export interface FbLoginUserData {
  authToken: string,
  id: string,
  email: string,
  name: string,
  picUrl: string,
}

export interface FieldError {
  message: string,
}

export interface RegisterError {
  errors: {
    email: FieldError,
    displayName: FieldError,
  },
}

export interface LoginError {
  error: string,
}

