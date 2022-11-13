import { ICredential } from '../IUser';

export interface IUserDTO extends ICredential {
  id: number;
  username: string;
  role: string;
}
