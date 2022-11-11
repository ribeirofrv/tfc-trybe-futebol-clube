export interface ICredential {
  email: string
  password: string
}

export interface IUserDTO extends ICredential{
  id: number,
  username: string,
  role: string,
}
