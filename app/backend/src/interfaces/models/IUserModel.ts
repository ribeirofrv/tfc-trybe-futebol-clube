import { IUserDTO } from '../dtos/IUserDTO';

export interface IUserModel {
  findOne(email: string): Promise<IUserDTO | null>;
}
