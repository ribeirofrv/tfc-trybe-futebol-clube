import { ICredential } from '../IUser';

export interface IUserService {
  login(login: ICredential): Promise<string>;
  validate(token: string): Promise<string>;
}

export interface IDecodedUser {
  id: number;
  username: string;
  email: string;
  iat: number;
}
