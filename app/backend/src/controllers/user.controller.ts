import { Request, Response } from 'express';
import { IUserService } from '../interfaces/services/IUserService';

export default class UserController {
  private readonly userService: IUserService;

  constructor(userService: IUserService) {
    this.userService = userService;
  }

  async login(request: Request, response: Response): Promise<Response | void> {
    const token = await this.userService.login(request.body);
    return response.status(200).json({ token });
  }

  async validate(request: Request, response: Response): Promise<Response | void> {
    const { authorization } = request.headers;
    const role = await this.userService.validate(authorization as string);
    return response.status(200).json({ role });
  }
}
