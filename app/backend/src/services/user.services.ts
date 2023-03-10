import { compareSync } from 'bcryptjs';
import BadRequestError from '../errors/BadRequestError';
import UnauthorizedError from '../errors/UnauthorizedError';

import UserModel from '../models/user.model';
import { ICredential } from '../interfaces/IUser';
import { IDecodedUser } from '../interfaces/services/IUserService';
import loginValidation from './utilities/login.validation';
import { generateToken, verifyToken } from '../auth/jwt.auth';

export default class UserService {
  private _model: UserModel;

  constructor() {
    this._model = new UserModel();
  }

  public async login(login: ICredential): Promise<string> {
    const result = loginValidation.safeParse(login);
    if (!result.success) throw new BadRequestError('All fields must be filled');

    const foundUser = await this._model.findOne(login.email);
    if (!foundUser) throw new UnauthorizedError('Incorrect email or password');

    const isPasswordAllowed = compareSync(login.password, foundUser?.password as string);
    if (!isPasswordAllowed) throw new UnauthorizedError('Incorrect email or password');

    const token = generateToken(foundUser);
    return token;
  }

  public async validate(token: string) {
    const decodedUser = verifyToken(token);
    const { email } = decodedUser as IDecodedUser;
    const foundUser = await this._model.findOne(email);
    if (!foundUser) throw new UnauthorizedError('Invalid token');

    return foundUser?.role;
  }
}
