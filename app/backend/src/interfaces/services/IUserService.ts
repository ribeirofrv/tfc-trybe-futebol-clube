import { ICredential } from '../IUser';

export interface IUserService {
  login(login: ICredential): Promise<string>;
}
