import User from '../database/models/UserModel';
import { IUserDTO } from '../interfaces/IUser';
import { IUserModel } from '../interfaces/models/IUserModel';

export default class UserModel implements IUserModel {
  private _model: typeof User;

  constructor() {
    this._model = User;
  }

  async findOne(email: string): Promise<IUserDTO | null> {
    const user = await this._model.findOne({ where: { email } });
    return user;
  }
}
