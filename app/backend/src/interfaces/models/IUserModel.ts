import { IUserDTO } from '../IUser';

export interface IUserModel {
  findOne(email: string): Promise<IUserDTO | null>;
}
